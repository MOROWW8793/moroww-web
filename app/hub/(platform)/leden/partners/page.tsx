import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie } from '@/components/merk/Shell';
import { eisLid, hubBeheerClient } from '@/lib/hub/supabase';

export const metadata: Metadata = { title: 'partners', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface Partner { id: string; naam: string; vak: string | null; regio: string | null; wat: string | null; voordeel: string | null; code: string | null; url: string | null }

export default async function LedenPartners() {
  const { sb } = await eisLid('/hub/leden/partners');
  const { data } = await sb.from('hub_partners').select('id,naam,vak,regio,wat,voordeel,code,url').eq('status', 'live').eq('soort', 'dienst').order('naam');
  const partners = (data ?? []) as Partner[];
  // Cijfers over alle huizen heen: opdrachten en gemiddelde score per partner.
  const { data: v } = await hubBeheerClient().from('hub_vragen').select('partner_id,score,status').eq('status', 'geregeld').in('partner_id', partners.map((p) => p.id));
  const stats = new Map<string, { n: number; som: number; m: number }>();
  ((v ?? []) as { partner_id: string; score: number | null }[]).forEach((r) => {
    const s = stats.get(r.partner_id) ?? { n: 0, som: 0, m: 0 };
    s.n += 1;
    if (r.score) { s.som += r.score; s.m += 1; }
    stats.set(r.partner_id, s);
  });

  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="boven">moroww hub · partners</span>
          <h1 className="titel-1">de mensen <i>achter de huizen.</i></h1>
          <p className="inleiding">Vakmensen die in moroww-huizen werken. Vraag het via moroww, dan kiezen wij wie het snelst kan en volgen we op.</p>
        </div>
      </section>
      <Sectie>
        {partners.length ? (
          <div className="raster">
            {partners.map((p) => {
              const s = stats.get(p.id);
              return (
                <div key={p.id} className="kaart">
                  <span className="kaart-label">{[p.vak, p.regio].filter(Boolean).join(' · ') || 'partner'}</span>
                  <h2 className="kaart-titel" style={{ fontSize: 24 }}>{p.naam}</h2>
                  {p.wat ? <p>{p.wat}</p> : null}
                  {s ? <p className="hub-meta" style={{ margin: 0 }}>{s.n} {s.n === 1 ? 'opdracht' : 'opdrachten'} via de hub{s.m ? ` · gemiddeld ${(s.som / s.m).toFixed(1).replace('.', ',')} op 5` : ''}</p> : null}
                  {p.voordeel ? <p style={{ color: 'var(--ink)' }}>{p.voordeel}</p> : null}
                  {p.code ? <span className="hub-code">{p.code}</span> : null}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                    <Link href="/hub/leden#vraag" style={{ fontSize: 15 }}>vraag het via moroww</Link>
                    {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15 }}>website</a> : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="hub-leeg">De partners worden nog toegevoegd.</p>
        )}
      </Sectie>
    </>
  );
}
