// Mirrors backend/app/schemas/chat.py

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  role: ChatRole
  content: string
}

export interface SourceReference {
  title: string
  url: string | null
  snippet: string | null
}

export interface ChatResponse {
  message: ChatMessage
  sources: SourceReference[]
}
