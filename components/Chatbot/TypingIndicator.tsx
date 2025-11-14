export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-sm max-w-[70%] w-fit">
      <div className="flex gap-1">
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
      <span className="text-xs text-gray-500">Bot tippt...</span>
    </div>
  );
}
