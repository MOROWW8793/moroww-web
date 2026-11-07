import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = {
  title: 'how partner voor property managers',
  description:
    'Voor property managers van vakantiewoningen: per adres weten wat mag, je beste huizen onder het moroww-label, een boekingssite in jouw naam en de hub voor je team.',
};

const aanbod: { label: string; titel: string; tekst: string; href: string }[] = [
  {
    label: 'per adres',
    titel: 'how scan en traject',
    tekst:
      'Elk huis dat je portefeuille binnenkomt, krijgt dezelfde vijf vragen en hetzelfde rapport: wat mag, wat ontbreekt, wat eerst. Op vraag regelen we het traject tot het verhuurklaar is.',
    href: '/how/scan',
  },
  {
    label: 'zichtbaarheid',
    titel: 'het label voor je huizen',
    tekst:
      'Huizen die de keuring halen, dragen het moroww-label en staan in de collectie op moroww.com, met een rechtstreekse link naar jouw boekingssite. Jij blijft de beheerder, de boeking komt bij jou.',
    href: '/het-label',
  },
  {
    label: 'rechtstreeks boeken',
    titel: 'how website',
    tekst:
      'Nog geen eigen boekingssite, of één die beter kan? We bouwen ze in jouw naam, voor één huis of je hele portefeuille.',
    href: '/how/website',
  },
  {
    label: 'voor je team',
    titel: 'moroww hub',
    tekst:
      'Toegang tot de partners van moroww: linnen, schoonmaak, vakmensen en tools. Plus de academy, voor jou en je team.',
    href: '/hub',
  },
];

export default function PropertyManagers() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop
            niveau={1}
            boven="how partner · voor property managers"
            titel="jij beheert de huizen. wij zorgen dat ze mogen, en gezien worden."
            tekst="Je beheert vakantiewoningen voor eigenaars. how partner geeft je portefeuille één vaste aanpak: per adres weten wat mag, je beste huizen onder het moroww-label, en de hub voor je team."
          />
          <div className="knoppen">
            <a href="#kennismaking" className="btn btn-primair">vraag een kennismaking</a>
          </div>
        </div>
      </section>

      <Sectie>
        <Kop boven="wat je krijgt" titel="vier dingen. één aanspreekpunt." />
        <div className="raster" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {aanbod.map((a) => (
            <Link key={a.titel} href={a.href} className="kaart">
              <span className="kaart-label">{a.label}</span>
              <h3 className="kaart-titel">{a.titel}</h3>
              <p>{a.tekst}</p>
              <span className="kaart-voet" style={{ fontSize: 16 }}>meer →</span>
            </Link>
          ))}
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <Kop boven="de afspraken" titel="vaste afspraken. per huis." />
        <ol className="stappen">
          <li><strong>één aanspreekpunt</strong><span>Een vaste lijn voor jouw kantoor, voor elk huis in je portefeuille.</span></li>
          <li><strong>vaste aanpak</strong><span>Elk adres dezelfde vijf vragen, hetzelfde rapport. Je eigenaars weten waar ze aan toe zijn.</span></li>
          <li><strong>voorrang</strong><span>Scans en trajecten van partners plannen we eerst in.</span></li>
        </ol>
      </Sectie>

      <Sectie id="kennismaking">
        <div className="rij">
          <div className="smal">
            <Kop
              boven="kennismaking"
              titel="een gesprek van een half uur."
              tekst={`We bekijken je portefeuille en wat how partner voor jou kan doen. ${site.contact.naam} · ${site.contact.telefoon}`}
            />
          </div>
          <div className="breed">
            <ContactForm
              merk="how"
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
