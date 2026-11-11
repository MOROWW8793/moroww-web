import type { Metadata } from 'next';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { hoeWeKiezen, partnerCategorieen } from '@/lib/merk/hub';

export const metadata: Metadata = { title: 'partner worden', description: 'Een vakman, een merk of een tool die past bij moroww? Word partner van moroww hub.' };

export default function PartnerWorden() {
  return (
    <>
      <section className="held" data-mw-reveal>
        <div className="wrap">
          <Kop niveau={1} boven="partner worden" titel={<>weinig partners, <i>bewust gekozen.</i></>} tekst="Een vakman, een merk of een tool die past bij wat gasten in een moroww-huis voelen? Vertel ons wat je doet, in welke regio, en welk voordeel je leden geeft." />
        </div>
      </section>
      <Sectie toon="zacht">
        <Kop boven="hoe we kiezen" titel={<>vier vragen, <i>voor elke partner.</i></>} />
        <ol className="stappen">
          {hoeWeKiezen.map(([titel, tekst]) => (
            <li key={titel}><strong>{titel}</strong><span>{tekst}</span></li>
          ))}
        </ol>
      </Sectie>
      <Sectie>
        <Kop boven="zo gaat het" titel={<>van kennismaking <i>tot in de hub.</i></>} />
        <div className="rij" style={{ marginTop: 32 }}>
          <div className="smal">
            <ol className="stappen" style={{ gridTemplateColumns: '1fr' }}>
              <li><strong>kennismaking</strong><span>We bekijken of je aanbod past bij het label, en testen het in onze eigen huizen.</span></li>
              <li><strong>voordeel voor leden</strong><span>Een korting of extra voor eigenaars met het label.</span></li>
              <li><strong>in de hub</strong><span>Een partnerprofiel voor de leden, en de badge voor je eigen site.</span></li>
              <li><strong>opdrachten via moroww</strong><span>Vraagt een eigenaar iets in jouw regio, dan belt moroww je met het huis, het moment en wat er moet gebeuren. Jij doet het werk, wij houden de eigenaar op de hoogte.</span></li>
              <li><strong>merken in de huizen</strong><span>Een merk vragen leden aan voor hun huis. Moroww plaatst het.</span></li>
            </ol>
          </div>
          <div className="breed">
            <ContactForm
              merk="hub"
              soort="partner"
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'bedrijf', label: 'bedrijf', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'categorie', label: 'categorie', type: 'select', opties: [...partnerCategorieen.map((c) => c.label), 'andere'] },
                { naam: 'regio', label: 'regio' },
                { naam: 'bericht', label: 'wat doe je, en welk voordeel geef je leden', type: 'textarea', verplicht: true },
              ]}
            />
          </div>
        </div>
      </Sectie>
    </>
  );
}
