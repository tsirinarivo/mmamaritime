import { getTranslations } from 'next-intl/server'
import ScrollReveal from '@/components/ui/ScrollReveal'

const icons = [
  // Clock / 24h
  <svg key="clock" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Map pin / Presence
  <svg key="pin" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Shield / Compliance
  <svg key="shield" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Globe / Network
  <svg key="globe" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
]

export default async function WhyMma() {
  const t = await getTranslations('whyMma')
  const items = t.raw('items') as Array<{ title: string; description: string }>

  return (
    <section className="bg-cream-50 py-24" aria-label={t('title')}>
      <div className="container-mma section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <ScrollReveal direction="left">
            <span className="section-tag mb-4">
              <span className="gold-line" aria-hidden="true" />
              MMA
            </span>
            <h2 className="font-sans font-bold text-navy text-3xl sm:text-4xl lg:text-5xl text-balance mb-6">
              {t('title')}
            </h2>
            <p className="text-navy/60 font-body text-lg leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Decorative line */}
            <div className="mt-10 pt-10 border-t border-navy/10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-navy border-2 border-cream-50 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                ))}
              </div>
              <p className="text-navy/60 text-sm font-body">
                {t.raw('subtitle').toString().split(' ').slice(0, 6).join(' ') + '…'}
              </p>
            </div>
          </ScrollReveal>

          {/* Right: feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="right">
                <div className="bg-white border border-cream-300 p-6 rounded-sm hover:border-gold/30 hover:shadow-md transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-navy text-gold rounded-sm mb-4 group-hover:bg-gold group-hover:text-navy transition-colors duration-300">
                    {icons[i]}
                  </div>
                  <h3 className="font-sans font-semibold text-navy text-base mb-2">{item.title}</h3>
                  <p className="text-navy/60 text-sm font-body leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
