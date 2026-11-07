import type { Metadata } from 'next';
import { Sectie, Kop } from '@/components/merk/Shell';

export const metadata: Metadata = { title: 'market', description: 'hub market: het linnen, de geur en de essentials uit het verblijf, om thuis te hebben.' };

const producten = [
  { naam: <>de geur van <i>[NAAM VERBLIJF]</i></>, sleutel: 'geur' },
  { naam: <>het linnen <i>uit het verblijf</i></>, sleutel: 'linnen' },
  { naam: <>de essentials <i>voor de badkamer</i></>, sleutel: 'essentials' },
];

export default function Market() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop niveau={1} boven="hub market" titel={<>neem het <i>mee.</i></>} tekst="Dezelfde geur als bij je aankomst. Hetzelfde linnen. Voor thuis, wanneer je weer even daar wil zijn." />
        </div>
      </section>
      <Sectie toon="zacht">
        <div className="raster">
          {producten.map((p) => (
            <div key={p.sleutel} className="kaart" style={{ padding: 0, background: 'transparent', border: 'none', gap: 10 }}>
              <span className="foto">[PRODUCTFOTO]</span>
              <h2 className="kaart-titel" style={{ fontSize: 22 }}>{p.naam}</h2>
              <span className="klein">[PRIJS] · binnenkort te koop</span>
            </div>
          ))}
        </div>
      </Sectie>
    </>
  );
}
