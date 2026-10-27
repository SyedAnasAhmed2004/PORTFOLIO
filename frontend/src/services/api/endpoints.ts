const API_V1 = '/api/v1'

export const API_ENDPOINTS = {
  health: `${API_V1}/health`,
  chat: `${API_V1}/chat`,
  agentStatus: `${API_V1}/agent/status`,
  contact: `${API_V1}/contact`,
} as const
