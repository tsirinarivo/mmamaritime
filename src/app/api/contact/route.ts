import { NextRequest, NextResponse } from 'next/server'

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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Email integration — uncomment and add RESEND_API_KEY to .env.local
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@mmamaritime.com',
    //   to: 'contact@mmamaritime.com',
    //   replyTo: email,
    //   subject: `Demande de contact — ${name} (${company || 'N/A'})`,
    //   html: `
    //     <h2>Nouvelle demande de contact MMA</h2>
    //     <p><strong>Nom:</strong> ${name}</p>
    //     <p><strong>Société:</strong> ${company || 'N/A'}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Navire:</strong> ${vessel || 'N/A'}</p>
    //     <p><strong>Port:</strong> ${port || 'N/A'}</p>
    //     <p><strong>Service:</strong> ${serviceType || 'N/A'}</p>
    //     <hr />
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br />')}</p>
    //   `,
    // })

    console.log('Contact form submission:', {
      name,
      company,
      email,
      vessel,
      port,
      serviceType,
      message: message.slice(0, 100) + (message.length > 100 ? '…' : ''),
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
