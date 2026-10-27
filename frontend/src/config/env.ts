/** Typed access to build-time environment variables. */
export const env = {
  // Empty in development so requests hit the Vite proxy; the backend URL in production.
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, ''),
} as const
