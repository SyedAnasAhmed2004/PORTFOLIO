import type { ChatMessage, ChatResponse } from '@/types/chat'

import { API_ENDPOINTS } from './endpoints'
import { httpClient } from './httpClient'

export const chatApi = {
  sendMessages: (messages: ChatMessage[]) =>
    httpClient.post<ChatResponse>(API_ENDPOINTS.chat, { messages }),
}
