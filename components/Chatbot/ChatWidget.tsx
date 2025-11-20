'use client';

import { useState, useEffect } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const {
    messages,
    isOpen,
    isTyping,
    openChat,
    closeChat,
    sendMessage,
    handleQuickReply,
  } = useChatbot();

  // Animation nur für 3 Sekunden beim ersten Laden
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000); // Nach 3 Sekunden Animation stoppen

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#2c5f7c] to-[#4a9d8f] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group ${
            showAnimation ? 'animate-bounce' : ''
          }`}
          aria-label="Chat öffnen"
        >
          {/* Icon */}
          <svg
            className="w-8 h-8 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>

          {/* Pulse Animation - nur die ersten 3 Sekunden */}
          {showAnimation && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#4a9d8f] opacity-75 animate-ping" />
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onClose={closeChat}
          onSendMessage={sendMessage}
          onQuickReply={handleQuickReply}
        />
      )}
    </>
  );
}
