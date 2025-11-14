import { QuickReply as QuickReplyType } from '@/lib/chatbot-flows';

interface QuickReplyProps {
  reply: QuickReplyType;
  onClick: (reply: QuickReplyType) => void;
}

export default function QuickReply({ reply, onClick }: QuickReplyProps) {
  return (
    <button
      onClick={() => onClick(reply)}
      className="px-4 py-2 bg-white border-2 border-[#2c5f7c] text-[#2c5f7c] rounded-full text-sm font-medium hover:bg-[#2c5f7c] hover:text-white transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md active:scale-95"
    >
      {reply.label}
    </button>
  );
}
