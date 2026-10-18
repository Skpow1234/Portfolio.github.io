/**
 * @jest-environment node
 */
import { en } from "@/lib/i18n/en";
import { es } from "@/lib/i18n/es";
import { isLocale } from "@/lib/i18n/locales";
import { workExperience } from "@/lib/data/work-experience";
import { getWorkExperienceId } from "@/lib/data/work-experience-id";
import { workExperienceDescriptions } from "@/lib/data/work-experience-descriptions";
import { workExperienceDescriptions as workExperienceDescriptionsEs } from "@/lib/data/work-experience-descriptions-es";
import { repositories } from "@/lib/data/repositories";
import { repositoryCopyEs } from "@/lib/data/repository-copy-es";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("portfolio facts", () => {
  test("freelance starts in January 2019 and the description key matches", () => {
    const freelance = workExperience.find((job) => job.company === "Private Companies");
    expect(freelance?.period).toBe("January 2019 – Present");
    expect(freelance?.title).toBe("Software Engineer (Freelance)");
    const id = getWorkExperienceId(freelance!);
    expect(workExperienceDescriptions[id]).toEqual(expect.any(String));
    expect(workExperienceDescriptionsEs[id]).toEqual(expect.any(String));
    expect(workExperienceDescriptions[id].length).toBeGreaterThan(40);
  });

  test("current employer in the experience list is Microsoft", () => {
    expect(workExperience[0]?.company).toBe("Microsoft");
    expect(workExperience[0]?.title).toBe("Software Engineer II");
    expect(workExperience[0]?.period).toContain("Present");
  });

  test("one- and two-month roles do not repeat the copied cloud tail", () => {
    const tail = ["Git", "Gitlab", "Docker", "Swagger", "AWS", "Kubernetes", "GCP"];
    const shortRoles = workExperience.filter((job) =>
      ["July 2023 - August 2023", "May 2023 - June 2023", "May 2025 – June 2025"].includes(job.period),
    );
    expect(shortRoles.map((job) => job.company).sort()).toEqual(["5IG Solutions | AT&T", "Arknova S.A.S", "OORTech LLC"]);
    for (const job of shortRoles) {
      expect(job.skills?.slice(-tail.length)).not.toEqual(tail);
      expect(job.skills).not.toEqual(expect.arrayContaining(["Gitlab", "Swagger", "GCP"]));
    }
  });

  test("English and Spanish translation keys match", () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(es).sort());
  });

  test("only en and es are locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("EN")).toBe(false);
  });

  test("every role and repository has Spanish copy that is not the English text", () => {
    for (const job of workExperience) {
      const id = getWorkExperienceId(job);
      const english = workExperienceDescriptions[id];
      const spanish = workExperienceDescriptionsEs[id];
      expect(english?.length).toBeGreaterThan(40);
      expect(spanish?.length).toBeGreaterThan(40);
      expect(spanish).not.toBe(english);
    }

    for (const repo of repositories) {
      expect(repo.stars).toBeUndefined();
      expect(repo.forks).toBeUndefined();
      const spanish = repositoryCopyEs[repo.name];
      expect(spanish?.description.length).toBeGreaterThan(20);
      expect(spanish?.impact.length).toBeGreaterThan(20);
      expect(spanish.description).not.toBe(repo.description);
    }
  });
});

describe("leetcode stats route", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.resetModules();
  });

  test("does not return invented stats when upstream fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("upstream down"));
    jest.resetModules();
    const { NextRequest } = await import("next/server");
    const { GET } = await import("@/app/api/leetcode-stats/route");
    const response = await GET(new NextRequest("http://localhost/api/leetcode-stats"));
    const body = await response.json();
    const serialized = JSON.stringify(body);

    expect(response.status).toBe(503);
    expect(body.status).toBe("error");
    expect(body.totalSolved).toBeUndefined();
    expect(serialized).not.toContain("58.2");
    expect(serialized).not.toContain("350");
  });
});
