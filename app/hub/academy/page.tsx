import type { Metadata } from 'next';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';

export const metadata: Metadata = { title: 'academy', description: 'hub academy: hosts leren van hosts.' };

export default function Academy() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop niveau={1} boven="hub academy" titel={<>hosts leren <i>van hosts.</i></>} tekst="Kleine sessies, op locatie. Over cijfers, en over hoe licht, geur en rust tot betere reviews leiden." />
        </div>
      </section>
      <Sectie>
        <div className="rij">
          <div className="breed kaart kaart-donker">
            <span className="kaart-label">volgende sessie · [DATUM] · [LOCATIE]</span>
            <h2 className="kaart-titel" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>wat een gast <i>ruikt</i> voor hij binnenkomt.</h2>
            <p>Over geur, licht en de eerste tien seconden. En wat dat doet met je reviews.</p>
            <p>Voor leden met het label. Externe hosts zijn welkom: vraag naar de voorwaarden.</p>
          </div>
          <div className="smal">
            <ContactForm
              merk="hub"
              soort="academy"
              knop="schrijf je in"
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'label', label: 'heb je het moroww-label', type: 'select', opties: ['ja', 'nee'] },
              ]}
            />
          </div>
        </div>
      </Sectie>
    </>
  );
}
