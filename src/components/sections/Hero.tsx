'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 0.03, 0.26, 1] as [number, number, number, number] },
        }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy"
      aria-label="Hero"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy to-navy-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(28,165,165,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(201,162,75,0.08)_0%,transparent_55%)]" />

      {/* Content */}
      <div className="relative z-10 container-mma section-padding pt-32 pb-40">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div {...fadeUp(0)} className="mb-6">
            <span className="section-tag">
              <span className="gold-line" aria-hidden="true" />
              {t('tagline')}
            </span>
          </motion.div>

          {/* Availability badge */}
          <motion.div {...fadeUp(0.1)} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </span>
              <span className="text-white/70 text-xs font-sans">{t('availabilityBadge')}</span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.18)}
            className="font-sans font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-balance mb-7"
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.28)}
            className="text-white/60 font-body text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.38)} className="flex flex-wrap gap-4">
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t('ctaPrimary')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={`/${locale}/services/consignation`} className="btn-secondary">
              {t('ctaSecondary')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* SVG Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden" aria-hidden="true">
        {/* Wave layer 1 — slower */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-[200%] h-full animate-wave origin-left"
          style={{ opacity: 0.15 }}
        >
          <path
            d="M0 40 C180 80 360 0 540 40 C720 80 900 0 1080 40 C1260 80 1440 0 1440 40 L1440 120 L0 120 Z"
            fill="#1CA5A5"
          />
        </svg>
        {/* Wave layer 2 — faster */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow origin-left"
          style={{ opacity: 0.1 }}
        >
          <path
            d="M0 60 C240 20 480 80 720 60 C960 40 1200 80 1440 60 L1440 120 L0 120 Z"
            fill="#C9A24B"
          />
        </svg>
        {/* Wave layer 3 — solid base */}
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-16"
        >
          <path
            d="M0 30 C360 60 720 0 1080 30 C1260 45 1350 20 1440 30 L1440 60 L0 60 Z"
            fill="rgb(10,42,67)"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-white/30 text-xs font-sans tracking-widest uppercase">{t('scrollHint')}</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
