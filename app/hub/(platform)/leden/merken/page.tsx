import type { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { eisLid, tekst } from '@/lib/hub/supabase';
import { meldBeheer } from '@/lib/hub/mail';
import { fotoLinks } from '@/lib/hub/vragen';
import { PartnerKaart } from '@/components/hub/PartnerKaart';

export const metadata: Metadata = { title: 'merken', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface Merk { id: string; naam: string; wat: string | null; plek: string | null; voordeel: string | null; url: string | null; logo: string | null; foto: string | null }

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
  const { sb, user } = await eisLid('/hub/leden/merken');
  const [{ data }, { data: mijn }] = await Promise.all([
    sb.from('hub_partners').select('id,naam,wat,plek,voordeel,url,logo,foto').eq('status', 'live').eq('soort', 'merk').order('naam'),
    sb.from('hub_merk_aanvragen').select('partner_id,status').eq('profiel_id', user.id),
  ]);
  const merken = (data ?? []) as Merk[];
  const beeld = await fotoLinks(merken.flatMap((m) => [m.logo, m.foto]));
  const status = new Map(((mijn ?? []) as { partner_id: string; status: string }[]).map((m) => [m.partner_id, m.status]));

  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="boven">moroww hub · merken</span>
          <h1 className="titel-1">wat de gast <i>gebruikt.</i></h1>
          <p className="inleiding">Kleine merken die in moroww-huizen staan: in de badkamer, de keuken, de living. Vraag een merk aan voor je huis, dan plaatst moroww het.</p>
        </div>
      </section>
      <Sectie>
        {merken.length ? (
          <div className="pk-raster">
            {merken.map((m) => {
              const st = status.get(m.id);
              return (
                <PartnerKaart
                  key={m.id}
                  naam={m.naam}
                  label={m.plek || 'in het huis'}
                  wat={m.wat}
                  voordeel={m.voordeel}
                  foto={m.foto ? beeld.get(m.foto) : null}
                  logo={m.logo ? beeld.get(m.logo) : null}
                  voet={<>
                    {st ? (
                      <span className={`hub-label ${st === 'geplaatst' ? 'live' : st === 'gestopt' ? '' : 's-let'}`}>{st === 'geplaatst' ? 'staat in je huis' : st === 'gestopt' ? 'gestopt' : 'aangevraagd'}</span>
                    ) : (
                      <form action={vraagMerk}>
                        <input type="hidden" name="partner" value={m.id} />
                        <input type="hidden" name="naam" value={m.naam} />
                        <button type="submit" className="hub-knopklein primair">vraag aan voor mijn huis</button>
                      </form>
                    )}
                    {m.url ? <a href={m.url} target="_blank" rel="noopener noreferrer">website</a> : null}
                  </>}
                />
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
