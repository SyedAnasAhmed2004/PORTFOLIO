import { motion } from 'motion/react'

import { cn } from '@/lib/cn'
import type { ChatMessage } from '@/types/chat'

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'rounded-br-md bg-fg text-ink-950'
            : 'rounded-bl-md border border-line bg-white/[0.04] text-fg/90',
        )}
      >
        {message.content}
      </div>
    </motion.div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start" role="status" aria-label="Assistant is typing">
      <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-line bg-white/[0.04] px-4 py-4">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-1.5 rounded-full bg-accent"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: dot * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}
