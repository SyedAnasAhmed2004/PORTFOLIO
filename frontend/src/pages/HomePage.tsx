import { AboutSection } from '@/features/home/sections/AboutSection'
import { CallToActionSection } from '@/features/home/sections/CallToActionSection'
import { HeroSection } from '@/features/home/sections/HeroSection'
import { ServicesSection } from '@/features/home/sections/ServicesSection'
import { TechStackSection } from '@/features/home/sections/TechStackSection'
import { TimelineSection } from '@/features/home/sections/TimelineSection'
import { WorkSection } from '@/features/home/sections/WorkSection'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function HomePage() {
  usePageTitle()

  return (
    <>
      {/* The first three sections are one viewport tall each: the robot's scroll path assumes it. */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TimelineSection />
      <WorkSection />
      <TechStackSection />
      <CallToActionSection />
    </>
  )
}
