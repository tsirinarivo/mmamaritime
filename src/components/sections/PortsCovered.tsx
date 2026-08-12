import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default async function PortsCovered() {
  const t = await getTranslations('ports')
  const locale = await getLocale()
  const portList = t.raw('list') as Array<{
    name: string
    alias: string
    region: string
    description: string
    principal: boolean
    traffic: string
  }>

  return (
    <section className="bg-navy py-24" id="ports" aria-label={t('title')}>
      <div className="container-mma section-padding">
        {/* Header */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="section-tag mb-4">
              <span className="gold-line" aria-hidden="true" />
              {t('locationTag')}
            </span>
            <h2 className="font-sans font-bold text-white text-3xl sm:text-4xl lg:text-5xl text-balance">
              {t('title')}
            </h2>
          </div>
          <p className="text-white/50 font-body text-base max-w-sm lg:text-right">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Madagascar SVG map */}
          <ScrollReveal direction="left" className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-xs mx-auto" aria-hidden="true">
              {/* Simple Madagascar outline */}
              <svg
                viewBox="0 0 200 400"
                className="w-full"
                fill="none"
              >
                {/* Island outline — simplified shape */}
                <path
                  d="M100 10 C115 12 130 18 138 30 C148 45 152 62 155 78 C160 100 158 122 155 144 C150 170 142 192 138 215 C134 238 133 262 130 285 C127 305 120 325 110 342 C102 355 92 365 82 370 C72 375 62 372 55 362 C46 350 42 332 40 315 C37 295 38 275 40 255 C43 230 48 207 50 184 C52 158 48 132 46 108 C44 86 44 64 50 44 C57 26 75 8 100 10 Z"
                  stroke="#C9A24B"
                  strokeWidth="2"
                  fill="rgba(10,42,67,0.8)"
                />
                {/* Toamasina dot */}
                <circle cx="142" cy="160" r="6" fill="#C9A24B" />
                <text x="150" y="163" fill="#C9A24B" fontSize="10" fontFamily="sans-serif">Toamasina</text>
                {/* Ehoala dot */}
                <circle cx="118" cy="320" r="4" fill="#1CA5A5" />
                <text x="52" y="323" fill="#1CA5A5" fontSize="9" fontFamily="sans-serif">Ehoala</text>
                {/* Mahajanga dot */}
                <circle cx="66" cy="95" r="4" fill="#1CA5A5" />
                <text x="32" y="90" fill="#1CA5A5" fontSize="9" fontFamily="sans-serif">Mahajanga</text>
                {/* Antsiranana dot */}
                <circle cx="100" cy="22" r="4" fill="#1CA5A5" />
                <text x="106" y="25" fill="#1CA5A5" fontSize="9" fontFamily="sans-serif">Diego-Suarez</text>
                {/* Nosy Be dot */}
                <circle cx="56" cy="52" r="4" fill="#1CA5A5" />
                <text x="26" y="48" fill="#1CA5A5" fontSize="9" fontFamily="sans-serif">Nosy Be</text>
                {/* Toliara dot */}
                <circle cx="60" cy="295" r="4" fill="#1CA5A5" />
                <text x="22" y="298" fill="#1CA5A5" fontSize="9" fontFamily="sans-serif">Toliara</text>
              </svg>
              <p className="text-center text-white/30 text-xs mt-4 font-sans">
                {t('mapCaption')}
              </p>
            </div>
          </ScrollReveal>

          {/* Port cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portList.map((port, i) => (
              <ScrollReveal key={port.name} delay={i * 0.08}>
                <Link
                  href={`/${locale}/ports`}
                  className="block group relative bg-white/[0.03] border border-white/10 hover:border-gold/30 transition-all duration-300 rounded-sm p-5 hover:bg-white/[0.05]"
                >
                  {port.principal && (
                    <span className="absolute top-3 right-3 text-[10px] font-sans font-semibold text-navy bg-gold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Principal
                    </span>
                  )}
                  <div className="mb-3">
                    <h3 className="font-sans font-bold text-white text-base group-hover:text-gold transition-colors">
                      {port.name}
                    </h3>
                    <p className="text-teal text-xs font-sans">{port.alias} · {port.region}</p>
                  </div>
                  <p className="text-white/50 text-xs font-body leading-relaxed mb-3">
                    {port.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs font-body">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {port.traffic}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
