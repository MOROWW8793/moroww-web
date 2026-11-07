import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { LedenNav } from '@/components/hub/LedenNav';
import { hubSessie, tekst, categorieNaam } from '@/lib/hub/supabase';
import { meldBeheer } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'partnerportaal', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface Fiche { id: string; naam: string; categorie: string; wat: string | null; voordeel: string | null; code: string | null; url: string | null; contact: string | null; status: string }
interface Product { id: string; naam: string; tekst: string | null; foto: string | null; url: string | null; status: string }

function velden(f: FormData) {
  const cat = tekst(f.get('categorie'), 20);
  return {
    naam: tekst(f.get('naam'), 120),
    categorie: Object.keys(categorieNaam).includes(cat) ? cat : 'huis',
    wat: tekst(f.get('wat'), 300) || null,
    voordeel: tekst(f.get('voordeel'), 300) || null,
    code: tekst(f.get('code'), 60) || null,
    url: tekst(f.get('url'), 300) || null,
    contact: tekst(f.get('contact'), 200) || null,
  };
}

async function bewaarFiche(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await hubSessie();
  if (!user || profiel?.status !== 'actief' || profiel.rol !== 'partner') redirect('/hub/leden');
  const v = velden(formData);
  if (!v.naam) redirect('/hub/partner?fout=naam');
  const id = tekst(formData.get('id'), 60);
  if (id) {
    await sb.from('hub_partners').update({ ...v, updated_at: new Date().toISOString() }).eq('id', id).eq('eigenaar', user.id);
  } else {
    await sb.from('hub_partners').insert({ ...v, eigenaar: user.id, status: 'concept' });
    await meldBeheer(`nieuwe partnerfiche · ${v.naam}`, [['partner', profiel.naam], ['wat', v.wat ?? ''], ['voordeel', v.voordeel ?? '']]);
  }
  revalidatePath('/hub/partner');
  redirect('/hub/partner?bewaard=1');
}

async function productToevoegen(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await hubSessie();
  if (!user || profiel?.status !== 'actief' || profiel.rol !== 'partner') redirect('/hub/leden');
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
  const { sb, user, profiel, beheerder } = await hubSessie();
  if (!user) redirect('/hub/inloggen?naar=/hub/partner');
  if (profiel?.status !== 'actief' || profiel.rol !== 'partner') redirect('/hub/leden');

  const { data: fiche } = await sb.from('hub_partners').select('*').eq('eigenaar', user.id).maybeSingle();
  const f = fiche as Fiche | null;
  const { data: producten } = f ? await sb.from('hub_producten').select('*').eq('partner_id', f.id).order('created_at') : { data: [] };

  return (
    <>
      <LedenNav actief="partner" partner beheerder={beheerder} />
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="boven">moroww hub · partnerportaal</span>
          <h1 className="titel-1">jouw fiche <i>in de hub.</i></h1>
          <p className="inleiding">Wat leden over je zien: wat je doet, je voordeel en je code. Wijzigingen staan meteen online; een nieuwe fiche of een nieuw product zetten wij live na een korte controle.</p>
        </div>
      </section>

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
            <div className="rij-velden">
              <div className="veld"><label htmlFor="voordeel">voordeel voor leden</label><input id="voordeel" name="voordeel" defaultValue={f?.voordeel ?? ''} placeholder="bv. 10% op je eerste bestelling" /></div>
              <div className="veld"><label htmlFor="code">kortingscode</label><input id="code" name="code" defaultValue={f?.code ?? ''} /></div>
            </div>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="url">website</label><input id="url" name="url" type="url" defaultValue={f?.url ?? ''} /></div>
              <div className="veld"><label htmlFor="contact">contact voor leden</label><input id="contact" name="contact" defaultValue={f?.contact ?? profiel.email} /></div>
            </div>
            {sp.fout === 'naam' ? <p className="hub-fout">Vul een naam in.</p> : null}
            <button type="submit" className="btn btn-primair">{f ? 'bewaar' : 'maak mijn fiche'}</button>
          </form>
        </div>
      </Sectie>

      {f ? (
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
