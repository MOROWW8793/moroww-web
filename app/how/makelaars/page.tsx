import type { Metadata } from 'next';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { title: 'voor makelaars', description: 'how partner: een vaste partner voor elk pand dat je verkoopt aan een verhuurder.' };

export default function Makelaars() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop niveau={1} boven={`how partner · ${site.prijzen.partner} per maand`} titel="je koper vraagt of het mag. jij hebt het antwoord." tekst="Met how partner krijgt elk pand dat je verkoopt aan een verhuurder dezelfde aanpak: een rapport per adres en, op vraag, een traject tot verhuurklaar." />
        </div>
      </section>
      <Sectie>
        <ol className="stappen">
          <li><strong>één aanspreekpunt</strong><span>Een vaste lijn voor het kantoor, voor elk dossier.</span></li>
          <li><strong>vaste aanpak</strong><span>Elk adres dezelfde vijf punten, hetzelfde rapport.</span></li>
          <li><strong>voorrang</strong><span>Dossiers van partners plannen we eerst in.</span></li>
          <li><strong>bij de verkoop</strong><span>Je toont een verhuurklaar dossier aan je koper.</span></li>
        </ol>
      </Sectie>
      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal"><Kop boven="kennismaking" titel="een gesprek van een half uur." tekst={`${site.contact.naam} · ${site.contact.telefoon}`} /></div>
          <div className="breed">
            <ContactForm
              merk="how"
              soort="partner"
              knop="vraag een kennismaking"
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'kantoor', label: 'kantoor', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'telefoon', label: 'telefoon', type: 'tel' },
                { naam: 'bericht', label: 'hoeveel verhuurpanden verkoop je per jaar, ongeveer', type: 'textarea' },
              ]}
            />
          </div>
        </div>
      </Sectie>
    </>
  );
}
