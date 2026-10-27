import type { ContactPayload, ContactResponse } from '@/types/contact'

import { API_ENDPOINTS } from './endpoints'
import { httpClient } from './httpClient'

export const contactApi = {
  submit: (payload: ContactPayload) =>
    httpClient.post<ContactResponse>(API_ENDPOINTS.contact, payload),
}
