import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';

export const metadata: Metadata = { title: 'partners', description: 'Merken, vakmensen en tools voor eigenaars en beheerders met het moroww-label.' };

// Partners worden later uit Supabase geladen. Tot dan: de categorieën.
const categorieen = [
  { label: 'tools en software', titel: 'kalender, prijzen, gastberichten', tekst: 'bv. LodgePilot · [VOORDEEL VOOR LEDEN]' },
  { label: 'geur, linnen, essentials', titel: 'wat de gast ruikt en voelt', tekst: '[PARTNER] · [VOORDEEL VOOR LEDEN]' },
  { label: 'vakmensen', titel: 'schoonmaak, herstellingen, foto', tekst: '[PARTNER] · per regio' },
  { label: 'regels en advies', titel: 'wat mag, per adres', tekst: 'moroww how · scan en traject', href: '/how' },
];

export default function Partners() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop niveau={1} boven="hub partners" titel={<>zelf beheren, <i>niet alleen.</i></>} tekst="Wie het label draagt en zelf verhuurt, vindt hier de partners die moroww zelf kiest. Elke partner geeft leden een voordeel." />
        </div>
      </section>
      <Sectie toon="zacht">
        <div className="raster">
          {categorieen.map((c) => {
            const inhoud = (
              <>
                <span className="kaart-label">{c.label}</span>
                <h2 className="kaart-titel" style={{ fontSize: 24 }}>{c.titel}</h2>
                <p>{c.tekst}</p>
              </>
            );
            return c.href ? (
              <Link key={c.label} href={c.href} className="kaart">{inhoud}</Link>
            ) : (
              <div key={c.label} className="kaart">{inhoud}</div>
            );
          })}
        </div>
      </Sectie>
      <Sectie>
        <div className="band">
          <p className="band-tekst">we kiezen weinig partners, en bewust.</p>
          <Link href="/hub/partner-worden" className="btn btn-primair">partner worden</Link>
        </div>
      </Sectie>
    </>
  );
}
