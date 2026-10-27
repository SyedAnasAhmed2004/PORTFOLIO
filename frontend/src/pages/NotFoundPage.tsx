import { ButtonLink } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Not found')

  return (
    <section className="container-page flex min-h-dvh flex-col items-center justify-center text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-8xl italic sm:text-9xl">Lost in latent space.</h1>
      <p className="mt-6 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <ButtonLink to={ROUTES.home} className="mt-10">
        Back home
      </ButtonLink>
    </section>
  )
}
