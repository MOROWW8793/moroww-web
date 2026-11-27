import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie } from '@/components/merk/Shell';
import { eisLid, hubBeheerClient } from '@/lib/hub/supabase';
import { fotoLinks } from '@/lib/hub/vragen';
import { PartnerKaart } from '@/components/hub/PartnerKaart';

export const metadata: Metadata = { title: 'partners', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface Partner { id: string; naam: string; vak: string | null; regio: string | null; wat: string | null; voordeel: string | null; code: string | null; url: string | null; logo: string | null; foto: string | null }

export default async function LedenPartners() {
  const { sb } = await eisLid('/hub/leden/partners');
  const { data } = await sb.from('hub_partners').select('id,naam,vak,regio,wat,voordeel,code,url,logo,foto').eq('status', 'live').eq('soort', 'dienst').order('naam');
  const partners = (data ?? []) as Partner[];
  // Cijfers over alle huizen heen: opdrachten en gemiddelde score per partner.
  const { data: v } = await hubBeheerClient().from('hub_vragen').select('partner_id,score,status').eq('status', 'geregeld').in('partner_id', partners.map((p) => p.id));
  const beeld = await fotoLinks(partners.flatMap((p) => [p.logo, p.foto]));
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
          <span className="boven">moroww hub · netwerk</span>
          <h1 className="titel-1">de mensen <i>achter de huizen.</i></h1>
          <p className="inleiding">Vakmensen die in moroww-huizen werken. Vraag het via moroww, dan kiezen wij wie het snelst kan en volgen we op.</p>
        </div>
      </section>
      <Sectie>
        {partners.length ? (
          <div className="pk-raster">
            {partners.map((p) => {
              const s = stats.get(p.id);
              return (
                <PartnerKaart
                  key={p.id}
                  naam={p.naam}
                  label={[p.vak, p.regio].filter(Boolean).join(' · ') || 'partner'}
                  wat={p.wat}
                  meta={s ? `${s.n} ${s.n === 1 ? 'opdracht' : 'opdrachten'} via de hub${s.m ? ` · gemiddeld ${(s.som / s.m).toFixed(1).replace('.', ',')} op 5` : ''}` : null}
                  voordeel={p.voordeel}
                  code={p.code}
                  foto={p.foto ? beeld.get(p.foto) : null}
                  logo={p.logo ? beeld.get(p.logo) : null}
                  voet={<>
                    <Link href="/hub/leden#vraag" className="hub-knopklein primair">vraag het via moroww</Link>
                    {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer">website</a> : null}
                  </>}
                />
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
