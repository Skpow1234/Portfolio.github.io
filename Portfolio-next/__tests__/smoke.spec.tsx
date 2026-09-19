import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LocaleProvider } from "@/components/locale-provider";
import { MobileMenu } from "@/components/mobile-menu";
import { Chatbot } from "@/components/chatbot";
import { Header } from "@/components/header";
import { CommandPalette, openCommandPalette } from "@/components/command-palette";
import { ContactSectionClient } from "@/components/sections/contact-section-client";
import { scrollToSection } from "@/lib/scroll-to-section";

jest.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({ replace: jest.fn() }),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

jest.mock("@/hooks/use-scroll-progress", () => ({
  useScrollProgress: () => 0,
}));

describe("Portfolio smoke tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("mobile menu opens and closes", async () => {
    render(
      <LocaleProvider locale="en">
        <MobileMenu activeId="home" onNavClick={jest.fn()} />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(await screen.findByText("Navigation")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    await waitFor(() => {
      expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
    });
  });

  test("mobile nav click delegates to onNavClick", async () => {
    const onNavClick = jest.fn();
    render(
      <LocaleProvider locale="en">
        <MobileMenu activeId="home" onNavClick={onNavClick} />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));
    fireEvent.click(screen.getByRole("link", { name: /about/i }));
    await waitFor(() => {
      expect(onNavClick).toHaveBeenCalledWith("about");
    });
  });

  test("language switch links to the other locale", () => {
    render(
      <LocaleProvider locale="en">
        <Header />
      </LocaleProvider>,
    );

    expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute("href", "/es");
  });

  test("contact section links to LinkedIn and GitHub", () => {
    render(
      <ContactSectionClient linkedinLabel="Connect on LinkedIn" githubLabel="View GitHub" />,
    );

    expect(screen.getByRole("link", { name: /connect on linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/",
    );
    expect(screen.getByRole("link", { name: /view github/i })).toHaveAttribute(
      "href",
      "https://github.com/Skpow1234",
    );
  });

  test("scrollToSection updates the URL hash", () => {
    const scrollIntoView = jest.fn();
    window.scrollTo = jest.fn();

    const section = document.createElement("section");
    section.id = "contact";
    section.scrollIntoView = scrollIntoView;
    document.body.appendChild(section);

    window.history.replaceState(null, "", "/en");

    scrollToSection("contact");

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(window.location.hash).toBe("#contact");

    document.body.removeChild(section);
  });

  test("command palette opens with Ctrl+K", async () => {
    render(
      <LocaleProvider locale="en">
        <CommandPalette />
      </LocaleProvider>,
    );

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(await screen.findByPlaceholderText(/jump to a section/i)).toBeInTheDocument();

    openCommandPalette();
    expect(screen.getByPlaceholderText(/jump to a section/i)).toBeInTheDocument();
  });

  test("chatbot opens and sends a message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ response: "Sure, I can help with that." }),
    } as Response);

    render(
      <LocaleProvider locale="en">
        <Chatbot />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /open juan ai chatbot/i }));
    expect(await screen.findByText("AI Assistant")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Ask me anything about Juan..."), {
      target: { value: "What do you do?" },
    });
    fireEvent.keyDown(screen.getByPlaceholderText("Ask me anything about Juan..."), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(await screen.findByText("Sure, I can help with that.")).toBeInTheDocument();
  });
});
