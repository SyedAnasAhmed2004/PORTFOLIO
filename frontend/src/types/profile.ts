export interface SocialLink {
  label: string
  href: string
}

export interface Stat {
  value: string
  label: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Experience {
  role: string
  company: string
  period: string
  summary: string
  highlights: string[]
}

export interface Project {
  title: string
  summary: string
  tags: string[]
  href?: string
}

export interface Education {
  institution: string
  credential: string
  period: string
  details: string[]
}

export interface Profile {
  name: string
  role: string
  location: string
  email: string
  headline: string
  /** Words in the headline rendered with the accent serif style. */
  headlineHighlights: string[]
  summary: string
  availability: string
  socials: SocialLink[]
  stats: Stat[]
  skills: SkillGroup[]
  experience: Experience[]
  projects: Project[]
  education: Education[]
}
