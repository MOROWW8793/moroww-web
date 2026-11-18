import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { eisLid, tekst } from '@/lib/hub/supabase';
import { huisVelden, huisRegels, type Huis } from '@/lib/hub/huizen';

export const metadata: Metadata = { title: 'mijn huizen', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function bewaarHuis(formData: FormData) {
  'use server';
  const { sb, user } = await eisLid('/hub/leden/huizen');
  const v = huisVelden(formData);
  if (!v.naam || !v.adres || !v.postcode || !v.gemeente) redirect('/hub/leden/huizen?fout=leeg');
  const id = tekst(formData.get('id'), 60);
  const { error } = id
    ? await sb.from('hub_huizen').update({ ...v, updated_at: new Date().toISOString() }).eq('id', id).eq('profiel_id', user.id)
    : await sb.from('hub_huizen').insert({ ...v, profiel_id: user.id });
  if (error) redirect('/hub/leden/huizen?fout=opslaan');
  revalidatePath('/hub/leden/huizen');
  revalidatePath('/hub/leden');
  redirect('/hub/leden/huizen?bewaard=1');
}

async function verwijderHuis(formData: FormData) {
  'use server';
  const { sb, user } = await eisLid('/hub/leden/huizen');
  await sb.from('hub_huizen').delete().eq('id', tekst(formData.get('id'), 60)).eq('profiel_id', user.id);
  revalidatePath('/hub/leden/huizen');
  revalidatePath('/hub/leden');
}

function Velden({ h }: { h?: Huis }) {
  const k = h?.id ?? 'nieuw';
  return (
    <>
      <div className="rij-velden">
        <div className="veld"><label htmlFor={`naam-${k}`}>naam van het huis</label><input id={`naam-${k}`} name="naam" required maxLength={120} defaultValue={h?.naam ?? ''} /></div>
        <div className="veld"><label htmlFor={`adres-${k}`}>straat, nummer en bus</label><input id={`adres-${k}`} name="adres" required autoComplete="street-address" defaultValue={h?.adres ?? ''} /></div>
      </div>
      <div className="rij-velden">
        <div className="veld"><label htmlFor={`postcode-${k}`}>postcode</label><input id={`postcode-${k}`} name="postcode" required autoComplete="postal-code" defaultValue={h?.postcode ?? ''} /></div>
        <div className="veld"><label htmlFor={`gemeente-${k}`}>gemeente</label><input id={`gemeente-${k}`} name="gemeente" required autoComplete="address-level2" defaultValue={h?.gemeente ?? ''} /></div>
      </div>
      <div className="rij-velden">
        <div className="veld"><label htmlFor={`slk-${k}`}>slaapkamers</label><input id={`slk-${k}`} name="slaapkamers" type="number" min={0} max={50} defaultValue={h?.slaapkamers ?? ''} /></div>
        <div className="veld"><label htmlFor={`bk-${k}`}>badkamers</label><input id={`bk-${k}`} name="badkamers" type="number" min={0} max={50} defaultValue={h?.badkamers ?? ''} /></div>
        <div className="veld"><label htmlFor={`bedden-${k}`}>bedden</label><input id={`bedden-${k}`} name="bedden" placeholder="2 tweepersoons, 1 stapelbed" defaultValue={h?.bedden ?? ''} /></div>
      </div>
      <div className="veld"><label htmlFor={`toegang-${k}`}>hoe komen we binnen</label><textarea id={`toegang-${k}`} name="toegang" placeholder="slot met code, sleutelkluis of iemand ter plaatse" defaultValue={h?.toegang ?? ''} /></div>
      <div className="rij-velden">
        <div className="veld"><label htmlFor={`park-${k}`}>parkeren</label><input id={`park-${k}`} name="parkeren" placeholder="oprit, straat, betalend" defaultValue={h?.parkeren ?? ''} /></div>
        <div className="veld"><label htmlFor={`cn-${k}`}>contact ter plaatse</label><input id={`cn-${k}`} name="contact_naam" defaultValue={h?.contact_naam ?? ''} /></div>
        <div className="veld"><label htmlFor={`ct-${k}`}>telefoon van dat contact</label><input id={`ct-${k}`} name="contact_telefoon" type="tel" defaultValue={h?.contact_telefoon ?? ''} /></div>
      </div>
      <div className="veld"><label htmlFor={`opm-${k}`}>wat we nog moeten weten</label><textarea id={`opm-${k}`} name="opmerkingen" placeholder="alarm, huisdieren, waar het poetsmateriaal staat" defaultValue={h?.opmerkingen ?? ''} /></div>
    </>
  );
}

export default async function LedenHuizen({ searchParams }: { searchParams: Promise<{ fout?: string; bewaard?: string }> }) {
  const sp = await searchParams;
  const { sb, user } = await eisLid('/hub/leden/huizen');
  const { data } = await sb.from('hub_huizen').select('*').eq('profiel_id', user.id).order('naam');
  const huizen = (data ?? []) as Huis[];

  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="boven">moroww hub · mijn huizen</span>
          <h1 className="titel-1">{huizen.length === 1 ? 'één huis.' : huizen.length ? `${huizen.length} huizen.` : 'je huizen.'}</h1>
          <p className="inleiding">Zet elk huis één keer in de hub. Bij een vraag kies je het huis, en weten wij en de partner waar het is, hoe we binnenkomen en wat er staat.</p>
          {sp.bewaard ? <p className="plat-ok">Bewaard.</p> : null}
          {sp.fout === 'leeg' ? <p className="hub-fout">Vul de naam, het adres, de postcode en de gemeente in.</p> : null}
          {sp.fout === 'opslaan' ? <p className="hub-fout">Bewaren lukte niet. Probeer het opnieuw, of bel ons.</p> : null}
        </div>
      </section>

      {huizen.length ? (
        <Sectie>
          <div className="raster">
            {huizen.map((h) => (
              <div key={h.id} className="kaart">
                <span className="kaart-label">{h.gemeente}</span>
                <h2 className="kaart-titel" style={{ fontSize: 24 }}>{h.naam}</h2>
                <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15 }}>
                  {huisRegels(h).map(([k, v]) => (
                    <div key={k}><dt className="hub-meta">{k}</dt><dd style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{v}</dd></div>
                  ))}
                </dl>
                <details style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                  <summary style={{ cursor: 'pointer', fontSize: 15, minHeight: 44, display: 'flex', alignItems: 'center' }}>pas aan</summary>
                  <form action={bewaarHuis} className="hub-form" style={{ marginTop: 12 }}>
                    <input type="hidden" name="id" value={h.id} />
                    <Velden h={h} />
                    <button type="submit" className="btn btn-primair">bewaar</button>
                  </form>
                  <form action={verwijderHuis} style={{ marginTop: 12 }}>
                    <input type="hidden" name="id" value={h.id} />
                    <button type="submit" className="hub-knopklein">verwijder dit huis</button>
                  </form>
                </details>
              </div>
            ))}
          </div>
        </Sectie>
      ) : null}

      <Sectie toon="zacht">
        <Kop boven="huis toevoegen" titel={huizen.length ? 'nog een huis.' : 'je eerste huis.'} tekst="Alleen jij en moroww zien deze gegevens. Een partner krijgt ze per opdracht." />
        <form action={bewaarHuis} className="hub-form" style={{ maxWidth: 760 }}>
          <Velden />
          <button type="submit" className="btn btn-primair">voeg het huis toe</button>
        </form>
      </Sectie>
    </>
  );
}
