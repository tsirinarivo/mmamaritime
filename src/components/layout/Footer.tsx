import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function Footer() {
  const locale = await getLocale()
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  const year = new Date().getFullYear()

  const services = [
    { label: tNav('consignation'), href: `/${locale}/services/consignation` },
    { label: tNav('manning'), href: `/${locale}/services/manning` },
    { label: tNav('logistique'), href: `/${locale}/services/logistique` },
  ]

  const ports = [
    'Toamasina',
    'Ehoala',
    'Mahajanga',
    'Antsiranana',
    'Nosy Be',
    'Toliara',
  ]

  return (
    <footer className="bg-navy border-t-2 border-gold/40">
      {/* Main footer grid */}
      <div className="container-mma section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <Link href={`/${locale}`} aria-label="MMA — Accueil">
              <Image
                src="/brand/logo-light.svg"
                alt="MMA — Madagascar Maritime Agency"
                width={160}
                height={44}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm font-body leading-relaxed max-w-xs">
              {t('description')}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-teal/30 bg-teal/10 rounded-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </span>
              <span className="text-teal text-xs font-sans font-medium">{t('tagline')}</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-white font-sans font-semibold text-sm uppercase tracking-widest">
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-white/60 hover:text-gold text-sm font-body transition-colors duration-200 focus:outline-none focus-visible:text-gold"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ports */}
          <div className="space-y-4">
            <h3 className="text-white font-sans font-semibold text-sm uppercase tracking-widest">
              {t('portsTitle')}
            </h3>
            <ul className="space-y-2.5">
              {ports.map((port) => (
                <li key={port}>
                  <Link
                    href={`/${locale}/ports`}
                    className="text-white/60 hover:text-gold text-sm font-body transition-colors duration-200 focus:outline-none focus-visible:text-gold"
                  >
                    {port}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-sans font-semibold text-sm uppercase tracking-widest">
              {t('contactTitle')}
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-white/60 text-sm font-body">{t('address')}</p>
                  <p className="text-white/60 text-sm font-body">{t('country')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+261371777777"
                  className="text-white/60 hover:text-gold text-sm font-body transition-colors"
                >
                  +261 37 17 777 77
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:contact@mmamaritime.com"
                  className="text-white/60 hover:text-gold text-sm font-body transition-colors"
                >
                  contact@mmamaritime.com
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-mma section-padding py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-body">
            {t('copyright', { year })}
          </p>
          <nav className="flex items-center gap-5" aria-label="Liens légaux">
            <Link
              href={`/${locale}/mentions-legales`}
              className="text-white/40 hover:text-white/70 text-xs font-body transition-colors"
            >
              {t('legalNotice')}
            </Link>
            <Link
              href={`/${locale}/confidentialite`}
              className="text-white/40 hover:text-white/70 text-xs font-body transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/conditions`}
              className="text-white/40 hover:text-white/70 text-xs font-body transition-colors"
            >
              {t('terms')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
