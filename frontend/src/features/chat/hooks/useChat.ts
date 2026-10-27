import { useCallback, useState } from 'react'

import { chatApi } from '@/services/api/chatApi'
import { ApiError } from '@/services/api/httpClient'
import type { ChatMessage } from '@/types/chat'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || isLoading) return

      const history: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
      setMessages(history)
      setError(null)
      setIsLoading(true)

      try {
        const response = await chatApi.sendMessages(history)
        setMessages((current) => [...current, response.message])
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Something went wrong.')
      } finally {
        setIsLoading(false)
      }
    },
    [messages, isLoading],
  )

  const resetConversation = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, resetConversation }
}
