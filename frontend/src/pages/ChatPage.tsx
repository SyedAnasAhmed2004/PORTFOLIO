import { Reveal } from '@/components/ui/Reveal'
import { ChatWindow } from '@/features/chat/components/ChatWindow'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ChatPage() {
  usePageTitle('Chat')

  return (
    <section className="container-page grid min-h-dvh items-center gap-10 pt-28 pb-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
      <Reveal>
        <p className="eyebrow mb-6">
          <span className="text-accent">02</span> — AI Assistant
        </p>
        <h1 className="text-5xl leading-[0.95] font-light tracking-tight sm:text-6xl">
          Ask me <span className="font-display text-gradient italic">anything</span>.
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-muted">
          This assistant uses retrieval-augmented generation over my projects, experience and
          writing — so you get grounded answers, not guesses.
        </p>
        <ul className="mt-8 space-y-3 font-mono text-xs text-muted">
          <li>→ Grounded in my own documents</li>
          <li>→ Cites the sources it used</li>
          <li>→ Served by FastAPI</li>
        </ul>
      </Reveal>

      <Reveal delay={0.15}>
        <ChatWindow />
      </Reveal>
    </section>
  )
}
