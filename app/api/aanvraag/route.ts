import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const ONTVANGER = process.env.AANVRAAG_MAIL_NAAR || 'info@moroww.com'
const MERKEN = ['moroww', 'how', 'hub'] as const
type Merk = (typeof MERKEN)[number]

const merkNaam: Record<Merk, string> = { moroww: 'moroww', how: 'moroww advisory', hub: 'moroww hub' }

function tekst(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Honeypot: echte bezoekers zien dit veld niet.
  if (tekst(body.website_url, 200)) return NextResponse.json({ ok: true })

  const merk = tekst(body.merk, 20) as Merk
  const soort = tekst(body.soort, 50)
  const naam = tekst(body.naam, 200)
  const email = tekst(body.email, 320)
  const telefoon = tekst(body.telefoon, 50)
  const adres = tekst(body.adres, 300)
  const bericht = tekst(body.bericht, 5000)
  const extraIn = body.extra && typeof body.extra === 'object' ? (body.extra as Record<string, unknown>) : {}
  const extra: Record<string, string> = {}
  for (const [k, v] of Object.entries(extraIn).slice(0, 30)) extra[k.slice(0, 50)] = tekst(v, 1000)

  if (!MERKEN.includes(merk) || !soort || !naam || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { error: dbError } = await supabase
    .from('aanvragen')
    .insert({ merk, soort, naam, email, telefoon, adres, bericht, extra })

  // Mail ook als de database faalt: dan gaat er geen aanvraag verloren.
  const rijen: [string, string][] = [
    ['merk', merkNaam[merk]],
    ['soort', soort],
    ['naam', naam],
    ['e-mail', email],
    ['telefoon', telefoon],
    ['adres', adres],
    ...Object.entries(extra),
    ['bericht', bericht],
  ].filter(([, v]) => v) as [string, string][]

  let mailOk = false
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error } = await resend.emails.send({
        from: 'moroww <info@moroww.com>',
        to: ONTVANGER,
        replyTo: email,
        subject: `nieuwe aanvraag · ${merkNaam[merk]} · ${soort} · ${naam}`,
        text:
          rijen.map(([k, v]) => `${k}: ${v}`).join('\n') +
          (dbError ? `\n\n⚠ niet opgeslagen in Supabase: ${dbError.message}` : ''),
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1A1A1A">
            <p style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#666;margin:0 0 8px">nieuwe aanvraag · ${esc(merkNaam[merk])}</p>
            <h1 style="font-size:22px;margin:0 0 20px">${esc(naam)} · ${esc(soort)}</h1>
            <table style="border-collapse:collapse;width:100%;font-size:15px">
              ${rijen
                .map(
                  ([k, v]) =>
                    `<tr><td style="padding:8px 12px 8px 0;color:#666;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;white-space:pre-wrap">${esc(v)}</td></tr>`,
                )
                .join('')}
            </table>
            <p style="font-size:13px;color:#666;margin-top:24px">antwoord op deze mail en je antwoordt rechtstreeks aan ${esc(naam)}.</p>
            ${dbError ? `<p style="color:#b00;font-size:13px">⚠ niet opgeslagen in Supabase: ${esc(dbError.message)}</p>` : ''}
          </div>`,
      })
      mailOk = !error
      if (error) console.error('aanvraag mail fout', error)
    } catch (e) {
      console.error('aanvraag mail fout', e)
    }
  }

  if (dbError) console.error('aanvraag db fout', dbError)
  if (dbError && !mailOk) return NextResponse.json({ ok: false }, { status: 500 })
  return NextResponse.json({ ok: true })
}
