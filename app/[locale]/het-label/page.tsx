import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/merk/ContactForm'
import { site } from '@/lib/merk/site'

export const metadata: Metadata = {
  title: 'het label voor jouw huis',
  description:
    'Het moroww-label is een kwaliteitsstempel voor vakantiewoningen, B&B\'s en hotels. We komen persoonlijk langs, en wie de standaard haalt, krijgt het label, een plaats op moroww.com en toegang tot moroww hub.',
  alternates: { canonical: 'https://www.moroww.com/het-label' },
}

const krijgt: [string, string][] = [
  ['persoonlijk bezoek en rapport', 'We komen langs, lopen door het huis zoals een gast en zeggen wat in orde is en wat beter kan.'],
  ['slimme toestellen', 'Advies over een slot met code, geur, licht en sensoren, zodat de aankomst vanzelf loopt. De toestellen worden van jou.'],
  ['het label', 'Aan de deur, op je listings en in de gids voor je gasten.'],
  ['in de collectie', 'Je huis staat op moroww.com, met een rechtstreekse link naar je eigen boekingswebsite.'],
  ['moroww hub', 'Partners, merken en tools met voordelen voor leden, en de academy voor hosts.'],
  ['elk jaar opnieuw', 'We komen elk jaar terug en lezen wat gasten schrijven. Zo blijft het label waard wat het belooft.'],
]

export default async function HetLabelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="bg-moroww-paper">
      {/* KOP */}
      <section className="w-full px-6 md:px-12 pt-mw-10 pb-mw-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-audit text-moroww-label-tekst">voor eigenaars en beheerders</p>
          <h1 className="mt-mw-4 text-h2 md:text-[clamp(2.5rem,5vw,4.5rem)] md:leading-[1] text-moroww-dark max-w-[18ch]">
            jouw huis met het label.
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-mw-eigenaar">
            Het label is een kwaliteitsstempel. Het zegt aan gasten: dit huis is persoonlijk bezocht en het klopt. Wij komen
            langs, en haalt je huis de standaard, dan krijgt het het label, een plaats op moroww.com en toegang tot moroww
            hub. Jij blijft zelf verhuren, of je beheerder doet het.
          </p>
          <div className="mt-mw-6 flex flex-wrap gap-3">
            <a href="#aanvraag" className="inline-flex items-center min-h-[48px] bg-moroww-orange text-moroww-dark px-6 text-body font-semibold">
              vraag een bezoek aan
            </a>
            <Link href="/advisory" className="inline-flex items-center min-h-[48px] border border-moroww-dark text-moroww-dark px-6 text-body">
              eerst weten wat mag? naar moroww advisory
            </Link>
          </div>
        </div>
      </section>

      {/* WAT JE KRIJGT */}
      <section className="w-full px-6 md:px-12 py-mw-8 border-t border-moroww-rule">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 text-moroww-dark">wat je krijgt.</h2>
          <ol className="mt-mw-6 grid grid-cols-1 md:grid-cols-3 gap-x-mw-6 gap-y-mw-6">
            {krijgt.map(([titel, tekst], i) => (
              <li key={titel} className="border-t-2 border-moroww-dark pt-mw-4">
                <p className="text-audit text-moroww-label-tekst">0{i + 1}</p>
                <h3 className="mt-mw-2 text-h3 text-moroww-dark">{titel}</h3>
                <p className="mt-mw-2 text-body text-moroww-ink-2">{tekst}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FORMULE */}
      <section className="w-full px-6 md:px-12 py-mw-8 bg-moroww-blush">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-mw-5">
          <div className="lg:col-span-2 bg-moroww-paper p-mw-6">
            <h2 className="text-h3 text-moroww-dark">moroww label</h2>
            <p className="mt-mw-3 text-body text-moroww-dark">
              Een persoonlijk bezoek, het label, een plaats in de collectie op moroww.com en toegang tot moroww hub.
            </p>
            <p className="mt-mw-5 text-body text-moroww-ink-2">
              Wat het kost, hangt af van je huis. Dat bespreken we in een eerste gesprek.
            </p>
            <a href="#aanvraag" className="mt-mw-4 inline-block text-body text-moroww-dark underline underline-offset-4 decoration-moroww-label">
              vertel ons over je huis →
            </a>
          </div>
          <div className="bg-moroww-paper p-mw-6 flex flex-col gap-mw-3">
            <h2 className="text-h3 text-moroww-dark">nog geen eigen boekingssite?</h2>
            <p className="text-body text-moroww-ink-2">moroww advisory bouwt er een voor je huis, in jouw naam.</p>
            <Link href="/advisory/website" className="text-body text-moroww-dark underline underline-offset-4 decoration-moroww-label">
              over je eigen boekingssite
            </Link>
            <p className="mt-auto pt-mw-4 border-t border-moroww-rule text-body text-moroww-ink-2">
              Liever niet zelf beheren? Vraag naar de mogelijkheden.
            </p>
          </div>
        </div>
      </section>

      {/* AANVRAAG */}
      <section id="aanvraag" className="w-full px-6 md:px-12 py-mw-8 mb-mw-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-mw-8">
          <div>
            <h2 className="text-h2 text-moroww-dark">vertel ons over je huis.</h2>
            <p className="mt-mw-4 text-body text-moroww-ink-2">
              {site.contact.naam}
              <br />
              {site.contact.email} · {site.contact.telefoon}
            </p>
          </div>
          <ContactForm
            tw
            merk="moroww"
            soort="keuring"
            knop="vraag een bezoek aan"
            velden={[
              { naam: 'naam', label: 'naam', verplicht: true },
              { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
              { naam: 'telefoon', label: 'telefoon', type: 'tel' },
              { naam: 'adres', label: 'waar staat je huis', verplicht: true },
              { naam: 'wie_verhuurt', label: 'wie verhuurt vandaag', type: 'select', opties: ['ik zelf', 'een beheerder', 'nog niemand'] },
              { naam: 'boekingssite', label: 'link naar je eigen boekingswebsite, als je die hebt', type: 'text' },
              { naam: 'bericht', label: 'iets dat we moeten weten', type: 'textarea' },
            ]}
          />
        </div>
      </section>
    </div>
  )
}
