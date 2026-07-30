import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Services from '@/components/sections/Services'
import WhyMma from '@/components/sections/WhyMma'
import PortsCovered from '@/components/sections/PortsCovered'
import Process from '@/components/sections/Process'
import CtaSection from '@/components/sections/CtaSection'
import ContactSection from '@/components/sections/ContactSection'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  }
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <WhyMma />
      <PortsCovered />
      <Process />
      <CtaSection />
      <ContactSection />
    </>
  )
}
