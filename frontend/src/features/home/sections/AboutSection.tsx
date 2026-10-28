import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/profile'

export function AboutSection() {
  return (
    <section id="about" className="flex min-h-dvh items-center py-24">
      <div className="page-container grid lg:grid-cols-2">
        <Reveal className="lg:col-start-2">
          <h2 className="label">About me</h2>
          <p className="mt-6 text-2xl leading-snug font-light text-fg/90 sm:text-[1.7rem]">
            {profile.about}
          </p>
          <p className="mt-8 flex items-center gap-3 text-sm text-muted">
            <span className="size-2 animate-pulse rounded-full bg-amber" />
            {profile.availability}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
