"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocaleContext } from '@/components/locale-provider';
import { getTranslation } from '@/lib/i18n';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Juan's AI assistant. I can help answer questions about his experience, skills, projects, or how to get in touch. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { locale: currentLocale } = useLocaleContext();
  const t = getTranslation(currentLocale);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewportHeight = () => {
      const vv = window.visualViewport;
      const height = vv ? Math.round(vv.height) : window.innerHeight;
      setViewportHeight(height);
    };

    updateViewportHeight();

    const vv = window.visualViewport;
    vv?.addEventListener("resize", updateViewportHeight);
    vv?.addEventListener("scroll", updateViewportHeight);
    window.addEventListener("resize", updateViewportHeight);

    return () => {
      vv?.removeEventListener("resize", updateViewportHeight);
      vv?.removeEventListener("scroll", updateViewportHeight);
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("chatbot-visibility-change", {
          detail: { isOpen },
        })
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile || !isOpen) return;

    const scrollY = window.scrollY;
    const originalBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    // Prevent background scroll bleed while chat panel is open on mobile.
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = originalBodyStyle.overflow;
      document.body.style.position = originalBodyStyle.position;
      document.body.style.top = originalBodyStyle.top;
      document.body.style.width = originalBodyStyle.width;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setSendError(null);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage =
        currentLocale === 'es'
          ? 'No se pudo obtener respuesta. Intenta de nuevo.'
          : 'Failed to get response. Please try again.';
      setSendError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What do you do?",
    "What technologies do you use?",
    "How can I contact you?",
    "What projects have you worked on?",
    "What's your experience with AI?"
  ];

  return (
    <div
      className={`fixed right-4 z-50 ${className}`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      {isOpen && (
          <div
            className={`glass-panel rounded-lg border animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200 ${
              isMinimized
                ? 'h-12 w-[calc(100vw-1rem)] max-w-sm sm:w-80'
                : 'h-[70vh] max-h-[560px] w-[calc(100vw-1rem)] max-w-sm sm:h-[500px] sm:w-96'
            } flex flex-col`}
            style={
              !isMinimized && viewportHeight
                ? { height: `min(560px, calc(${viewportHeight}px - 7.5rem))` }
                : undefined
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 bg-primary/5 p-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-semibold">AI Assistant</span>
                <Badge variant="secondary" className="text-xs">{"Juan's Portfolio"}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex animate-in fade-in slide-in-from-bottom-2 duration-200 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>
                          <div className={`rounded-lg px-3 py-2 ${
                            message.isUser 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start animate-in fade-in duration-200">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-muted rounded-lg px-3 py-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="p-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6"
                          onClick={() => setInputValue(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about Juan..."
                      disabled={isLoading}
                      className="flex-1"
                      enterKeyHint="send"
                      autoComplete="off"
                      autoCorrect="on"
                      autoCapitalize="sentences"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  {sendError && (
                    <div className="mt-3 rounded-lg border border-border/60 bg-secondary/30 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-muted-foreground">{sendError}</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setSendError(null)}
                        >
                          {currentLocale === 'es' ? 'Cerrar' : 'Dismiss'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

      {/* Chat Button */}
      {!isOpen && (
        <div className="group relative transition-transform duration-200 hover:scale-110 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100">
          <span
            className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-border/70 bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 sm:block"
            aria-hidden="true"
          >
            Juan AI
          </span>
          <span
            className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-full border border-border/70 bg-background/95 px-2 py-0.5 text-[11px] font-medium text-foreground shadow-sm sm:hidden"
            aria-hidden="true"
          >
            Juan AI
          </span>
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full border border-black/30 shadow-lg bg-primary text-black hover:bg-primary/90"
            size="lg"
            aria-label="Open Juan AI chatbot"
            title="Juan AI"
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              🤖
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
