import { ChatWindow } from '@/features/chat/components/ChatWindow'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ChatPage() {
  usePageTitle('Chat')

  // On desktop the robot occupies the left half; content sits on the right.
  return (
    <section className="min-h-dvh px-6 pt-28 pb-16 sm:px-12 lg:ml-[46%] lg:pr-28">
      <h1 className="text-5xl font-light uppercase sm:text-6xl">Ask my AI</h1>
      <p className="mt-4 max-w-lg leading-relaxed text-muted">
        It answers questions about my projects, experience and skills using my own documents. The
        knowledge base is still being indexed, so answers are limited for now.
      </p>
      <div className="mt-10">
        <ChatWindow />
      </div>
    </section>
  )
}
