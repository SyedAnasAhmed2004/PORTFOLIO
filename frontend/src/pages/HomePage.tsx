import { usePageTitle } from '@/hooks/usePageTitle'
import { AboutSection } from '@/features/home/sections/AboutSection'
import { CallToActionSection } from '@/features/home/sections/CallToActionSection'
import { ExperienceSection } from '@/features/home/sections/ExperienceSection'
import { HeroSection } from '@/features/home/sections/HeroSection'
import { ProjectsSection } from '@/features/home/sections/ProjectsSection'
import { SkillsSection } from '@/features/home/sections/SkillsSection'

export default function HomePage() {
  usePageTitle()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CallToActionSection />
    </>
  )
}
