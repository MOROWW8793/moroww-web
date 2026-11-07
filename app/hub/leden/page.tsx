import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { LedenNav } from '@/components/hub/LedenNav';
import { hubSessie, tekst, categorieNaam, datumNL } from '@/lib/hub/supabase';
import { meldBeheer } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'ledenzone', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function vraagAan(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await hubSessie();
  if (!user || profiel) redirect('/hub/leden');
  const soort = tekst(formData.get('soort'), 30);
  const geldig = ['eigenaar', 'property-manager', 'partner'].includes(soort) ? soort : 'eigenaar';
  const rij = {
    id: user.id,
    email: user.email ?? '',
    naam: tekst(formData.get('naam'), 120),
    soort: geldig,
    rol: geldig === 'partner' ? 'partner' : 'lid',
    status: 'aangevraagd',
    huis: tekst(formData.get('huis'), 200) || null,
    bedrijf: tekst(formData.get('bedrijf'), 200) || null,
    telefoon: tekst(formData.get('telefoon'), 40) || null,
    bericht: tekst(formData.get('bericht'), 2000) || null,
  };
  if (!rij.naam) redirect('/hub/leden?fout=naam');
  const { error } = await sb.from('hub_profielen').insert(rij);
  if (error) redirect('/hub/leden?fout=opslaan');
  await meldBeheer(`nieuwe aanvraag · ${rij.naam}`, [
    ['soort', geldig],
    ['e-mail', rij.email],
    ['huis', rij.huis ?? ''],
    ['bedrijf', rij.bedrijf ?? ''],
    ['telefoon', rij.telefoon ?? ''],
    ['bericht', rij.bericht ?? ''],
  ]);
  redirect('/hub/leden');
}

async function inschrijven(formData: FormData) {
  'use server';
  const { sb, user } = await hubSessie();
  if (!user) redirect('/hub/inloggen');
  const sessie = tekst(formData.get('sessie'), 60);
  if (formData.get('actie') === 'uit') {
    await sb.from('hub_inschrijvingen').delete().eq('sessie_id', sessie).eq('profiel_id', user.id);
  } else {
    await sb.from('hub_inschrijvingen').insert({ sessie_id: sessie, profiel_id: user.id });
  }
  revalidatePath('/hub/leden');
}

interface Partner { id: string; naam: string; categorie: string; wat: string | null; voordeel: string | null; code: string | null; url: string | null }
interface Sessie { id: string; titel: string; tekst: string | null; datum: string; plaats: string | null }
interface Brief { id: string; titel: string; tekst: string; datum: string }
interface Draad { id: string; titel: string | null; auteur_naam: string; created_at: string }

export default async function Leden({ searchParams }: { searchParams: Promise<{ fout?: string }> }) {
  const sp = await searchParams;
  const { sb, user, profiel, beheerder } = await hubSessie();
  if (!user) redirect('/hub/inloggen?naar=/hub/leden');

  if (!profiel) {
    return (
      <>
        <section className="held">
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 760 }}>
            <span className="boven">moroww hub · aanvraag</span>
            <h1 className="titel-1">nog even <i>voorstellen.</i></h1>
            <p className="inleiding">Je bent ingelogd als {user.email}. Vertel ons wie je bent; we kijken je aanvraag na en laten je weten wanneer je toegang hebt.</p>
          </div>
        </section>
        <Sectie>
          <form action={vraagAan} className="hub-form" style={{ maxWidth: 720 }}>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="naam">naam</label><input id="naam" name="naam" required autoComplete="name" /></div>
              <div className="veld">
                <label htmlFor="soort">ik ben</label>
                <select id="soort" name="soort" defaultValue="eigenaar">
                  <option value="eigenaar">eigenaar of host</option>
                  <option value="property-manager">property manager</option>
                  <option value="partner">een merk of vakman</option>
                </select>
              </div>
            </div>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="huis">je huis of je portefeuille</label><input id="huis" name="huis" placeholder="naam en gemeente" /></div>
              <div className="veld"><label htmlFor="bedrijf">bedrijf</label><input id="bedrijf" name="bedrijf" /></div>
            </div>
            <div className="veld"><label htmlFor="telefoon">telefoon</label><input id="telefoon" name="telefoon" type="tel" autoComplete="tel" /></div>
            <div className="veld"><label htmlFor="bericht">waarom de hub?</label><textarea id="bericht" name="bericht" /></div>
            {sp.fout === 'naam' ? <p className="hub-fout">Vul je naam in.</p> : null}
            {sp.fout === 'opslaan' ? <p className="hub-fout">Opslaan lukte niet. Probeer het opnieuw, of mail ons.</p> : null}
            <button type="submit" className="btn btn-primair">verstuur mijn aanvraag</button>
          </form>
        </Sectie>
      </>
    );
  }

  if (profiel.status !== 'actief') {
    const geweigerd = profiel.status === 'geweigerd';
    return (
      <section className="held" style={{ minHeight: '60vh' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 760 }}>
          <span className="boven">moroww hub · aanvraag</span>
          <h1 className="titel-1">{geweigerd ? <>nog <i>niet.</i></> : <>bedankt, <i>{profiel.naam.split(' ')[0]}.</i></>}</h1>
          <p className="inleiding">
            {geweigerd
              ? 'We kunnen je aanvraag nu niet goedkeuren. Wil je weten waarom, of is er iets veranderd? Mail ons op info@moroww.com.'
              : 'We kijken je aanvraag na en laten je per mail weten wanneer je toegang hebt. Meestal binnen enkele werkdagen.'}
          </p>
          <form action="/hub/uitloggen" method="post"><button type="submit" className="btn btn-lijn">uitloggen</button></form>
        </div>
      </section>
    );
  }

  const nu = new Date().toISOString();
  const [{ data: partners }, { data: sessies }, { data: mijn }, { data: brieven }, { data: draden }] = await Promise.all([
    sb.from('hub_partners').select('id,naam,categorie,wat,voordeel,code,url').eq('status', 'live').order('categorie').order('naam'),
    sb.from('hub_sessies').select('id,titel,tekst,datum,plaats').gte('datum', nu).order('datum').limit(6),
    sb.from('hub_inschrijvingen').select('sessie_id').eq('profiel_id', user.id),
    sb.from('hub_ledenbrieven').select('id,titel,tekst,datum').order('datum', { ascending: false }).limit(3),
    sb.from('hub_berichten').select('id,titel,auteur_naam,created_at').is('parent_id', null).order('created_at', { ascending: false }).limit(5),
  ]);
  const ingeschreven = new Set((mijn ?? []).map((m: { sessie_id: string }) => m.sessie_id));

  return (
    <>
      <LedenNav actief="overzicht" partner={profiel.rol === 'partner'} beheerder={beheerder} />
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="boven">moroww hub · ledenzone</span>
          <h1 className="titel-1">dag {profiel.naam.split(' ')[0]}, <i>welkom.</i></h1>
          <p className="inleiding">Je voordelen bij de partners, de volgende academy-sessies, de ledenbrief en wat andere leden vragen.</p>
        </div>
      </section>

      <Sectie id="voordelen">
        <Kop boven="partners" titel={<>jouw <i>voordelen.</i></>} tekst="Toon de code of vermeld moroww hub bij je bestelling." />
        {(partners as Partner[] | null)?.length ? (
          <div className="raster">
            {(partners as Partner[]).map((p) => (
              <div key={p.id} className="kaart">
                <span className="kaart-label">{categorieNaam[p.categorie] ?? p.categorie}</span>
                <h3 className="kaart-titel" style={{ fontSize: 24 }}>{p.naam}</h3>
                {p.wat ? <p>{p.wat}</p> : null}
                <p style={{ color: 'var(--ink)' }}>{p.voordeel || 'Voordeel voor leden: binnenkort.'}</p>
                {p.code ? <span className="hub-code">{p.code}</span> : null}
                {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="kaart-voet" style={{ fontSize: 16 }}>naar {p.naam}</a> : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="hub-leeg">De voordelen worden nog afgesproken. Je hoort het in de ledenbrief.</p>
        )}
      </Sectie>

      <Sectie toon="zacht" id="academy">
        <Kop boven="academy" titel={<>de volgende <i>sessies.</i></>} />
        {(sessies as Sessie[] | null)?.length ? (
          <div className="raster-2">
            {(sessies as Sessie[]).map((s) => {
              const ja = ingeschreven.has(s.id);
              return (
                <div key={s.id} className="kaart">
                  <span className="kaart-label">{datumNL(s.datum, true)}{s.plaats ? ` · ${s.plaats}` : ''}</span>
                  <h3 className="kaart-titel" style={{ fontSize: 24 }}>{s.titel}</h3>
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

      <Sectie>
        <div className="raster-2" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Kop boven="ledenbrief" titel={<>wat er <i>verandert.</i></>} />
            {(brieven as Brief[] | null)?.length ? (
              <div className="hub-draad">
                {(brieven as Brief[]).map((b) => (
                  <details key={b.id} className="hub-bericht">
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
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Kop boven="community" titel={<>wat leden <i>vragen.</i></>} />
            {(draden as Draad[] | null)?.length ? (
              <div className="hub-draad">
                {(draden as Draad[]).map((d) => (
                  <Link key={d.id} href={`/hub/leden/community/${d.id}`}>
                    <h3 className="kaart-titel" style={{ fontSize: 22 }}>{d.titel || 'zonder titel'}</h3>
                    <span className="hub-meta">{d.auteur_naam} · {datumNL(d.created_at)}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="hub-leeg">Nog geen vragen. Stel de eerste.</p>
            )}
            <Link href="/hub/leden/community" className="btn btn-lijn" style={{ alignSelf: 'flex-start' }}>naar de community</Link>
          </div>
        </div>
      </Sectie>
    </>
  );
}
