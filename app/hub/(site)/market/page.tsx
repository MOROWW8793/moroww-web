import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { ContactForm } from '@/components/merk/ContactForm';
import { ZHeld, ZSectie, ZSectieTwee } from '@/components/merk/Zwitsers';
import { supabase } from '@/lib/supabase';

export const revalidate = 300;

interface MarktProduct { id: string; naam: string; tekst: string | null; foto: string | null; url: string | null; hub_partners: { naam: string } | null }

export const metadata: Metadata = { title: 'market', description: 'hub market: de geur, het linnen en de essentials uit het verblijf, om thuis te hebben.' };

const producten = [
  { naam: 'de geur van the shore', tekst: 'De signatuurgeur van de kusthuizen.', foto: '/images/hub/geur-shore.png' },
  { naam: 'de geur van the fields', tekst: 'De signatuurgeur van de huizen op het platteland.', foto: '/images/hub/geur-fields.png' },
  { naam: 'het linnen uit het verblijf', tekst: 'Hetzelfde beddengoed en dezelfde handdoeken.', foto: '/images/standaard/V2-19.jpg' },
  { naam: 'de essentials voor de badkamer', tekst: 'Zeep, shampoo en lotion uit de huizen.', foto: '/images/standaard/V2-36.jpg' },
];

function Tegel({ naam, tekst, voet, foto, extern }: { naam: string; tekst: string | null; voet: string; foto: ReactNode; extern?: string }) {
  const binnen = (
    <>
      <div className="z-foto" style={{ aspectRatio: '4 / 5', margin: '-28px -28px 8px' }}>{foto}</div>
      <span className="z-h3" style={{ fontSize: 21 }}>{naam}</span>
      {tekst ? <span className="z-tekst" style={{ fontSize: 15 }}>{tekst}</span> : null}
      <span className="z-nr" style={{ marginTop: 'auto' }}>{voet}</span>
    </>
  );
  return extern ? <a href={extern} target="_blank" rel="noopener noreferrer" style={{ flexBasis: 240 }}>{binnen}</a> : <div style={{ flexBasis: 240 }}>{binnen}</div>;
}

export default async function Market() {
  const { data } = await supabase.from('hub_producten').select('id,naam,tekst,foto,url,hub_partners(naam)').eq('status', 'live').order('created_at');
  const live = (data ?? []) as unknown as MarktProduct[];
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · hub market · voor gasten"
        titel={<>neem het<br />mee.</>}
        lead="Dezelfde geur als bij je aankomst. Hetzelfde linnen. Voor thuis, wanneer je weer even daar wil zijn."
        acties={<a href="#wachtlijst" className="z-knop">als eerste weten</a>}
      />

      {live.length ? (
        <ZSectie nr="02 · nu te koop" titel="uit de huizen.">
          <div className="z-tegels">
            {live.map((p) => (
              <Tegel
                key={p.id}
                naam={p.naam}
                tekst={p.tekst}
                voet={`bij ${p.hub_partners?.naam ?? 'de partner'}`}
                extern={p.url ?? undefined}
                // eslint-disable-next-line @next/next/no-img-element
                foto={p.foto ? <img src={p.foto} alt={p.naam} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
              />
            ))}
          </div>
        </ZSectie>
      ) : null}

      <ZSectie nr={live.length ? '03 · binnenkort' : '02 · binnenkort'} titel="wat er komt.">
        <div className="z-tegels">
          {producten.map((p) => (
            <Tegel
              key={p.naam}
              naam={p.naam}
              tekst={p.tekst}
              voet="binnenkort"
              foto={<Image src={p.foto} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" style={{ objectFit: 'cover' }} />}
            />
          ))}
        </div>
      </ZSectie>

      <ZSectieTwee
        id="wachtlijst"
        nr={live.length ? '04 · als eerste weten' : '03 · als eerste weten'}
        titel="de market opent binnenkort."
        tekst="Laat je e-mail achter. Je hoort het als eerste, met een voordeel voor wie al bij ons verbleef."
      >
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
      </ZSectieTwee>
    </div>
  );
}
