import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LocaleProvider } from "@/components/locale-provider";
import { MobileMenu } from "@/components/mobile-menu";
import { ContactForm } from "@/components/contact-form";
import { Chatbot } from "@/components/chatbot";
import { Header } from "@/components/header";
import { getTranslation } from "@/lib/i18n";
import { scrollToSection } from "@/lib/scroll-to-section";

const toastMock = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/en",
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: toastMock,
  }),
}));

jest.mock("@/hooks/use-scroll-progress", () => ({
  useScrollProgress: () => 0,
}));

const englishLabels = getTranslation("en").contact.form;
const spanishLabels = getTranslation("es").contact.form;

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

  test("contact form submits successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    render(<ContactForm labels={englishLabels} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "juan@test.com" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hello" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Test message" } });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/send", expect.objectContaining({ method: "POST" }));
    });
  });

  test("contact form renders Spanish labels", () => {
    render(<ContactForm labels={spanishLabels} />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeInTheDocument();
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
