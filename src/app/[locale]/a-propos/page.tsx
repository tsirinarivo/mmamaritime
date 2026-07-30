import { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.about' })
  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
  }
}

export default async function AboutPage() {
  const locale = await getLocale()
  const t = await getTranslations('pages.about')
  const values = t.raw('values') as Array<{ title: string; description: string }>

  const valueIcons = [
    // Integrity
    <svg key="integrity" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    // Reactivity
    <svg key="reactivity" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // Local
    <svg key="local" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    </svg>,
    // Compliance
    <svg key="compliance" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>,
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,162,75,0.08)_0%,transparent_60%)]" aria-hidden="true" />
        <div className="container-mma section-padding relative z-10">
          <div className="max-w-3xl">
            <span className="section-tag mb-4">
              <span className="gold-line" aria-hidden="true" />
              {t('heroTag')}
            </span>
            <h1 className="font-sans font-bold text-white text-4xl sm:text-5xl lg:text-6xl text-balance mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-white/60 font-body text-xl leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream-50 py-20">
        <div className="container-mma section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <span className="section-tag mb-4">
                <span className="gold-line" aria-hidden="true" />
                Histoire
              </span>
              <h2 className="font-sans font-bold text-navy text-2xl sm:text-3xl mb-5">{t('storyTitle')}</h2>
              <p className="text-navy/70 font-body text-base leading-relaxed mb-6">{t('storyText')}</p>
              <div className="flex items-center gap-4 pt-6 border-t border-navy/10">
                <div className="text-center">
                  <p className="font-sans font-bold text-navy text-3xl">+15</p>
                  <p className="text-navy/50 text-xs font-body">ans d&apos;expérience</p>
                </div>
                <div className="w-px h-10 bg-navy/10" aria-hidden="true" />
                <div className="text-center">
                  <p className="font-sans font-bold text-navy text-3xl">6</p>
                  <p className="text-navy/50 text-xs font-body">ports couverts</p>
                </div>
                <div className="w-px h-10 bg-navy/10" aria-hidden="true" />
                <div className="text-center">
                  <p className="font-sans font-bold text-navy text-3xl">24/7</p>
                  <p className="text-navy/50 text-xs font-body">disponibilité</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <h2 className="font-sans font-bold text-navy text-2xl sm:text-3xl mb-5">{t('missionTitle')}</h2>
              <p className="text-navy/70 font-body text-base leading-relaxed">{t('missionText')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy py-20">
        <div className="container-mma section-padding">
          <ScrollReveal className="text-center mb-12">
            <span className="section-tag justify-center mb-4">
              <span className="gold-line" aria-hidden="true" />
              Valeurs
              <span className="gold-line" aria-hidden="true" />
            </span>
            <h2 className="font-sans font-bold text-white text-3xl sm:text-4xl">{t('valuesTitle')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white/[0.04] border border-white/10 p-6 rounded-sm hover:border-gold/30 transition-colors">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gold/10 text-gold rounded-sm mb-4">
                    {valueIcons[i]}
                  </div>
                  <h3 className="font-sans font-bold text-white text-base mb-2">{value.title}</h3>
                  <p className="text-white/50 text-sm font-body leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-cream-50 py-20">
        <div className="container-mma section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <span className="section-tag mb-4">
                <span className="gold-line" aria-hidden="true" />
                Certifications
              </span>
              <h2 className="font-sans font-bold text-navy text-2xl sm:text-3xl mb-5">{t('certTitle')}</h2>
              <p className="text-navy/70 font-body text-base leading-relaxed mb-8">{t('certText')}</p>

              {/* Certification badges */}
              <div className="flex flex-wrap gap-4">
                {['APMF Agréé', 'MLC 2006 Conforme', 'STCW Certifié'].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gold/30 bg-gold/5 rounded-sm"
                  >
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-navy font-sans font-semibold text-sm">{badge}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20">
        <div className="container-mma section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <span className="section-tag mb-4">
                <span className="gold-line" aria-hidden="true" />
                Équipe
              </span>
              <h2 className="font-sans font-bold text-navy text-2xl sm:text-3xl mb-5">{t('teamTitle')}</h2>
              <p className="text-navy/70 font-body text-base leading-relaxed">{t('teamText')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14">
        <div className="container-mma section-padding flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-white text-xl sm:text-2xl mb-1">Travaillons ensemble</h2>
            <p className="text-white/50 font-body text-sm">Contactez notre équipe pour discuter de votre projet maritime.</p>
          </div>
          <Link href={`/${locale}/contact`} className="btn-primary flex-shrink-0">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  )
}
