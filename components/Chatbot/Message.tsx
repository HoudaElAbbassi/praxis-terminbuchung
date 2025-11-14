import { ChatMessage } from '@/lib/chatbot-flows';
import QuickReply from './QuickReply';
import { QuickReply as QuickReplyType } from '@/lib/chatbot-flows';

interface MessageProps {
  message: ChatMessage;
  onQuickReply: (reply: QuickReplyType) => void;
}

export default function Message({ message, onQuickReply }: MessageProps) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex flex-col gap-2 ${isBot ? 'items-start' : 'items-end'}`}>
      <div className="flex items-start gap-2 max-w-[85%]">
        {/* Bot Avatar */}
        {isBot && (
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#2c5f7c] to-[#4a9d8f] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
            🤖
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isBot
              ? 'bg-gradient-to-br from-[#2c5f7c] to-[#3d7a9e] text-white rounded-tl-sm'
              : 'bg-gray-100 text-gray-800 rounded-tr-sm'
          }`}
        >
          {/* Text mit Markdown-ähnlicher Formatierung */}
          <div
            className="text-sm leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: message.text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **bold**
                .replace(/\n/g, '<br />'), // Zeilenumbrüche
            }}
          />
        </div>

        {/* User Avatar (optional) */}
        {!isBot && (
          <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
            👤
          </div>
        )}
      </div>

      {/* Timestamp */}
      <div className={`text-xs text-gray-500 px-2 ${isBot ? 'text-left' : 'text-right'}`}>
        {formatTime(message.timestamp)}
      </div>

      {/* Quick Replies (nur bei Bot-Nachrichten) */}
      {isBot && message.quickReplies && message.quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 max-w-full">
          {message.quickReplies.map((reply, index) => (
            <QuickReply key={index} reply={reply} onClick={onQuickReply} />
          ))}
        </div>
      )}
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Gerade eben';
  if (diffMins < 60) return `vor ${diffMins} Min`;

  const hours = Math.floor(diffMins / 60);
  if (hours < 24) return `vor ${hours} Std`;

  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
