import { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import ContactSection from '@/components/sections/ContactSection'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function ContactPage() {
  const locale = await getLocale()
  const t = await getTranslations('contact')

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(28,165,165,0.08)_0%,transparent_60%)]" aria-hidden="true" />
        <div className="container-mma section-padding relative z-10 text-center">
          <span className="section-tag justify-center mb-4">
            <span className="gold-line" aria-hidden="true" />
            Contact
            <span className="gold-line" aria-hidden="true" />
          </span>
          <h1 className="font-sans font-bold text-white text-4xl sm:text-5xl lg:text-6xl text-balance mb-5">
            {t('title')}
          </h1>
          <p className="text-white/60 font-body text-lg max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
