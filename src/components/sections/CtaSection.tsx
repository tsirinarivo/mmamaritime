import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default async function CtaSection() {
  const t = await getTranslations('cta')
  const locale = await getLocale()

  return (
    <section className="relative bg-navy overflow-hidden py-24" aria-label={t('title')}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-700" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,162,75,0.12)_0%,transparent_60%)]" aria-hidden="true" />

      {/* Gold border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />

      <div className="relative z-10 container-mma section-padding">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans font-bold text-white text-3xl sm:text-4xl lg:text-5xl text-balance mb-5">
            {t('title')}
          </h2>
          <p className="text-white/60 font-body text-lg mb-10">
            {t('subtitle')}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t('ctaPrimary')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="btn-secondary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('ctaSecondary')}
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="text-white/50 hover:text-gold transition-colors font-body flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('phone')}
            </a>
            <span className="text-white/20" aria-hidden="true">·</span>
            <a href={`mailto:${t('email')}`} className="text-white/50 hover:text-gold transition-colors font-body flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('email')}
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Gold border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
    </section>
  )
}
