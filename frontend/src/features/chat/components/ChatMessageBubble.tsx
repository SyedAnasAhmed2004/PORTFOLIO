import { motion } from 'motion/react'

import { cn } from '@/lib/cn'
import type { ChatMessage } from '@/types/chat'

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex flex-col gap-1.5', isUser ? 'items-end' : 'items-start')}
    >
      <span className="text-xs text-muted">{isUser ? 'You' : 'Assistant'}</span>
      <div
        className={cn(
          'max-w-[88%] rounded-lg border px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap',
          isUser ? 'border-fg/20 bg-white/[0.08] text-fg' : 'border-line bg-panel/80 text-fg/90',
        )}
      >
        {message.content}
      </div>
    </motion.div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 text-sm text-muted" role="status">
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-1.5 bg-amber"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
          />
        ))}
      </span>
      Thinking
    </div>
  )
}
