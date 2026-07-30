'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLinks = [
    { label: t('ports'), href: `/${locale}/ports` },
    { label: t('about'), href: `/${locale}/a-propos` },
    { label: t('contact'), href: `/${locale}/contact` },
  ]

  const services = [
    {
      label: t('consignation'),
      href: `/${locale}/services/consignation`,
      desc:
        locale === 'fr'
          ? 'Port call, husbandry, formalités'
          : 'Port call, husbandry, formalities',
    },
    {
      label: t('manning'),
      href: `/${locale}/services/manning`,
      desc: locale === 'fr' ? 'Recrutement, placement MLC 2006' : 'Recruitment, MLC 2006 placement',
    },
    {
      label: t('logistique'),
      href: `/${locale}/services/logistique`,
      desc:
        locale === 'fr' ? 'Transport & logistique portuaire' : 'Port transport & logistics',
    },
  ]

  const otherLocale = locale === 'fr' ? 'en' : 'fr'
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/30'
            : 'bg-transparent'
        }`}
      >
        <div className="container-mma section-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
              <Image
                src="/brand/logo-light.svg"
                alt="MMA — Madagascar Maritime Agency"
                width={180}
                height={48}
                priority
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="text-white/90 hover:text-gold font-body font-medium text-sm transition-colors duration-200 flex items-center gap-1 focus:outline-none focus-visible:text-gold"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  {t('services')}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-3 w-72 bg-navy border border-gold/20 shadow-2xl shadow-navy rounded-sm overflow-hidden"
                      role="menu"
                    >
                      {services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group focus:outline-none focus-visible:bg-white/5"
                          role="menuitem"
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className="block text-white font-medium text-sm group-hover:text-gold transition-colors">
                            {s.label}
                          </span>
                          <span className="block text-white/50 text-xs mt-0.5">{s.desc}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-gold font-body font-medium text-sm transition-colors duration-200 focus:outline-none focus-visible:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Language switcher */}
              <div className="flex items-center gap-1 text-xs font-medium font-body" aria-label="Changer de langue">
                <Link
                  href={pathname}
                  locale={locale}
                  className={`px-2 py-1 transition-colors rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                    locale === 'fr'
                      ? 'text-gold'
                      : 'text-white/50 hover:text-white'
                  }`}
                  aria-current={locale === 'fr' ? 'true' : undefined}
                >
                  FR
                </Link>
                <span className="text-white/20" aria-hidden="true">|</span>
                <Link
                  href={switchPath}
                  className={`px-2 py-1 transition-colors rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                    locale === 'en'
                      ? 'text-gold'
                      : 'text-white/50 hover:text-white'
                  }`}
                  aria-current={locale === 'en' ? 'true' : undefined}
                >
                  EN
                </Link>
              </div>

              <Link
                href={`/${locale}/contact`}
                className="btn-primary text-sm py-2.5 px-6"
              >
                {t('requestCall')}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — rendered outside the header to cover full screen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-navy lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <div className="flex flex-col min-h-full">
              {/* Mobile header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Link href={`/${locale}`} onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/brand/logo-light.svg"
                    alt="MMA"
                    width={150}
                    height={40}
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                  aria-label="Fermer le menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile nav links */}
              <nav className="flex-1 p-6 space-y-6" aria-label="Navigation mobile">
                <div>
                  <p className="text-gold/60 text-xs uppercase tracking-widest font-medium mb-3 font-sans">
                    {t('services')}
                  </p>
                  <div className="space-y-1">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-white/90 hover:text-gold transition-colors border-b border-white/5 font-body text-base"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-white/90 hover:text-gold transition-colors border-b border-white/5 font-body font-medium text-base"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Mobile footer */}
              <div className="p-6 space-y-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Link
                    href={pathname}
                    locale={locale}
                    onClick={() => setMobileOpen(false)}
                    className={`px-5 py-2.5 text-sm font-medium font-sans rounded-sm ${
                      locale === 'fr'
                        ? 'bg-gold text-navy'
                        : 'text-white border border-white/20 hover:border-white/40'
                    }`}
                  >
                    Français
                  </Link>
                  <Link
                    href={switchPath}
                    onClick={() => setMobileOpen(false)}
                    className={`px-5 py-2.5 text-sm font-medium font-sans rounded-sm ${
                      locale === 'en'
                        ? 'bg-gold text-navy'
                        : 'text-white border border-white/20 hover:border-white/40'
                    }`}
                  >
                    English
                  </Link>
                </div>
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  {t('requestCall')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
