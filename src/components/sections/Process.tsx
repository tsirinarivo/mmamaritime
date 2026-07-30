import { getTranslations } from 'next-intl/server'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default async function Process() {
  const t = await getTranslations('process')
  const steps = t.raw('steps') as Array<{
    number: string
    label: string
    title: string
    description: string
  }>

  return (
    <section className="bg-cream-50 py-24" id="process" aria-label={t('title')}>
      <div className="container-mma section-padding">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="section-tag justify-center mb-4">
            <span className="gold-line" aria-hidden="true" />
            Processus
            <span className="gold-line" aria-hidden="true" />
          </span>
          <h2 className="font-sans font-bold text-navy text-3xl sm:text-4xl lg:text-5xl text-balance mb-4">
            {t('title')}
          </h2>
          <p className="text-navy/60 font-body text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        {/* Steps — vertical timeline on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Horizontal connector line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />

          <ol className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <li className="relative flex lg:flex-col gap-5 lg:gap-4 lg:items-center lg:text-center">
                  {/* Vertical connector (mobile only) */}
                  {i < steps.length - 1 && (
                    <div
                      className="lg:hidden absolute left-5 top-12 bottom-0 w-px bg-gold/20 -mb-8"
                      aria-hidden="true"
                    />
                  )}

                  {/* Step circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-navy border-2 border-gold flex items-center justify-center z-10 relative">
                      <span className="font-sans font-bold text-gold text-xs">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 lg:flex-none">
                    <div className="inline-block text-teal text-xs font-sans font-semibold uppercase tracking-widest mb-1">
                      {step.label}
                    </div>
                    <h3 className="font-sans font-bold text-navy text-base mb-2">{step.title}</h3>
                    <p className="text-navy/60 text-sm font-body leading-relaxed">{step.description}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
