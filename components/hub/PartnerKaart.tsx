import type { ReactNode } from 'react';

// Eén partner of merk zoals een lid het ziet: foto bovenaan, logo erover,
// dan wat ze doen en wat een lid ervan heeft. Zonder beeld: de eerste letter.
export function PartnerKaart({
  naam, label, wat, meta, voordeel, code, foto, logo, voet,
}: {
  naam: string; label: string; wat?: string | null; meta?: string | null; voordeel?: string | null; code?: string | null;
  foto?: string | null; logo?: string | null; voet?: ReactNode;
}) {
  return (
    <article className="pk">
      <div className={`pk-beeld${foto ? '' : ' leeg'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {foto ? <img src={foto} alt="" loading="lazy" /> : null}
        <span className="pk-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logo ? <img src={logo} alt={`logo van ${naam}`} loading="lazy" /> : <b aria-hidden>{naam.slice(0, 1).toUpperCase()}</b>}
        </span>
      </div>
      <div className="pk-tekst">
        <span className="kaart-label">{label}</span>
        <h2 className="pk-naam">{naam}</h2>
        {wat ? <p>{wat}</p> : null}
        {meta ? <p className="hub-meta">{meta}</p> : null}
        {voordeel ? <p className="pk-voordeel"><span>voor leden</span>{voordeel}</p> : null}
        {code ? <span className="hub-code">{code}</span> : null}
      </div>
      {voet ? <div className="pk-voet">{voet}</div> : null}
    </article>
  );
}
