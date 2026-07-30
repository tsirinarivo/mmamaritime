import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Fraunces } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '@/app/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
})

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL('https://mmamaritime.com'),
    title: {
      template: '%s | MMA — Madagascar Maritime Agency',
      default: 'Madagascar Maritime Agency | Ship Agency & Manning — Toamasina',
    },
    description: t('description'),
    alternates: {
      canonical: `https://mmamaritime.com/${locale}`,
      languages: {
        fr: 'https://mmamaritime.com/fr',
        en: 'https://mmamaritime.com/en',
        'x-default': 'https://mmamaritime.com/fr',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      siteName: 'Madagascar Maritime Agency',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'MMA — Madagascar Maritime Agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og-image.png'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'fr' | 'en')) notFound()

  const messages = await getMessages()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'Madagascar Maritime Agency',
    alternateName: 'MMA',
    url: 'https://mmamaritime.com',
    logo: 'https://mmamaritime.com/brand/logo.svg',
    email: 'contact@mmamaritime.com',
    telephone: '+261371777777',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zone Portuaire',
      addressLocality: 'Toamasina',
      addressRegion: 'Atsinanana',
      postalCode: '501',
      addressCountry: 'MG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -18.1496,
      longitude: 49.4023,
    },
    areaServed: [
      { '@type': 'Place', name: 'Madagascar' },
      { '@type': 'Place', name: 'Toamasina' },
      { '@type': 'Place', name: 'Ehoala' },
      { '@type': 'Place', name: 'Mahajanga' },
      { '@type': 'Place', name: 'Antsiranana' },
      { '@type': 'Place', name: 'Nosy Be' },
      { '@type': 'Place', name: 'Toliara' },
    ],
    serviceType: ['Ship Agency', 'Manning Agency', 'Port Logistics'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Maritime Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ship Agency / Consignation',
            url: 'https://mmamaritime.com/fr/services/consignation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Manning / Crewing',
            url: 'https://mmamaritime.com/fr/services/manning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Transport & Logistique Portuaire',
            url: 'https://mmamaritime.com/fr/services/logistique',
          },
        },
      ],
    },
    availableLanguage: ['French', 'English'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [],
  }

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
