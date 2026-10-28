import { ArrowUpRightIcon } from '@/components/ui/Icons'
import { profile } from '@/data/profile'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const externalLinks = profile.socials.filter((social) => social.href.startsWith('http'))

  return (
    <footer className="page-container pt-24 pb-16">
      <p className="text-5xl font-light uppercase sm:text-6xl">{profile.name}</p>

      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        <dl className="space-y-6 text-sm">
          <div>
            <dt className="text-muted">Email</dt>
            <dd className="mt-2">
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-signal">
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Location</dt>
            <dd className="mt-2">{profile.location}</dd>
          </div>
        </dl>

        <div>
          <p className="text-sm text-muted">Social</p>
          <ul className="mt-2">
            {externalLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-40 items-center justify-between border-b border-fg/40 py-2 text-xl transition-colors hover:border-fg"
                >
                  {social.label}
                  <ArrowUpRightIcon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-muted sm:justify-self-end">
          <p className="text-lg text-fg">Designed and developed by {profile.name}</p>
          <p className="mt-4">© {CURRENT_YEAR}</p>
        </div>
      </div>
    </footer>
  )
}
