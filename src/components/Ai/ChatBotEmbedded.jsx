// src/components/Ai/ChatBotEmbedded.jsx
import ChatBot from "./ChatBot";

export default function ChatBotEmbedded() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10">
      <ChatBot embedMode={true} hideFloating={true} forceOpen={true} />
    </div>
  );
}
