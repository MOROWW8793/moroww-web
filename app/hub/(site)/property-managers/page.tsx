import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ContactForm } from '@/components/merk/ContactForm';
import { ZHeld, ZSectie, ZSectieTwee, ZRaster, ZTijdlijn } from '@/components/merk/Zwitsers';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = {
  title: 'voor beheerders',
  description:
    'moroww hub voor beheerders van vakantiewoningen: de partners van moroww voor je hele portefeuille, het moroww-label voor je beste huizen en de academy voor je team.',
};

const aanbod = [
  {
    titel: 'vraag het moroww',
    tekst: 'Een extra schoonmaak, de ramen of een herstelling in een van je huizen? Vraag het in de hub. moroww plant de partner in, volgt op en toont het resultaat met een foto.',
    href: '/hub/partners',
    voet: 'bekijk de partners',
  },
  {
    titel: 'het label',
    tekst: 'Elk huis wordt persoonlijk bezocht. Wie geselecteerd wordt, draagt het moroww-label en staat in de collectie op moroww.com, met een link naar jouw boekingssite. Jij blijft de beheerder.',
    href: '/het-label',
    voet: 'over het label',
  },
  {
    titel: 'de academy',
    tekst: 'Kleine sessies in een moroww-huis, voor wie de wissels doet en wie de gasten ontvangt. Over de eerste tien seconden, cijfers en reviews.',
    href: '/hub/academy',
    voet: 'naar de academy',
  },
  {
    titel: 'moroww advisory',
    tekst: 'Een concrete vraag, zoals een vergunning voor een nieuw adres of een eigen boekingssite? Dan krijg je een plan: wat, wie, wanneer en wat het kost.',
    href: '/advisory',
    voet: 'naar advisory',
  },
];

const afspraken = [
  { titel: 'één aanspreekpunt', tekst: 'Een vaste lijn voor jouw kantoor, voor elk huis in je portefeuille.' },
  { titel: 'het label per huis', tekst: 'Elk huis wordt apart bezocht. Het label hoort bij het huis, niet bij de portefeuille.' },
  { titel: 'jij blijft de beheerder', tekst: 'De boeking via de collectie komt bij jou. Je eigenaars blijven jouw eigenaars.' },
  { titel: 'één lijn naar de partners', tekst: 'Je hoeft niet per huis opnieuw te zoeken wie wat doet.' },
];

export default function PropertyManagers() {
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · voor beheerders"
        titel={<>jij beheert de huizen.<br />wij brengen de rest samen.</>}
        fotos={[
          { src: '/images/over-hero.jpg', alt: 'Een gast komt binnen in de living van een moroww-huis' },
          { src: '/images/collectie-4.jpg', alt: 'Interieur van een moroww-huis' },
          { src: '/images/woningen/nieuwpoort/the-eight-01.jpg', alt: 'Woonkamer met zicht op de Noordzee' },
        ]}
        lead="In de hub vraag je wat je huizen nodig hebben, en moroww regelt het met de partners die we zelf gebruiken. Plus het label voor je beste huizen, en de academy voor je team. Eén aanspreekpunt, voor je hele portefeuille."
        acties={
          <>
            <a href="#kennismaking" className="z-knop">vraag een kennismaking</a>
            <Link href="/hub/partners" className="z-link">bekijk de partners</Link>
          </>
        }
      />

      <ZSectie nr="02 · wat je krijgt" titel="vier dingen, één aanspreekpunt.">
        <ZRaster items={aanbod} prefix="2" />
      </ZSectie>

      <section className="z-sectie" data-mw-reveal style={{ borderBottom: 0, paddingBottom: 0 }}>
        <div className="z-foto" style={{ aspectRatio: '21 / 9' }}>
          <Image src="/images/over-hero.jpg" alt="Een gast komt binnen in de living van een moroww-huis" fill sizes="(min-width: 1280px) 1200px, 100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <ZSectie nr="03 · de afspraken" titel="helder, per huis.">
        <ZTijdlijn items={afspraken} prefix="3" />
      </ZSectie>

      <ZSectieTwee
        id="kennismaking"
        nr="04 · kennismaking"
        titel="een gesprek van een half uur."
        tekst={`We bekijken je portefeuille en wat de hub voor jou en je team kan doen. ${site.contact.naam} · ${site.contact.telefoon}`}
      >
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
            { naam: 'aantal_huizen', label: 'aantal huizen in beheer', type: 'select', opties: ['1 tot 5', '6 tot 15', '16 tot 40', 'meer dan 40'] },
            { naam: 'bericht', label: 'waar wil je mee starten?', type: 'textarea' },
          ]}
        />
      </ZSectieTwee>
    </div>
  );
}
