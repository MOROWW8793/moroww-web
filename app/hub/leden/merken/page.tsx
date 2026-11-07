import type { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { LedenNav } from '@/components/hub/LedenNav';
import { eisLid, tekst } from '@/lib/hub/supabase';
import { meldBeheer } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'merken', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface Merk { id: string; naam: string; wat: string | null; plek: string | null; voordeel: string | null; url: string | null }

async function vraagMerk(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await eisLid('/hub/leden/merken');
  const partner = tekst(formData.get('partner'), 60);
  const naam = tekst(formData.get('naam'), 120);
  const { error } = await sb.from('hub_merk_aanvragen').insert({ profiel_id: user.id, partner_id: partner, huis: profiel.huis, status: 'aangevraagd' });
  if (!error) await meldBeheer(`merk aangevraagd · ${naam}`, [['eigenaar', profiel.naam], ['huis', profiel.huis ?? ''], ['merk', naam]]);
  revalidatePath('/hub/leden/merken');
}

export default async function LedenMerken() {
  const { sb, user, profiel, beheerder } = await eisLid('/hub/leden/merken');
  const [{ data }, { data: mijn }] = await Promise.all([
    sb.from('hub_partners').select('id,naam,wat,plek,voordeel,url').eq('status', 'live').eq('soort', 'merk').order('naam'),
    sb.from('hub_merk_aanvragen').select('partner_id,status').eq('profiel_id', user.id),
  ]);
  const merken = (data ?? []) as Merk[];
  const status = new Map(((mijn ?? []) as { partner_id: string; status: string }[]).map((m) => [m.partner_id, m.status]));

  return (
    <>
      <LedenNav actief="merken" partner={profiel.rol === 'partner'} beheerder={beheerder} />
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="boven">moroww hub · merken</span>
          <h1 className="titel-1">wat de gast <i>gebruikt.</i></h1>
          <p className="inleiding">Kleine merken die in moroww-huizen staan: in de badkamer, de keuken, de living. Vraag een merk aan voor je huis, dan plaatst moroww het.</p>
        </div>
      </section>
      <Sectie>
        {merken.length ? (
          <div className="raster">
            {merken.map((m) => {
              const st = status.get(m.id);
              return (
                <div key={m.id} className="kaart">
                  <span className="kaart-label">{m.plek || 'in het huis'}</span>
                  <h2 className="kaart-titel" style={{ fontSize: 24 }}>{m.naam}</h2>
                  {m.wat ? <p>{m.wat}</p> : null}
                  {m.voordeel ? <p style={{ color: 'var(--ink)' }}>{m.voordeel}</p> : null}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                    {st ? (
                      <span className={`hub-label ${st === 'geplaatst' ? 'live' : ''}`}>{st === 'geplaatst' ? 'staat in je huis' : st === 'gestopt' ? 'gestopt' : 'aangevraagd'}</span>
                    ) : (
                      <form action={vraagMerk}>
                        <input type="hidden" name="partner" value={m.id} />
                        <input type="hidden" name="naam" value={m.naam} />
                        <button type="submit" className="hub-knopklein primair">vraag aan voor mijn huis</button>
                      </form>
                    )}
                    {m.url ? <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15 }}>website</a> : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="hub-leeg">De eerste merken worden nog gekozen.</p>
        )}
      </Sectie>
      <Sectie toon="zacht">
        <Kop boven="binnenkort" titel={<>de gast neemt het <i>mee naar huis.</i></>} tekst="Een kaartje in het huis, de gast scant het en krijgt het thuis geleverd. Voor elk stuk dat je gasten kopen, verdien je mee. Dat werken we uit met de eerste merken." />
      </Sectie>
    </>
  );
}
