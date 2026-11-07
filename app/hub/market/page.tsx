import type { Metadata } from 'next';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';

export const metadata: Metadata = { title: 'market', description: 'hub market: de geur, het linnen en de essentials uit het verblijf, om thuis te hebben.' };

const producten = [
  { naam: <>de geur <i>van the shore</i></>, tekst: 'De signatuurgeur van de kusthuizen.', sleutel: 'geur-shore', foto: '/images/hub/geur-shore.png' },
  { naam: <>de geur <i>van the fields</i></>, tekst: 'De signatuurgeur van de huizen op het platteland.', sleutel: 'geur-fields', foto: '/images/hub/geur-fields.png' },
  { naam: <>het linnen <i>uit het verblijf</i></>, tekst: 'Hetzelfde beddengoed en dezelfde handdoeken.', sleutel: 'linnen', foto: '/images/standaard/V2-19.jpg' },
  { naam: <>de essentials <i>voor de badkamer</i></>, tekst: 'Zeep, shampoo en lotion uit de huizen.', sleutel: 'essentials', foto: '/images/standaard/V2-36.jpg' },
];

export default function Market() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop
            niveau={1}
            boven="hub market · voor gasten"
            titel={<>neem het <i>mee.</i></>}
            tekst="Dezelfde geur als bij je aankomst. Hetzelfde linnen. Voor thuis, wanneer je weer even daar wil zijn."
          />
        </div>
      </section>

      <Sectie toon="zacht">
        <div className="raster-4">
          {producten.map((p) => (
            <div key={p.sleutel} className="kaart" style={{ padding: 0, background: 'transparent', border: 'none', gap: 10 }}>
              <div className="foto" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image src={p.foto} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
              </div>
              <h2 className="kaart-titel" style={{ fontSize: 22 }}>{p.naam}</h2>
              <p className="klein" style={{ margin: 0 }}>{p.tekst}</p>
              <span className="klein">binnenkort</span>
            </div>
          ))}
        </div>
      </Sectie>

      <Sectie>
        <div className="rij">
          <div className="smal">
            <Kop
              boven="als eerste weten"
              titel={<>de market <i>opent binnenkort.</i></>}
              tekst="Laat je e-mail achter. Je hoort het als eerste, met een voordeel voor wie al bij ons verbleef."
            />
          </div>
          <div className="breed">
            <ContactForm
              merk="hub"
              soort="market-wachtlijst"
              knop="hou me op de hoogte"
              bedankt="bedankt. je hoort het als eerste."
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'interesse', label: 'waar kijk je het meest naar uit', type: 'select', opties: ['de geur', 'het linnen', 'de essentials', 'alles'] },
              ]}
            />
          </div>
        </div>
      </Sectie>
    </>
  );
}
