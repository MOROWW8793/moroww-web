import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/merk/ContactForm'
import { ZHeld, ZSectie, ZSectieTwee, ZRaster } from '@/components/merk/Zwitsers'
import { site } from '@/lib/merk/site'
import '@/components/merk/merk.css'
import '@/components/merk/zwitsers.css'

export const metadata: Metadata = {
  title: 'Webinar: waar moroww naartoe gaat',
  description:
    'Gratis webinar op dinsdag 15 december 2026 om 19.30 u. voor eigenaars van vakantiewoningen, B&B\'s en kleine hotels. Waar moroww naartoe gaat, in 45 minuten.',
  alternates: { canonical: 'https://www.moroww.com/webinar' },
}

const praktisch: [string, string][] = [
  ['wanneer', 'dinsdag 15 december 2026'],
  ['uur', '19.30 u.'],
  ['duur', '45 minuten'],
  ['waar', 'online'],
  ['prijs', 'gratis'],
]

const inhoud = [
  { titel: 'waarom een label', tekst: 'Hotels hebben sterren. Vakantiewoningen hebben foto\'s. Waarom wij daar een standaard tegenover zetten.' },
  { titel: 'label, hub en advisory', tekst: 'Wat er vandaag staat: het label voor je huis, de hub voor wat het nodig heeft, advisory als je ergens op vastloopt.' },
  { titel: 'waar we naartoe gaan', tekst: 'Wat we in 2027 willen bereiken, en wat dat betekent voor wie verhuurt.' },
  { titel: 'jouw vragen', tekst: 'Na het verhaal is er tijd voor vragen. Stel ze live, of geef ze mee bij je aanmelding.' },
]

export default async function WebinarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="merk merk-moroww">
      <div className="z">
        <div className="wrap">
          <ZHeld
            nr="01 · gratis webinar"
            titel={<>waar moroww<br />naartoe gaat.</>}
            lead="Dinsdag 15 december om 19.30 u. In 45 minuten vertellen we waar moroww naartoe gaat, en wat dat betekent voor wie een vakantiewoning, een B&B of een klein hotel verhuurt."
            acties={
              <>
                <a href="#aanmelden" className="z-knop">meld je aan</a>
                <Link href="/voor-eigenaars" className="z-link">wat moroww vandaag doet</Link>
              </>
            }
            object={
              <figure className="z-object" style={{ margin: 0 }}>
                <div className="z-object-kop">
                  <span>webinar</span>
                  <span className="z-nr">praktisch</span>
                </div>
                {praktisch.map(([w, s]) => (
                  <span key={w} className="z-object-rij" style={{ justifyContent: 'space-between' }}>
                    <span className="z-nr">{w}</span>
                    <span style={{ fontWeight: 500, textAlign: 'right' }}>{s}</span>
                  </span>
                ))}
              </figure>
            }
          />

          <ZSectie id="inhoud" nr="02 · wat je hoort" titel="45 minuten, vier delen.">
            <ZRaster items={inhoud} prefix="2" />
          </ZSectie>

          <ZSectieTwee
            id="aanmelden"
            nr="03 · aanmelden"
            titel="meld je aan."
            tekst="Gratis. De link om mee te volgen krijg je per mail."
            extra={
              <p className="z-tekst" style={{ fontWeight: 400, lineHeight: 1.7 }}>
                {site.contact.naam}
                <br />
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                <br />
                <Link href="/privacy" className="z-link" style={{ fontSize: 15 }}>wat we met je gegevens doen</Link>
              </p>
            }
          >
            <ContactForm
              merk="moroww"
              soort="webinar"
              knop="meld je aan"
              bedankt="je bent aangemeld. de link voor 15 december krijg je per mail."
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'verhuurt', label: 'wat verhuur je', type: 'select', opties: ['een vakantiewoning', 'een B&B', 'een klein hotel', 'ik beheer huizen voor anderen', 'nog niets'] },
                { naam: 'bericht', label: 'een vraag die je beantwoord wil zien', type: 'textarea' },
              ]}
            />
          </ZSectieTwee>
        </div>
      </div>
    </div>
  )
}
