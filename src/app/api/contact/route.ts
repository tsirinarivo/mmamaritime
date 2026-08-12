import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const rateMap = new Map<string, number[]>()
const RATE_LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (timestamps.length >= RATE_LIMIT) return true
  rateMap.set(ip, [...timestamps, now])
  return false
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true pour port 465, false pour 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await request.json()
    const { name, company, email, vessel, port, serviceType, message } = body as {
      name: string
      company: string
      email: string
      vessel: string
      port: string
      serviceType: string
      message: string
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const eName = escapeHtml(name)
    const eCompany = escapeHtml(company || '')
    const eEmail = escapeHtml(email)
    const eVessel = escapeHtml(vessel || '')
    const ePort = escapeHtml(port || '')
    const eServiceType = escapeHtml(serviceType || '')
    const eMessage = escapeHtml(message)

    await transporter.sendMail({
      from: `"MMA Site Web" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO || 'contact@mmamaritime.com',
      replyTo: email,
      subject: `[MMA] Demande de contact — ${name}${company ? ` (${company})` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; color: #0A2A43; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-top: 4px solid #C9A24B; padding-top: 20px; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #0A2A43;">Nouvelle demande de contact</h2>
            <p style="color: #666; margin: 4px 0 0;">Madagascar Maritime Agency — Formulaire web</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Nom</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">${eName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Société</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${eCompany || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${eEmail}" style="color: #1CA5A5;">${eEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Navire</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${eVessel || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Port</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${ePort || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${eServiceType || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; background: #f8f5ef; border-left: 3px solid #C9A24B; padding: 16px 20px; border-radius: 0 4px 4px 0;">
            <p style="margin: 0 0 8px; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${eMessage}</p>
          </div>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #aaa;">
            Envoyé depuis le formulaire de contact de <strong>mmamaritime.com</strong>
          </div>
        </body>
        </html>
      `,
      text: `
Nouvelle demande de contact — Madagascar Maritime Agency

Nom      : ${name}
Société  : ${company || '—'}
Email    : ${email}
Navire   : ${vessel || '—'}
Port     : ${port || '—'}
Service  : ${serviceType || '—'}

Message :
${message}
      `.trim(),
    })

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
