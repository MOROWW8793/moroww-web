import type { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { LedenNav } from '@/components/hub/LedenNav';
import { eisLid, tekst, datumNL } from '@/lib/hub/supabase';

export const metadata: Metadata = { title: 'academy en ledenbrief', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface Sessie { id: string; titel: string; tekst: string | null; datum: string; plaats: string | null }
interface Brief { id: string; titel: string; tekst: string; datum: string }

async function inschrijven(formData: FormData) {
  'use server';
  const { sb, user } = await eisLid('/hub/leden/academy');
  const sessie = tekst(formData.get('sessie'), 60);
  if (formData.get('actie') === 'uit') await sb.from('hub_inschrijvingen').delete().eq('sessie_id', sessie).eq('profiel_id', user.id);
  else await sb.from('hub_inschrijvingen').insert({ sessie_id: sessie, profiel_id: user.id });
  revalidatePath('/hub/leden/academy');
}

export default async function LedenAcademy() {
  const { sb, user, profiel, beheerder } = await eisLid('/hub/leden/academy');
  const [{ data: sessies }, { data: mijn }, { data: brieven }] = await Promise.all([
    sb.from('hub_sessies').select('id,titel,tekst,datum,plaats').gte('datum', new Date().toISOString()).order('datum').limit(8),
    sb.from('hub_inschrijvingen').select('sessie_id').eq('profiel_id', user.id),
    sb.from('hub_ledenbrieven').select('id,titel,tekst,datum').order('datum', { ascending: false }).limit(12),
  ]);
  const ingeschreven = new Set(((mijn ?? []) as { sessie_id: string }[]).map((m) => m.sessie_id));

  return (
    <>
      <LedenNav actief="academy" partner={profiel.rol === 'partner'} beheerder={beheerder} />
      <Sectie>
        <Kop boven="academy" titel={<>de volgende <i>sessies.</i></>} tekst="Kleine sessies in een moroww-huis, voor eigenaars, hosts en de teams van property managers." />
        {(sessies as Sessie[] | null)?.length ? (
          <div className="raster-2">
            {(sessies as Sessie[]).map((s) => {
              const ja = ingeschreven.has(s.id);
              return (
                <div key={s.id} className="kaart">
                  <span className="kaart-label">{datumNL(s.datum, true)}{s.plaats ? ` · ${s.plaats}` : ''}</span>
                  <h2 className="kaart-titel" style={{ fontSize: 24 }}>{s.titel}</h2>
                  {s.tekst ? <p>{s.tekst}</p> : null}
                  <form action={inschrijven} style={{ marginTop: 'auto' }}>
                    <input type="hidden" name="sessie" value={s.id} />
                    <input type="hidden" name="actie" value={ja ? 'uit' : 'in'} />
                    <button type="submit" className={ja ? 'btn btn-lijn' : 'btn btn-primair'}>{ja ? 'je bent ingeschreven · uitschrijven' : 'schrijf me in'}</button>
                  </form>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="hub-leeg">Er staat nog geen sessie gepland. We laten het weten via de ledenbrief.</p>
        )}
      </Sectie>
      <Sectie toon="zacht">
        <Kop boven="ledenbrief" titel={<>wat er <i>verandert.</i></>} />
        {(brieven as Brief[] | null)?.length ? (
          <div className="hub-draad" style={{ maxWidth: 760 }}>
            {(brieven as Brief[]).map((b, i) => (
              <details key={b.id} className="hub-bericht" open={i === 0}>
                <summary style={{ cursor: 'pointer' }}>
                  <span className="hub-meta">{datumNL(b.datum)}</span>
                  <h3 className="kaart-titel" style={{ fontSize: 22 }}>{b.titel}</h3>
                </summary>
                <p>{b.tekst}</p>
              </details>
            ))}
          </div>
        ) : (
          <p className="hub-leeg">De eerste ledenbrief komt eraan.</p>
        )}
      </Sectie>
    </>
  );
}
