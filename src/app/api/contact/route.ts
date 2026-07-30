import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Société</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${company || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #1CA5A5;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Navire</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${vessel || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Port</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${port || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${serviceType || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; background: #f8f5ef; border-left: 3px solid #C9A24B; padding: 16px 20px; border-radius: 0 4px 4px 0;">
            <p style="margin: 0 0 8px; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
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
