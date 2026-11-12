import type { Metadata } from 'next';
import { ContactForm } from '@/components/merk/ContactForm';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { title: 'vertel je vraag', description: 'Vertel waar je tegenaan loopt. We stellen voor wat nodig is.' };

export default function HowContact() {
  return (
    <div className="wrap">
      <section className="z-held" style={{ alignItems: 'flex-start' }} data-mw-reveal>
        <div className="z-smal" style={{ gap: 28 }}>
          <span className="z-nr">01 · je vraag</span>
          <h1 className="z-h2" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.4rem)' }}>vertel waar je tegenaan loopt.</h1>
          <p className="z-tekst" style={{ fontSize: 18 }}>In een paar zinnen, of met de documenten die er al zijn. Een kort gesprek binnen twee werkdagen.</p>
          <p className="z-tekst" style={{ fontWeight: 400, lineHeight: 1.7 }}>
            {site.contact.naam}
            <br />
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <br />
            <a href={`tel:${site.contact.telefoon.replace(/\s/g, '')}`}>{site.contact.telefoon}</a>
          </p>
        </div>
        <div className="z-breed">
          <ContactForm
            merk="how"
            soort="vraag"
            velden={[
              { naam: 'naam', label: 'naam', verplicht: true },
              { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
              { naam: 'telefoon', label: 'telefoon', type: 'tel' },
              { naam: 'adres', label: 'adres van het huis (als het om een huis gaat)' },
              { naam: 'onderwerp', label: 'waar gaat het over', type: 'select', opties: ['vergunning en regels', 'opstart van het huis', 'een eigen boekingswebsite', 'cijfers en prijzen', 'het volledige beheer', 'iets anders'] },
              { naam: 'bericht', label: 'je vraag', type: 'textarea', verplicht: true },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
