import { useEffect, useRef } from 'react'

import { Panel } from '@/components/ui/Panel'
import { setRobotThinking } from '@/lib/robotState'

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

  // The android's mouth grille pulses while a reply is on its way.
  useEffect(() => {
    setRobotThinking(isLoading)
    return () => setRobotThinking(false)
  }, [isLoading])

  const isEmpty = messages.length === 0

  return (
    <Panel className="flex h-[min(620px,calc(100dvh-21rem))] min-h-[420px] flex-col">
      <header className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <p className="font-semibold">Portfolio assistant</p>
          <p className="mt-0.5 flex items-center gap-2 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-amber" />
            Knowledge base is still being indexed
          </p>
        </div>
        {!isEmpty && (
          <button
            type="button"
            onClick={resetConversation}
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            Clear chat
          </button>
        )}
      </header>

      {/* data-lenis-prevent keeps native scrolling inside this panel */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="flex-1 space-y-5 overflow-y-auto p-5"
        aria-live="polite"
      >
        {isEmpty ? (
          <div className="flex h-full flex-col justify-end gap-2">
            <p className="mb-2 text-sm text-muted">Try one of these</p>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded-md border border-line bg-white/[0.02] px-4 py-3 text-left text-sm text-fg/85 transition-colors hover:border-fg/40 hover:text-fg"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : (
          messages.map((message, index) => <ChatMessageBubble key={index} message={message} />)
        )}
        {isLoading && <TypingIndicator />}
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>

      <div className="border-t border-line p-3">
        <ChatComposer disabled={isLoading} onSend={sendMessage} />
      </div>
    </Panel>
  )
}
