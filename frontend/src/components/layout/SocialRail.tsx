import { DocumentIcon, SocialIcon } from '@/components/ui/Icons'
import { profile } from '@/data/profile'

/** Desktop-only fixed social links (bottom left) and resume link (bottom right). */
export function SocialRail() {
  return (
    <>
      <ul className="fixed bottom-12 left-12 z-40 hidden flex-col gap-7 lg:flex">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={social.label}
              className="block text-fg/80 transition-colors hover:text-fg"
            >
              <SocialIcon label={social.label} className="size-6" />
            </a>
          </li>
        ))}
      </ul>

      {profile.resumeUrl && (
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="fixed right-12 bottom-12 z-40 hidden items-center gap-2 text-lg font-medium tracking-[0.3em] text-fg/45 uppercase transition-colors hover:text-fg lg:flex"
        >
          Resume
          <DocumentIcon className="size-5" />
        </a>
      )}
    </>
  )
}
