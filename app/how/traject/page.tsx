import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { title: 'how traject', description: `Volledige regie tot je pand verhuurklaar is. ${site.prijzen.traject} excl. btw.` };

export default function Traject() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop niveau={1} boven={`how traject · ${site.prijzen.traject} excl. btw`} titel="wij regelen het. tot het verhuurklaar is." tekst="Volledige regie: van de scan tot de laatste handtekening. Je weet vooraf wat het kost en wanneer het klaar is." />
          <div className="knoppen"><Link href="/how/contact" className="btn btn-primair">vraag een traject aan</Link></div>
        </div>
      </section>
      <Sectie>
        <div className="rij">
          <div className="smal"><Kop boven="inbegrepen" titel="alles, behalve de werken." tekst="De kostprijs van attesten en keuringen zelf en werken aan het pand zijn niet inbegrepen." /></div>
          <ul className="lijst breed">
            <li><span>how scan met plaatsbezoek en actieplan</span><span>01</span></li>
            <li><span>aanvraag en opvolging van de attesten</span><span>02</span></li>
            <li><span>registratie bij Toerisme Vlaanderen</span><span>03</span></li>
            <li><span>nazicht verzekering en gemeentelijk reglement</span><span>04</span></li>
            <li><span>oplevering met checklist</span><span>05</span></li>
          </ul>
        </div>
      </Sectie>
      <Sectie toon="zacht">
        <div className="raster-2">
          <div className="kaart"><h3 className="kaart-titel" style={{ fontSize: 19 }}>betaling</h3><p>50% bij opdracht, 50% bij oplevering.</p></div>
          <div className="kaart"><h3 className="kaart-titel" style={{ fontSize: 19 }}>los van beheer</h3><p>Het traject staat los van een later beheercontract. Je kiest daarna zelf hoe je verhuurt.</p></div>
        </div>
      </Sectie>
    </>
  );
}
