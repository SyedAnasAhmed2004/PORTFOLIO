import { ButtonLink } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <section className="flex min-h-dvh flex-col justify-center px-6 pt-28 pb-16 sm:px-12 lg:w-[55%] lg:pl-28">
      <p className="label text-danger">Error 404</p>
      <h1 className="mt-5 max-w-lg text-5xl leading-[1.05] font-light uppercase sm:text-6xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-6 max-w-md text-muted">The link may be broken, or the page may have moved.</p>
      <div className="mt-10">
        <ButtonLink to={ROUTES.home}>Go to home</ButtonLink>
      </div>
    </section>
  )
}
