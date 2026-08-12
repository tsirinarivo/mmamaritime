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
  const t = await getTranslations({ locale, namespace: 'pages.ports' })
  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
  }
}

export default async function PortsPage() {
  const locale = await getLocale()
  const t = await getTranslations('pages.ports')
  const portList = (await getTranslations('ports')).raw('list') as Array<{
    name: string
    alias: string
    region: string
    description: string
    principal: boolean
    traffic: string
  }>

  const portDetails = [
    { key: 'toamasina', content: { title: t('toamasinaTitle'), text: t('toamasinaText') } },
    { key: 'ehoala', content: { title: t('eholaTitle'), text: t('eholaText') } },
    { key: 'mahajanga', content: { title: t('mahajangaTitle'), text: t('mahajangaText') } },
    { key: 'antsiranana', content: { title: t('antsirananaTitle'), text: t('antsirananaText') } },
    { key: 'nosybe', content: { title: t('nosybeTitle'), text: t('nosybeText') } },
    { key: 'toliara', content: { title: t('toliaraTitle'), text: t('toliaraText') } },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(28,165,165,0.1)_0%,transparent_60%)]" aria-hidden="true" />
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

      {/* Intro */}
      <section className="bg-cream-50 py-16">
        <div className="container-mma section-padding">
          <ScrollReveal className="max-w-3xl">
            <h2 className="font-sans font-bold text-navy text-2xl sm:text-3xl mb-4">{t('introTitle')}</h2>
            <p className="text-navy/70 font-body text-lg leading-relaxed">{t('introText')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Port overview grid */}
      <section className="bg-white py-16">
        <div className="container-mma section-padding">
          <ScrollReveal className="mb-10">
            <h2 className="font-sans font-bold text-navy text-2xl sm:text-3xl">{t('portsDetailTitle')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {portList.map((port) => (
              <a
                key={port.name}
                href={`#${port.name.toLowerCase()}`}
                className="group flex flex-col items-center text-center p-4 border border-cream-300 rounded-sm hover:border-gold/30 hover:shadow-sm transition-all duration-200"
              >
                {port.principal && (
                  <span className="text-[9px] font-sans font-semibold bg-gold text-navy px-2 py-0.5 rounded-full uppercase tracking-wide mb-2">
                    Hub
                  </span>
                )}
                <p className="font-sans font-semibold text-navy text-sm group-hover:text-gold transition-colors">{port.name}</p>
                <p className="text-navy/40 text-xs font-body mt-0.5">{port.region}</p>
              </a>
            ))}
          </div>

          {/* Port detail cards */}
          <div className="space-y-10">
            {portDetails.map((pd, i) => {
              const port = portList[i]
              return (
                <ScrollReveal key={pd.key} delay={0.05}>
                  <article
                    id={port?.name.toLowerCase()}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 border border-cream-300 rounded-sm hover:border-gold/20 transition-colors"
                  >
                    <div className="lg:col-span-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div>
                          <h3 className="font-sans font-bold text-navy text-xl mb-0.5">{pd.content.title}</h3>
                          {port && (
                            <p className="text-teal text-xs font-sans">
                              {port.alias} · {port.region}
                            </p>
                          )}
                        </div>
                        {port?.principal && (
                          <span className="flex-shrink-0 text-[10px] font-sans font-semibold bg-gold text-navy px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Principal
                          </span>
                        )}
                      </div>
                      {port && (
                        <div className="inline-flex items-center gap-1.5 text-navy/40 text-xs font-body">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {port.traffic}
                        </div>
                      )}
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-navy/70 font-body text-base leading-relaxed">{pd.content.text}</p>
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14">
        <div className="container-mma section-padding flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-white text-xl sm:text-2xl mb-1">{t('ctaTitle')}</h2>
            <p className="text-white/50 font-body text-sm">{t('ctaSubtitle')}</p>
          </div>
          <Link href={`/${locale}/contact`} className="btn-primary flex-shrink-0">
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </>
  )
}
