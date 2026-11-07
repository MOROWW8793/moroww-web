import type { Metadata } from 'next';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { title: 'vertel je vraag', description: 'Vertel waar je tegenaan loopt. We stellen voor wat nodig is.' };

export default function HowContact() {
  return (
    <Sectie>
      <div className="rij">
        <div className="smal">
          <Kop niveau={1} boven="contact" titel="vertel waar je tegenaan loopt." tekst={<>{site.contact.naam}<br /><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> · {site.contact.telefoon}</>} />
        </div>
        <div className="breed">
          <ContactForm
            merk="how"
            soort="vraag"
            velden={[
              { naam: 'naam', label: 'naam', verplicht: true },
              { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
              { naam: 'telefoon', label: 'telefoon', type: 'tel' },
              { naam: 'adres', label: 'adres van het huis (als het om een huis gaat)' },
              { naam: 'onderwerp', label: 'waar gaat het over', type: 'select', opties: ['vergunning en regels', 'opstart van het huis', 'een eigen boekingswebsite', 'cijfers en prijzen', 'iets anders'] },
              { naam: 'bericht', label: 'je vraag', type: 'textarea', verplicht: true },
            ]}
          />
        </div>
      </div>
    </Sectie>
  );
}
