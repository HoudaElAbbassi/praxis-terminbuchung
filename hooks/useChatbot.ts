import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChatMessage,
  QuickReply,
  MAIN_MENU,
  getFlowById,
  findFlowByTrigger,
} from '@/lib/chatbot-flows';

export function useChatbot() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initialisiere Chat mit Begrüßung
  const initializeChat = useCallback(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      type: 'bot',
      text: MAIN_MENU.response,
      timestamp: new Date(),
      quickReplies: MAIN_MENU.quickReplies,
    };
    setMessages([welcomeMessage]);
  }, []);

  // Chat öffnen
  const openChat = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0) {
      initializeChat();
    }
  }, [messages.length, initializeChat]);

  // Chat schließen
  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Nachricht vom User senden
  const sendMessage = useCallback(
    (text: string) => {
      // User-Nachricht hinzufügen
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Bot "tippt"
      setIsTyping(true);

      // Simuliere Verzögerung für natürlichere Konversation
      setTimeout(() => {
        setIsTyping(false);

        // Finde passenden Flow
        const flow = findFlowByTrigger(text);

        // Bot-Antwort hinzufügen
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          text: flow.response,
          timestamp: new Date(),
          quickReplies: flow.quickReplies,
        };

        setMessages((prev) => [...prev, botMessage]);
      }, 800); // 800ms Verzögerung
    },
    []
  );

  // Quick Reply klicken
  const handleQuickReply = useCallback(
    (reply: QuickReply) => {
      // Bei Navigation
      if (reply.action === 'navigate' && reply.href) {
        router.push(reply.href);
        // Optional: Chat schließen nach Navigation
        setTimeout(() => {
          setIsOpen(false);
        }, 300);
        return;
      }

      // Bei normaler Message
      // User-Nachricht mit Label hinzufügen
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        text: reply.label,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Bot "tippt"
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        // Finde Flow anhand value
        const flow = getFlowById(reply.value);

        // Bot-Antwort
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          text: flow.response,
          timestamp: new Date(),
          quickReplies: flow.quickReplies,
        };

        setMessages((prev) => [...prev, botMessage]);
      }, 800);
    },
    [router]
  );

  // Chat zurücksetzen
  const resetChat = useCallback(() => {
    setMessages([]);
    initializeChat();
  }, [initializeChat]);

  return {
    messages,
    isOpen,
    isTyping,
    openChat,
    closeChat,
    sendMessage,
    handleQuickReply,
    resetChat,
  };
}
