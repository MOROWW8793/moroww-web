import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import Link from 'next/link';
import { hubSessie, hubBeheerClient, tekst, categorieNaam, type Profiel } from '@/lib/hub/supabase';
import { soortLabel, kort } from '@/lib/hub/vragen';
import { opdrachtStatusNaam, opdrachtKleur, type OpdrachtStatus } from '@/lib/hub/opdrachten';
import { meldBeheer } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'partnerportaal', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface Fiche { id: string; naam: string; categorie: string; soort: string; plek: string | null; wat: string | null; voordeel: string | null; code: string | null; url: string | null; contact: string | null; status: string }
interface Product { id: string; naam: string; tekst: string | null; foto: string | null; url: string | null; status: string }

// Een merk dat zich aanmeldde, vult zijn fiche al aan terwijl beheer de aanmelding nakijkt.
function magPortaal(p: Profiel | null): p is Profiel {
  return p?.rol === 'partner' && p.status !== 'geweigerd';
}

function velden(f: FormData) {
  const cat = tekst(f.get('categorie'), 20);
  return {
    naam: tekst(f.get('naam'), 120),
    categorie: Object.keys(categorieNaam).includes(cat) ? cat : 'huis',
    wat: tekst(f.get('wat'), 300) || null,
    // Alleen de fiche van een merk heeft dit veld; anders blijft de kolom ongemoeid.
    ...(f.has('plek') ? { plek: tekst(f.get('plek'), 80) || null } : {}),
    voordeel: tekst(f.get('voordeel'), 300) || null,
    code: tekst(f.get('code'), 60) || null,
    url: tekst(f.get('url'), 300) || null,
    contact: tekst(f.get('contact'), 200) || null,
  };
}

async function bewaarFiche(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await hubSessie();
  if (!user || !magPortaal(profiel)) redirect('/hub/leden');
  const v = velden(formData);
  if (!v.naam) redirect('/hub/partner?fout=naam');
  const id = tekst(formData.get('id'), 60);
  if (id) {
    const { error } = await sb.from('hub_partners').update({ ...v, updated_at: new Date().toISOString() }).eq('id', id).eq('eigenaar', user.id);
    if (error) redirect('/hub/partner?fout=opslaan');
  } else {
    const { error } = await sb.from('hub_partners').insert({ ...v, eigenaar: user.id, status: 'concept' });
    if (error) redirect('/hub/partner?fout=opslaan');
    await meldBeheer(`nieuwe partnerfiche · ${v.naam}`, [['partner', profiel.naam], ['wat', v.wat ?? ''], ['voordeel', v.voordeel ?? '']]);
  }
  revalidatePath('/hub/partner');
  redirect('/hub/partner?bewaard=1');
}

async function productToevoegen(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await hubSessie();
  if (!user || !magPortaal(profiel)) redirect('/hub/leden');
  const partner = tekst(formData.get('partner'), 60);
  const naam = tekst(formData.get('naam'), 120);
  if (!naam) redirect('/hub/partner?fout=product');
  await sb.from('hub_producten').insert({
    partner_id: partner,
    naam,
    tekst: tekst(formData.get('tekst'), 400) || null,
    foto: tekst(formData.get('foto'), 400) || null,
    url: tekst(formData.get('url'), 400) || null,
    status: 'concept',
  });
  await meldBeheer(`nieuw product voor de market · ${naam}`, [['partner', profiel.naam]]);
  revalidatePath('/hub/partner');
}

async function productWeg(formData: FormData) {
  'use server';
  const { sb, user } = await hubSessie();
  if (!user) redirect('/hub/inloggen');
  await sb.from('hub_producten').delete().eq('id', tekst(formData.get('id'), 60));
  revalidatePath('/hub/partner');
}

export default async function PartnerPortaal({ searchParams }: { searchParams: Promise<{ bewaard?: string; fout?: string }> }) {
  const sp = await searchParams;
  const { sb, user, profiel } = await hubSessie();
  if (!user) redirect('/hub/inloggen?naar=/hub/partner');
  if (!magPortaal(profiel)) redirect('/hub/leden');
  const wacht = profiel.status !== 'actief';

  const { data: fiche } = await sb.from('hub_partners').select('id,naam,categorie,soort,plek,wat,voordeel,code,url,contact,status').eq('eigenaar', user.id).maybeSingle();
  const f = fiche as Fiche | null;
  // De opdrachten van deze partner. De vraag zelf is van de eigenaar, dus die lezen we via de service role.
  const { data: ops } = f
    ? await hubBeheerClient().from('hub_opdrachten').select('id,token,status,verstuurd_om,hub_vragen(huis,soort,wat)').eq('partner_id', f.id).order('verstuurd_om', { ascending: false }).limit(30)
    : { data: [] };
  const opdrachten = (ops ?? []) as unknown as { id: string; token: string; status: OpdrachtStatus; verstuurd_om: string; hub_vragen: { huis: string; soort: string; wat: string } | null }[];
  const { data: producten } = f ? await sb.from('hub_producten').select('*').eq('partner_id', f.id).order('created_at') : { data: [] };

  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="boven">moroww hub · partnerportaal</span>
          <h1 className="titel-1">{f?.soort === 'dienst' ? <>opdrachten en <i>fiche.</i></> : <>jouw fiche <i>in de hub.</i></>}</h1>
          <p className="inleiding">{f?.soort === 'dienst' ? 'De opdrachten die moroww je stuurt, en je fiche: wat je doet en in welke regio. Andere partners zien je fiche niet.' : 'Wat leden over je zien: wat je doet, je voordeel en je code. Wijzigingen staan meteen online; een nieuwe fiche of een nieuw product zetten wij live na een korte controle.'}</p>
          {wacht ? (
            <>
              <p className="inleiding">We kijken je aanmelding na en laten je per mail weten wanneer je merk in de hub staat. Intussen kan je je fiche aanvullen en producten toevoegen.</p>
              <form action="/hub/uitloggen" method="post"><button type="submit" className="btn btn-lijn">uitloggen</button></form>
            </>
          ) : null}
        </div>
      </section>

      {opdrachten.length ? (
        <Sectie>
          <Kop boven="opdrachten" titel="wat moroww je stuurde." />
          <ul style={{ margin: '24px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 820 }}>
            {opdrachten.map((o) => (
              <li key={o.id} className="kaart" style={{ gap: 8 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span className="kaart-label">{o.hub_vragen ? `${soortLabel(o.hub_vragen.soort)} · ${o.hub_vragen.huis}` : 'opdracht'} · {kort(o.verstuurd_om)}</span>
                  <span className={`hub-label ${opdrachtKleur[o.status]}`}>{opdrachtStatusNaam[o.status]}</span>
                </div>
                {o.hub_vragen ? <p style={{ margin: 0 }}>{o.hub_vragen.wat}</p> : null}
                <Link href={`/hub/opdracht/${o.token}`} className="hub-meta">{o.status === 'verstuurd' ? 'bekijk en antwoord' : 'bekijk de opdracht'}</Link>
              </li>
            ))}
          </ul>
        </Sectie>
      ) : null}

      <Sectie>
        <div className="rij">
          <div className="smal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Kop boven="je fiche" titel={f ? <>{f.naam}</> : <>nieuwe <i>fiche.</i></>} />
            {f ? <span className={`hub-label ${f.status === 'live' ? 'live' : ''}`}>{f.status === 'live' ? 'live bij de leden' : 'wacht op controle'}</span> : null}
            {sp.bewaard ? <p className="klein" style={{ margin: 0 }}>Bewaard.</p> : null}
          </div>
          <form action={bewaarFiche} className="hub-form breed" style={{ maxWidth: 720 }}>
            <input type="hidden" name="id" value={f?.id ?? ''} />
            <div className="rij-velden">
              <div className="veld"><label htmlFor="naam">naam</label><input id="naam" name="naam" required defaultValue={f?.naam ?? profiel.bedrijf ?? ''} /></div>
              <div className="veld">
                <label htmlFor="categorie">categorie</label>
                <select id="categorie" name="categorie" defaultValue={f?.categorie ?? 'huis'}>
                  {Object.entries(categorieNaam).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="veld"><label htmlFor="wat">wat je doet, in één zin</label><input id="wat" name="wat" defaultValue={f?.wat ?? ''} /></div>
            {f?.soort === 'merk' ? <div className="veld"><label htmlFor="plek">waar in het huis staat je product</label><input id="plek" name="plek" defaultValue={f.plek ?? ''} placeholder="in de badkamer" /></div> : null}
            <div className="rij-velden">
              <div className="veld"><label htmlFor="voordeel">voordeel voor leden</label><input id="voordeel" name="voordeel" defaultValue={f?.voordeel ?? ''} placeholder="bv. 10% op je eerste bestelling" /></div>
              <div className="veld"><label htmlFor="code">kortingscode</label><input id="code" name="code" defaultValue={f?.code ?? ''} /></div>
            </div>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="url">website</label><input id="url" name="url" type="url" defaultValue={f?.url ?? ''} /></div>
              <div className="veld"><label htmlFor="contact">contact voor leden</label><input id="contact" name="contact" defaultValue={f?.contact ?? profiel.email} /></div>
            </div>
            {sp.fout === 'naam' ? <p className="hub-fout">Vul een naam in.</p> : null}
            {sp.fout === 'opslaan' ? <p className="hub-fout">Bewaren lukte niet. Probeer het opnieuw, of mail ons op info@moroww.com.</p> : null}
            <button type="submit" className="btn btn-primair">{f ? 'bewaar' : 'maak mijn fiche'}</button>
          </form>
        </div>
      </Sectie>

      {f?.soort === 'merk' ? (
        <Sectie toon="zacht">
          <Kop boven="market" titel={<>je producten <i>voor gasten.</i></>} tekst="Producten die gasten in een moroww-huis tegenkomen en thuis willen. De knop op de market leidt naar jouw webshop." />
          <div className="rij">
            <div className="breed hub-tabel-wrap">
              {(producten as Product[] | null)?.length ? (
                <table className="hub-tabel">
                  <thead><tr><th>product</th><th>link</th><th>status</th><th></th></tr></thead>
                  <tbody>
                    {(producten as Product[]).map((p) => (
                      <tr key={p.id}>
                        <td>{p.naam}{p.tekst ? <><br /><span className="hub-meta">{p.tekst}</span></> : null}</td>
                        <td>{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer">webshop</a> : '—'}</td>
                        <td><span className={`hub-label ${p.status === 'live' ? 'live' : ''}`}>{p.status === 'live' ? 'live' : 'wacht op controle'}</span></td>
                        <td><form action={productWeg}><input type="hidden" name="id" value={p.id} /><button className="hub-knopklein" type="submit">verwijder</button></form></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="hub-leeg">Nog geen producten.</p>
              )}
            </div>
            <form action={productToevoegen} className="hub-form smal">
              <input type="hidden" name="partner" value={f.id} />
              <label htmlFor="p-naam">product</label><input id="p-naam" name="naam" required />
              <label htmlFor="p-tekst">korte uitleg</label><input id="p-tekst" name="tekst" />
              <label htmlFor="p-foto">link naar een foto</label><input id="p-foto" name="foto" type="url" />
              <label htmlFor="p-url">link naar je webshop</label><input id="p-url" name="url" type="url" />
              {sp.fout === 'product' ? <p className="hub-fout">Vul een productnaam in.</p> : null}
              <button type="submit" className="btn btn-primair">voeg toe</button>
            </form>
          </div>
        </Sectie>
      ) : null}
    </>
  );
}
