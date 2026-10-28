export interface SocialLink {
  label: 'GitHub' | 'LinkedIn' | 'Email'
  href: string
}

/** A "What I do" card. */
export interface Service {
  title: string
  tagline: string
  description: string
  tools: string[]
}

/** One row of the career & education timeline, newest first. */
export interface TimelineEntry {
  year: string
  title: string
  organization: string
  description: string
}

export type ProjectVisual = 'market' | 'chess' | 'traffic'

export interface Project {
  title: string
  category: string
  summary: string
  tools: string[]
  /** Which built-in illustration to show for the project. */
  visual: ProjectVisual
  href?: string
}

export interface Profile {
  name: string
  /** Hero tagline lines, e.g. ["AI engineer &", "generative AI developer"]. */
  roles: [string, string]
  location: string
  email: string
  about: string
  availability: string
  socials: SocialLink[]
  /** Path or URL of a downloadable resume; the link is hidden while unset. */
  resumeUrl?: string
  services: Service[]
  timeline: TimelineEntry[]
  projects: Project[]
  techStack: string[]
}
