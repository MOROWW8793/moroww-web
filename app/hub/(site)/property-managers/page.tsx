import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = {
  title: 'voor beheerders',
  description:
    'moroww hub voor property managers van vakantiewoningen: de partners en tools van moroww voor je hele portefeuille, het moroww-label voor je beste huizen en de academy voor je team.',
};

const aanbod: { label: string; titel: React.ReactNode; tekst: string; href: string; voet: string }[] = [
  {
    label: 'voor je portefeuille',
    titel: <>vraag het <i>moroww</i></>,
    tekst:
      'Een extra schoonmaak, de ramen of een herstelling in een van je huizen? Vraag het in de hub. Moroww plant de partner in, volgt op en toont het resultaat met een foto. Dezelfde partners die in onze eigen huizen werken.',
    href: '/hub/partners',
    voet: 'bekijk de partners',
  },
  {
    label: 'voor je beste huizen',
    titel: <>het <i>label</i></>,
    tekst:
      'Elk huis wordt persoonlijk bezocht. Wie geselecteerd wordt, draagt het moroww-label en staat in de collectie op moroww.com, met een link naar jouw boekingssite. Jij blijft de beheerder.',
    href: '/het-label',
    voet: 'over het label',
  },
  {
    label: 'voor je team',
    titel: <>de <i>academy</i></>,
    tekst:
      'Kleine sessies in een moroww-huis, voor wie de wissels doet en wie de gasten ontvangt. Over de eerste tien seconden, cijfers en reviews.',
    href: '/hub/academy',
    voet: 'naar de academy',
  },
  {
    label: 'per vraag',
    titel: <>moroww <i>advisory</i></>,
    tekst:
      'Een concrete vraag, zoals een vergunning voor een nieuw adres of een eigen boekingssite? Dan krijg je een plan: wat, wie, wanneer en wat het kost.',
    href: '/advisory',
    voet: 'naar advisory',
  },
];

export default function PropertyManagers() {
  return (
    <>
      <section className="held" data-mw-reveal>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span className="boven">moroww hub · voor beheerders (property managers)</span>
          <h1 className="titel-1">jij beheert de huizen. <i>wij brengen de rest samen.</i></h1>
          <p className="inleiding">
            Je beheert vakantiewoningen voor eigenaars. In de hub vraag je wat je huizen nodig hebben, en moroww regelt het
            met de partners die we zelf gebruiken. Plus het label voor je beste huizen, en de academy voor je team. Eén aanspreekpunt, voor je hele portefeuille.
          </p>
          <div className="knoppen">
            <a href="#kennismaking" className="btn btn-primair">vraag een kennismaking</a>
            <Link href="/hub/partners" className="btn btn-lijn">bekijk de partners</Link>
          </div>
        </div>
      </section>

      <Sectie>
        <Kop boven="wat je krijgt" titel={<>vier dingen, <i>één aanspreekpunt.</i></>} />
        <div className="raster" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {aanbod.map((a) => (
            <Link key={a.href} href={a.href} className="kaart">
              <span className="kaart-label">{a.label}</span>
              <h2 className="kaart-titel">{a.titel}</h2>
              <p>{a.tekst}</p>
              <span className="kaart-voet" style={{ fontSize: 16 }}>{a.voet}</span>
            </Link>
          ))}
        </div>
      </Sectie>

      <section className="wrap" style={{ paddingBottom: 8 }} data-mw-reveal>
        <div style={{ position: 'relative', aspectRatio: '21 / 9', overflow: 'hidden' }}>
          <Image src="/images/over-hero.jpg" alt="Een gast komt binnen in de living van een moroww-huis" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <Sectie toon="zacht">
        <Kop boven="de afspraken" titel={<>helder, <i>per huis.</i></>} />
        <ol className="stappen">
          <li><strong>één aanspreekpunt</strong><span>Een vaste lijn voor jouw kantoor, voor elk huis in je portefeuille.</span></li>
          <li><strong>het label per huis</strong><span>Elk huis wordt apart bezocht. Het label hoort bij het huis, niet bij de portefeuille.</span></li>
          <li><strong>jij blijft de beheerder</strong><span>De boeking via de collectie komt bij jou. Je eigenaars blijven jouw eigenaars.</span></li>
          <li><strong>één lijn naar de partners</strong><span>Je hoeft niet per huis opnieuw te zoeken wie wat doet.</span></li>
        </ol>
      </Sectie>

      <Sectie id="kennismaking">
        <div className="rij">
          <div className="smal">
            <Kop
              boven="kennismaking"
              titel={<>een gesprek van <i>een half uur.</i></>}
              tekst={`We bekijken je portefeuille en wat de hub voor jou en je team kan doen. ${site.contact.naam} · ${site.contact.telefoon}`}
            />
          </div>
          <div className="breed">
            <ContactForm
              merk="hub"
              soort="property-manager"
              knop="vraag een kennismaking"
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'bedrijf', label: 'bedrijf', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'telefoon', label: 'telefoon', type: 'tel' },
                { naam: 'regio', label: 'regio', verplicht: true },
                {
                  naam: 'aantal_huizen',
                  label: 'aantal huizen in beheer',
                  type: 'select',
                  opties: ['1 tot 5', '6 tot 15', '16 tot 40', 'meer dan 40'],
                },
                { naam: 'bericht', label: 'waar wil je mee starten?', type: 'textarea' },
              ]}
            />
          </div>
        </div>
      </Sectie>
    </>
  );
}
