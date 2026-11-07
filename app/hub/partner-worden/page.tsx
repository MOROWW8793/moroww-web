import type { Metadata } from 'next';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';

export const metadata: Metadata = { title: 'partner worden', description: 'Een merk, een tool of een vakman die past bij moroww? Word partner van moroww hub.' };

export default function PartnerWorden() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop niveau={1} boven="partner worden" titel={<>weinig partners, <i>bewust gekozen.</i></>} tekst="Een merk, een tool of een vakman die past bij wat gasten in een moroww-huis voelen? Vertel ons wat je doet en welk voordeel je leden geeft." />
        </div>
      </section>
      <Sectie>
        <div className="rij">
          <div className="smal">
            <ol className="stappen" style={{ gridTemplateColumns: '1fr' }}>
              <li><strong>kennismaking</strong><span>We bekijken of je aanbod past bij het label.</span></li>
              <li><strong>voordeel voor leden</strong><span>Een korting of extra voor eigenaars met het label.</span></li>
              <li><strong>in de hub</strong><span>Een partnerprofiel, en de badge voor je eigen site.</span></li>
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
                { naam: 'categorie', label: 'categorie', type: 'select', opties: ['tools en software', 'geur, linnen, essentials', 'vakmensen', 'andere'] },
                { naam: 'bericht', label: 'wat doe je, en welk voordeel geef je leden', type: 'textarea', verplicht: true },
              ]}
            />
          </div>
        </div>
      </Sectie>
    </>
  );
}
