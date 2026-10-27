import { AnimatePresence } from 'motion/react'
import { useEffect, useRef } from 'react'

import { SUGGESTED_PROMPTS } from '../constants'
import { useChat } from '../hooks/useChat'
import { ChatComposer } from './ChatComposer'
import { ChatMessageBubble, TypingIndicator } from './ChatMessageBubble'

export function ChatWindow() {
  const { messages, isLoading, error, sendMessage, resetConversation } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading])

  const isEmpty = messages.length === 0

  return (
    <div className="glass flex h-[min(720px,calc(100dvh-9rem))] flex-col overflow-hidden rounded-3xl">
      <header className="flex items-center justify-between border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-accent shadow-[0_0_12px] shadow-accent" />
          <div>
            <p className="text-sm font-medium">Portfolio Assistant</p>
            <p className="font-mono text-[11px] text-muted">RAG · knowledge base indexing</p>
          </div>
        </div>
        {!isEmpty && (
          <button
            type="button"
            onClick={resetConversation}
            className="font-mono text-xs text-muted transition-colors hover:text-fg"
          >
            Clear
          </button>
        )}
      </header>

      {/* data-lenis-prevent keeps native scrolling inside this panel */}
      <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
        {isEmpty ? (
          <div className="flex h-full flex-col justify-end gap-3">
            <p className="eyebrow mb-1">Try asking</p>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-left text-sm text-fg/80 transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <ChatMessageBubble key={index} message={message} />
            ))}
          </AnimatePresence>
        )}
        {isLoading && <TypingIndicator />}
        {error && (
          <p role="alert" className="text-center text-sm text-danger">
            {error}
          </p>
        )}
      </div>

      <div className="border-t border-line p-3">
        <ChatComposer disabled={isLoading} onSend={sendMessage} />
      </div>
    </div>
  )
}
