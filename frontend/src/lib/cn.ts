import { clsx, type ClassValue } from 'clsx'

/** Compose conditional class names. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
