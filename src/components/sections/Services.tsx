import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default async function Services() {
  const t = await getTranslations('services')
  const locale = await getLocale()

  const cards = [
    {
      key: 'consignation' as const,
      href: `/${locale}/services/consignation`,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
    },
    {
      key: 'manning' as const,
      href: `/${locale}/services/manning`,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      key: 'logistique' as const,
      href: `/${locale}/services/logistique`,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-navy py-24" id="services" aria-label={t('title')}>
      <div className="container-mma section-padding">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="section-tag justify-center mb-4">
            <span className="gold-line" aria-hidden="true" />
            Services
            <span className="gold-line" aria-hidden="true" />
          </span>
          <h2 className="font-sans font-bold text-white text-3xl sm:text-4xl lg:text-5xl text-balance mb-4">
            {t('title')}
          </h2>
          <p className="text-white/50 font-body text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const features = t.raw(`${card.key}.features`) as string[]
            return (
              <ScrollReveal key={card.key} delay={i * 0.1}>
                <article className="group relative flex flex-col h-full bg-white/[0.03] border border-white/10 hover:border-gold/30 transition-all duration-300 rounded-sm overflow-hidden hover:bg-white/[0.05]">
                  {/* Teal hover accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                  <div className="p-8 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-sm mb-6">
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-bold text-white text-xl mb-3">
                      {t(`${card.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-white/50 font-body text-sm leading-relaxed mb-6">
                      {t(`${card.key}.description`)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8 flex-1" aria-label={`Fonctionnalités ${t(`${card.key}.title`)}`}>
                      {features.slice(0, 5).map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm text-white/60 font-body">
                          <svg className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-gold font-sans font-semibold text-sm hover:gap-3 transition-all duration-200 group/link"
                    >
                      {t(`${card.key}.cta`)}
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
