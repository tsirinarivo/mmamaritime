'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

interface FormState {
  name: string
  company: string
  email: string
  vessel: string
  port: string
  serviceType: string
  message: string
}

export default function ContactSection() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    vessel: '',
    port: '',
    serviceType: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const serviceTypes = t.raw('serviceTypes') as string[]
  const portOptions = t.raw('portOptions') as string[]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', company: '', email: '', vessel: '', port: '', serviceType: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white border border-cream-300 text-navy placeholder-navy/30 font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors'

  return (
    <section className="bg-cream-50 py-24" id="contact" aria-label={t('title')}>
      <div className="container-mma section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: contact info */}
          <div>
            <span className="section-tag mb-4">
              <span className="gold-line" aria-hidden="true" />
              Contact
            </span>
            <h2 className="font-sans font-bold text-navy text-3xl sm:text-4xl lg:text-5xl text-balance mb-4">
              {t('title')}
            </h2>
            <p className="text-navy/60 font-body text-lg leading-relaxed mb-10">
              {t('subtitle')}
            </p>

            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-4 p-5 bg-white border border-cream-300 rounded-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-navy rounded-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-semibold text-navy text-sm mb-0.5">Adresse</p>
                  <address className="not-italic text-navy/60 text-sm font-body">{t('address')}</address>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-5 bg-white border border-cream-300 rounded-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-navy rounded-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-semibold text-navy text-sm mb-0.5">Téléphone</p>
                  <a href="tel:+261371777777" className="text-navy/60 text-sm font-body hover:text-gold transition-colors">
                    {t('phone')}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-5 bg-white border border-cream-300 rounded-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-navy rounded-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-semibold text-navy text-sm mb-0.5">Email</p>
                  <a href="mailto:contact@mmamaritime.com" className="text-navy/60 text-sm font-body hover:text-gold transition-colors">
                    {t('email')}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-5 bg-navy border border-navy rounded-sm">
                <div className="flex-shrink-0">
                  <span className="relative flex h-3 w-3 mt-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-teal" />
                  </span>
                </div>
                <p className="text-white font-sans font-medium text-sm">{t('hours')}</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <h3 className="font-sans font-semibold text-navy text-xl mb-6">{t('formTitle')}</h3>
            <form onSubmit={handleSubmit} noValidate aria-label={t('formTitle')}>
              <div className="space-y-4">
                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-navy font-sans text-xs font-semibold uppercase tracking-wide mb-1.5">
                      {t('nameLabel')} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('namePlaceholder')}
                      className={inputClass}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-navy font-sans text-xs font-semibold uppercase tracking-wide mb-1.5">
                      {t('companyLabel')}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={t('companyPlaceholder')}
                      className={inputClass}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-navy font-sans text-xs font-semibold uppercase tracking-wide mb-1.5">
                    {t('emailLabel')} <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('emailPlaceholder')}
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>

                {/* Vessel + Port */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vessel" className="block text-navy font-sans text-xs font-semibold uppercase tracking-wide mb-1.5">
                      {t('vesselLabel')}
                    </label>
                    <input
                      id="vessel"
                      name="vessel"
                      type="text"
                      value={form.vessel}
                      onChange={handleChange}
                      placeholder={t('vesselPlaceholder')}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="port" className="block text-navy font-sans text-xs font-semibold uppercase tracking-wide mb-1.5">
                      {t('portLabel')}
                    </label>
                    <select
                      id="port"
                      name="port"
                      value={form.port}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" disabled>{t('portPlaceholder')}</option>
                      {portOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service type */}
                <div>
                  <label htmlFor="serviceType" className="block text-navy font-sans text-xs font-semibold uppercase tracking-wide mb-1.5">
                    {t('typeLabel')}
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>{t('typePlaceholder')}</option>
                    {serviceTypes.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-navy font-sans text-xs font-semibold uppercase tracking-wide mb-1.5">
                    {t('messageLabel')} <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder')}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-outline-navy w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t('submitting')}
                    </>
                  ) : (
                    <>
                      {t('submit')}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                  <div role="alert" className="flex items-start gap-3 p-4 bg-teal/10 border border-teal/30 rounded-sm">
                    <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-teal font-body text-sm">{t('success')}</p>
                  </div>
                )}
                {status === 'error' && (
                  <div role="alert" className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-sm">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-600 font-body text-sm">{t('error')}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
