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
  const t = await getTranslations({ locale, namespace: 'pages.manning' })
  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
  }
}

export default async function ManningPage() {
  const locale = await getLocale()
  const t = await getTranslations('pages.manning')
  const servicesItems = t.raw('servicesItems') as Array<{ title: string; description: string }>
  const faqs = t.raw('faqs') as Array<{ question: string; answer: string }>

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Manning & Crewing — Recrutement de marins Madagascar',
    provider: {
      '@type': 'Organization',
      name: 'Madagascar Maritime Agency',
      url: 'https://mmamaritime.com',
    },
    serviceType: 'Manning Agency',
    areaServed: { '@type': 'Country', name: 'Madagascar' },
    description: t('heroSubtitle'),
    url: `https://mmamaritime.com/${locale}/services/manning`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,162,75,0.08)_0%,transparent_60%)]" aria-hidden="true" />
        <div className="container-mma section-padding relative z-10">
          <nav className="mb-8 flex items-center gap-2 text-sm font-body text-white/40" aria-label="Fil d'Ariane">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold">{t('heroTag')}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="section-tag mb-4">
              <span className="gold-line" aria-hidden="true" />
              {t('heroTag')}
            </span>
            <h1 className="font-sans font-bold text-white text-4xl sm:text-5xl lg:text-6xl text-balance mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-white/60 font-body text-xl leading-relaxed mb-8">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className="btn-primary">
                Recruter des marins
              </Link>
              <a href="tel:+261371777777" className="btn-secondary">
                +261 37 17 777 77
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream-50 py-20">
        <div className="container-mma section-padding">
          <ScrollReveal className="max-w-3xl">
            <h2 className="font-sans font-bold text-navy text-2xl sm:text-3xl mb-5">{t('introTitle')}</h2>
            <p className="text-navy/70 font-body text-lg leading-relaxed">{t('introText')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <div className="container-mma section-padding">
          <ScrollReveal className="mb-12">
            <span className="section-tag mb-3">
              <span className="gold-line" aria-hidden="true" />
              Prestations
            </span>
            <h2 className="font-sans font-bold text-navy text-3xl sm:text-4xl">{t('servicesTitle')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div className="flex gap-5 p-6 border border-cream-300 rounded-sm hover:border-gold/30 transition-colors hover:shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold/10 rounded-sm flex items-center justify-center text-gold font-sans font-bold text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-navy text-base mb-2">{item.title}</h3>
                    <p className="text-navy/60 font-body text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MLC 2006 Compliance */}
      <section className="bg-navy py-16">
        <div className="container-mma section-padding">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 rounded-full mb-6">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="font-sans font-bold text-white text-2xl sm:text-3xl mb-4">{t('mlcTitle')}</h2>
            <p className="text-white/60 font-body text-base leading-relaxed">{t('mlcText')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-50 py-20">
        <div className="container-mma section-padding max-w-3xl mx-auto">
          <ScrollReveal className="mb-12">
            <span className="section-tag mb-3">
              <span className="gold-line" aria-hidden="true" />
              FAQ
            </span>
            <h2 className="font-sans font-bold text-navy text-3xl sm:text-4xl">{t('faqTitle')}</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <details className="group bg-white border border-cream-300 rounded-sm overflow-hidden">
                  <summary className="flex items-start justify-between gap-4 p-6 cursor-pointer list-none font-sans font-semibold text-navy text-base hover:text-gold transition-colors">
                    <span>{faq.question}</span>
                    <svg className="w-5 h-5 flex-shrink-0 text-gold mt-0.5 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-navy/70 font-body text-sm leading-relaxed border-t border-cream-300 pt-4">
                    {faq.answer}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14">
        <div className="container-mma section-padding flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-white text-xl sm:text-2xl mb-1">Besoin de marins qualifiés ?</h2>
            <p className="text-white/50 font-body text-sm">Contactez notre équipe manning pour un devis rapide.</p>
          </div>
          <Link href={`/${locale}/contact`} className="btn-primary flex-shrink-0">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  )
}
