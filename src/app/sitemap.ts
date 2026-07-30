import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mmamaritime.com'
  const locales = ['fr', 'en']
  const routes = [
    '',
    '/services/consignation',
    '/services/manning',
    '/services/logistique',
    '/ports',
    '/a-propos',
    '/contact',
  ]

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )
}
