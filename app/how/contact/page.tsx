import type { Metadata } from 'next';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { title: 'plan een scan', description: 'Geef het adres. Wij zoeken het uit.' };

export default function HowContact() {
  return (
    <Sectie>
      <div className="rij">
        <div className="smal">
          <Kop niveau={1} boven="contact" titel="geef het adres. wij zoeken het uit." tekst={<>{site.contact.naam}<br /><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> · {site.contact.telefoon}</>} />
        </div>
        <div className="breed">
          <ContactForm
            merk="how"
            soort="scan"
            velden={[
              { naam: 'naam', label: 'naam', verplicht: true },
              { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
              { naam: 'telefoon', label: 'telefoon', type: 'tel' },
              { naam: 'adres', label: 'adres van het pand', verplicht: true },
              { naam: 'dienst', label: 'waar denk je aan', type: 'select', opties: ['how scan', 'how traject', 'weet ik nog niet'] },
              { naam: 'bericht', label: 'wat wil je weten', type: 'textarea' },
            ]}
          />
        </div>
      </div>
    </Sectie>
  );
}
