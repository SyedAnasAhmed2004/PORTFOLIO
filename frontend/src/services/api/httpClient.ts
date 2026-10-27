import { env } from '@/config/env'

const REQUEST_TIMEOUT_MS = 20_000

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** Extracts a human-readable message from FastAPI error payloads. */
function parseErrorDetail(body: unknown): string | undefined {
  if (!body || typeof body !== 'object' || !('detail' in body)) return undefined
  const { detail } = body as { detail: unknown }
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg)
  return undefined
}

export async function request<TResponse>(path: string, init: RequestInit = {}): Promise<TResponse> {
  let response: Response
  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init.headers },
      signal: init.signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch {
    throw new ApiError('Unable to reach the server. Please try again.', 0)
  }

  const body: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(parseErrorDetail(body) ?? 'Something went wrong.', response.status)
  }
  return body as TResponse
}

export const httpClient = {
  get: <TResponse>(path: string) => request<TResponse>(path),
  post: <TResponse>(path: string, payload: unknown) =>
    request<TResponse>(path, { method: 'POST', body: JSON.stringify(payload) }),
}
