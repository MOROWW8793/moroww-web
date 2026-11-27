import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { Sectie } from '@/components/merk/Shell';
import { eisLid, tekst } from '@/lib/hub/supabase';
import { soorten } from '@/lib/hub/vragen';
import { meldBeheer } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'mijn partners', robots: { index: false } };
export const dynamic = 'force-dynamic';

// Per soort werk één vaste partner. "Iets anders" heeft er geen.
const rijen = soorten.filter((s) => s.sleutel !== 'andere');
const kort = (label: string) => label.replace(/^extra /, '');

async function bewaar(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await eisLid('/hub/leden/mijn-partners');
  const nieuw: [string, string][] = [];
  for (const r of rijen) {
    const naam = tekst(formData.get(`naam-${r.sleutel}`), 120);
    const telefoon = tekst(formData.get(`telefoon-${r.sleutel}`), 40) || null;
    const { error } = naam
      ? await sb.from('hub_eigen_partners').upsert({ profiel_id: user.id, soort: r.sleutel, naam, telefoon, updated_at: new Date().toISOString() }, { onConflict: 'profiel_id,soort' })
      : await sb.from('hub_eigen_partners').delete().eq('profiel_id', user.id).eq('soort', r.sleutel);
    if (error) redirect('/hub/leden/mijn-partners?fout=opslaan');
    if (naam) nieuw.push([kort(r.label), [naam, telefoon].filter(Boolean).join(' · ')]);
  }
  if (nieuw.length) await meldBeheer(`vaste partners · ${profiel.naam}`, nieuw);
  revalidatePath('/hub/leden');
  redirect('/hub/leden/mijn-partners?bewaard=1');
}

// Wie geen vaste partners heeft, slaat de stap over: het netwerk zoekt.
async function slaOver() {
  'use server';
  await eisLid('/hub/leden/mijn-partners');
  (await cookies()).set('hub_start_over', '1', { path: '/hub', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
  redirect('/hub/leden');
}

export default async function MijnPartners({ searchParams }: { searchParams: Promise<{ fout?: string; bewaard?: string }> }) {
  const sp = await searchParams;
  const { sb, user } = await eisLid('/hub/leden/mijn-partners');
  const { data } = await sb.from('hub_eigen_partners').select('soort,naam,telefoon').eq('profiel_id', user.id);
  const per = new Map(((data ?? []) as { soort: string; naam: string; telefoon: string | null }[]).map((x) => [x.soort, x]));

  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="boven">moroww hub · mijn partners</span>
          <h1 className="titel-1">je vaste partners.</h1>
          <p className="inleiding">Wie vandaag voor je werkt, krijgt je vraag eerst. Kan die niet, dan zoekt de hub verder in het netwerk.</p>
        </div>
      </section>
      <Sectie>
        <form action={bewaar} className="hub-form">
          <div className="eigen-partners">
            {rijen.map((r) => {
              const p = per.get(r.sleutel);
              return (
                <div key={r.sleutel} className="eigen-partner">
                  <strong>{kort(r.label)}</strong>
                  <div className="veld"><label htmlFor={`naam-${r.sleutel}`}>naam</label><input id={`naam-${r.sleutel}`} name={`naam-${r.sleutel}`} maxLength={120} defaultValue={p?.naam ?? ''} placeholder="geen: het netwerk zoekt" /></div>
                  <div className="veld"><label htmlFor={`telefoon-${r.sleutel}`}>telefoon</label><input id={`telefoon-${r.sleutel}`} name={`telefoon-${r.sleutel}`} type="tel" defaultValue={p?.telefoon ?? ''} /></div>
                </div>
              );
            })}
          </div>
          <p className="klein" style={{ margin: 0 }}>Op opdrachten voor je eigen partners rekenen we geen marge. Alleen jij en moroww zien deze gegevens.</p>
          {sp.bewaard ? <p className="plat-ok">Bewaard.</p> : null}
          {sp.fout ? <p className="hub-fout">Bewaren lukte niet. Probeer het opnieuw, of bel ons.</p> : null}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button type="submit" className="btn btn-primair">bewaar</button>
            {per.size ? null : <button type="submit" formAction={slaOver} className="btn btn-lijn">sla over, gebruik het netwerk</button>}
          </div>
        </form>
      </Sectie>
    </>
  );
}
