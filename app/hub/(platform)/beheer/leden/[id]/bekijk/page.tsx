import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sectie, Kop } from '@/components/merk/Shell';
import { eisBeheer } from '@/lib/hub/beheer';
import { type Profiel } from '@/lib/hub/supabase';
import { huisRegels, type Huis } from '@/lib/hub/huizen';
import { soortLabel, kort, duur, fotoLinks, type Vraag, type VraagUpdate } from '@/lib/hub/vragen';
import { opdrachtStatusNaam, opdrachtKleur, type OpdrachtStatus } from '@/lib/hub/opdrachten';
import { VraagKaart } from '@/components/hub/VraagKaart';

export const metadata: Metadata = { title: 'beheer · bekijk als', robots: { index: false } };
export const dynamic = 'force-dynamic';

// "Bekijk als": wat dit lid of deze partner in de hub ziet, alleen om te lezen.
// Je blijft ingelogd als moroww; er wordt niets in naam van de ander gedaan.
export default async function BekijkAls({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { db } = await eisBeheer(`/hub/beheer/leden/${id}/bekijk`);
  const { data } = await db.from('hub_profielen').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  const p = data as Profiel;
  const voornaam = p.naam.split(' ')[0];

  const band = (
    <div className="plat-band" role="status">
      <span>Je bekijkt de hub als <strong>{p.naam}</strong>. Alleen lezen: je kan hier niets aanpassen.</span>
      <Link href={`/hub/beheer/leden/${id}`}>terug naar beheer</Link>
    </div>
  );

  if (p.rol === 'partner') {
    const { data: fiche } = await db.from('hub_partners').select('id,naam,soort,vak,regio,wat,voordeel,code,url,contact,status').eq('eigenaar', id).maybeSingle();
    const f = fiche as { id: string; naam: string; soort: string; vak: string | null; regio: string | null; wat: string | null; voordeel: string | null; code: string | null; url: string | null; contact: string | null; status: string } | null;
    const { data: ops } = f
      ? await db.from('hub_opdrachten').select('id,status,verstuurd_om,hub_vragen(huis,soort,wat)').eq('partner_id', f.id).order('verstuurd_om', { ascending: false }).limit(30)
      : { data: [] };
    const opdrachten = (ops ?? []) as unknown as { id: string; status: OpdrachtStatus; verstuurd_om: string; hub_vragen: { huis: string; soort: string; wat: string } | null }[];
    const regels = f ? ([['wat', f.wat], ['vak', f.vak], ['regio', f.regio], ['voordeel voor leden', f.voordeel], ['code', f.code], ['website', f.url], ['contact voor leden', f.contact]] as [string, string | null][]).filter(([, v]) => v) : [];
    return (
      <div className="plat-kijk">
        {band}
        <section className="held">
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="boven">moroww hub · partnerportaal</span>
            <h1 className="titel-1">opdrachten en fiche.</h1>
          </div>
        </section>
        <Sectie>
          <Kop boven="opdrachten" titel="wat moroww stuurde." />
          {opdrachten.length ? (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 820 }}>
              {opdrachten.map((o) => (
                <li key={o.id} className="kaart">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <span className="kaart-label">{o.hub_vragen ? `${soortLabel(o.hub_vragen.soort)} · ${o.hub_vragen.huis}` : 'opdracht'} · {kort(o.verstuurd_om)}</span>
                    <span className={`hub-label ${opdrachtKleur[o.status]}`}>{opdrachtStatusNaam[o.status]}</span>
                  </div>
                  {o.hub_vragen ? <p style={{ margin: 0 }}>{o.hub_vragen.wat}</p> : null}
                </li>
              ))}
            </ul>
          ) : <p className="hub-leeg">Nog geen opdrachten.</p>}
        </Sectie>
        <Sectie>
          <Kop boven="fiche" titel={f ? f.naam : 'nog geen fiche.'} />
          {f ? (
            <>
              <span className={`hub-label ${f.status === 'live' ? 'live' : ''}`}>{f.status === 'live' ? 'live bij de leden' : 'wacht op controle'}</span>
              <dl style={{ margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
                {regels.map(([k, v]) => <div key={k}><dt className="hub-meta">{k}</dt><dd style={{ margin: 0 }}>{v}</dd></div>)}
              </dl>
            </>
          ) : null}
        </Sectie>
      </div>
    );
  }

  const { data: rijen } = await db.from('hub_vragen').select('*').eq('eigenaar', id).order('created_at', { ascending: false }).limit(60);
  const vragen = (rijen ?? []) as Vraag[];
  const ids = vragen.map((v) => v.id);
  const [{ data: ups }, { data: ptn }, { data: hzn }] = await Promise.all([
    ids.length ? db.from('hub_vraag_updates').select('*').in('vraag_id', ids).order('created_at') : Promise.resolve({ data: [] }),
    db.from('hub_partners').select('id,naam').in('id', [...new Set(vragen.map((v) => v.partner_id).filter(Boolean))] as string[]),
    db.from('hub_huizen').select('*').eq('profiel_id', id).order('naam'),
  ]);
  const updates = (ups ?? []) as VraagUpdate[];
  const huizen = (hzn ?? []) as Huis[];
  const partnerNaam = new Map(((ptn ?? []) as { id: string; naam: string }[]).map((x) => [x.id, x.naam]));
  const fotos = await fotoLinks([...vragen.map((v) => v.foto), ...updates.map((u) => u.foto)]);
  const loopt = vragen.filter((v) => v.status === 'binnen' || v.status === 'ingepland');
  const klaar = vragen.filter((v) => v.status === 'geregeld' || v.status === 'lukt-niet');
  const tijden = vragen.filter((v) => v.geregeld_om).map((v) => new Date(v.geregeld_om!).getTime() - new Date(v.created_at).getTime()).sort((a, b) => a - b);
  const mediaan = tijden.length ? tijden[Math.floor(tijden.length / 2)] : null;
  const kaart = (v: Vraag) => (
    <VraagKaart key={v.id} v={v} updates={updates.filter((u) => u.vraag_id === v.id)} partner={v.partner_id ? partnerNaam.get(v.partner_id) : null} fotos={fotos} />
  );

  return (
    <div className="plat-kijk">
      {band}
      <header className="plat-kop">
        <div>
          <span className="boven">{p.huis || 'overzicht'}</span>
          <h1 className="titel-1 plat-titel">het overzicht van {voornaam}.</h1>
        </div>
        <div className="hub-cijfers">
          <div><b>{loopt.length}</b><span>lopen nu</span></div>
          <div><b>{vragen.filter((v) => v.status === 'geregeld').length}</b><span>geregeld</span></div>
          {mediaan !== null ? <div><b>{duur(mediaan)}</b><span>van vraag tot geregeld</span></div> : null}
        </div>
      </header>
      <div className="plat-bureau" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
        <div className="plat-stroom">
          <section>
            <h2 className="plat-groep-titel">loopt nu <span>{loopt.length}</span></h2>
            {loopt.length ? <div className="plat-kaarten">{loopt.map(kaart)}</div> : <div className="plat-leeg"><strong>alles is geregeld.</strong><span>Er loopt geen vraag.</span></div>}
          </section>
          {klaar.length ? (
            <section>
              <h2 className="plat-groep-titel">geregeld <span>{klaar.length}</span></h2>
              <div className="plat-kaarten">{klaar.map(kaart)}</div>
            </section>
          ) : null}
        </div>
      </div>
      <Sectie>
        <Kop boven="mijn huizen" titel={huizen.length === 1 ? 'één huis.' : `${huizen.length} huizen.`} />
        {huizen.length ? (
          <div className="raster">
            {huizen.map((h) => (
              <div key={h.id} className="kaart">
                <span className="kaart-label">{h.gemeente}</span>
                <h3 className="kaart-titel">{h.naam}</h3>
                <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                  {huisRegels(h).map(([k, v]) => <div key={k}><dt className="hub-meta">{k}</dt><dd style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{v}</dd></div>)}
                </dl>
              </div>
            ))}
          </div>
        ) : <p className="hub-leeg">Nog geen huizen in de hub.</p>}
      </Sectie>
    </div>
  );
}
