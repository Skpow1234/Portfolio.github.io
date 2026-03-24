import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LocaleProvider } from "@/components/locale-provider";
import { MobileMenu } from "@/components/mobile-menu";
import { ContactForm } from "@/components/contact-form";
import { Chatbot } from "@/components/chatbot";
import { Header } from "@/components/header";

const switchLocaleMock = jest.fn();
const toastMock = jest.fn();

jest.mock("@/hooks/use-locale", () => ({
  useLocale: () => ({
    currentLocale: "en",
    switchLocale: switchLocaleMock,
  }),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: toastMock,
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
        <MobileMenu activeId="home" />
      </LocaleProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(await screen.findByText("Navigation")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    await waitFor(() => {
      expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
    });
  });

  test("language switch triggers locale change", () => {
    render(
      <LocaleProvider locale="en">
        <Header />
      </LocaleProvider>
    );

    fireEvent.change(screen.getByLabelText("Language selector"), {
      target: { value: "es" },
    });

    expect(switchLocaleMock).toHaveBeenCalledWith("es");
  });

  test("contact form submits successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "juan@test.com" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hello" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Test message" } });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/send",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  test("chatbot opens and sends a message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ response: "Sure, I can help with that." }),
    } as Response);

    render(
      <LocaleProvider locale="en">
        <Chatbot />
      </LocaleProvider>
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

