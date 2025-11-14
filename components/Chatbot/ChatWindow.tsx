'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatMessage as ChatMessageType, QuickReply as QuickReplyType } from '@/lib/chatbot-flows';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isTyping: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => void;
  onQuickReply: (reply: QuickReplyType) => void;
}

export default function ChatWindow({
  messages,
  isTyping,
  onClose,
  onSendMessage,
  onQuickReply,
}: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll zu neuesten Nachrichten
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Fokus auf Input bei Öffnung
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slideUp">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2c5f7c] to-[#4a9d8f] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-lg">Praxis-Assistent</h3>
            <p className="text-xs text-white/80">Immer für Sie da</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          aria-label="Chat schließen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((message) => (
          <Message key={message.id} message={message} onQuickReply={onQuickReply} />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nachricht eingeben..."
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#2c5f7c] transition-colors text-gray-800"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-[#2c5f7c] to-[#4a9d8f] text-white p-3 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            aria-label="Nachricht senden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          💡 Dieser Chat dient zur Information. Für medizinische Beratung kontaktieren Sie bitte die Praxis.
        </p>
      </div>
    </div>
  );
}
