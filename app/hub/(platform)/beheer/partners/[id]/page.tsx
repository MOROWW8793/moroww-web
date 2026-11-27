import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { eisBeheer } from '@/lib/hub/beheer';
import { tekst, categorieNaam } from '@/lib/hub/supabase';
import { geldigEmail, basisUrl } from '@/lib/hub/toegang';
import { mailUitnodiging } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'beheer · partner', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface PartnerRij {
  id: string; naam: string; categorie: string; soort: string; status: string; eigenaar: string | null;
  wat: string | null; voordeel: string | null; code: string | null; url: string | null; plek: string | null;
  vak: string | null; regio: string | null; postcode: string | null; telefoon: string | null;
  email: string | null; kanaal: string; preferred: boolean;
}

// Alles aan een partner aanpassen, ook de fiche van een partner met login.
async function bewaar(formData: FormData) {
  'use server';
  const id = tekst(formData.get('id'), 60);
  const { db } = await eisBeheer(`/hub/beheer/partners/${id}`);
  const naam = tekst(formData.get('naam'), 120);
  const email = tekst(formData.get('email'), 200).toLowerCase();
  if (!naam) redirect(`/hub/beheer/partners/${id}?fout=naam`);
  if (email && !geldigEmail(email)) redirect(`/hub/beheer/partners/${id}?fout=email`);
  const cat = tekst(formData.get('categorie'), 20);
  const { error } = await db
    .from('hub_partners')
    .update({
      naam,
      categorie: Object.keys(categorieNaam).includes(cat) ? cat : 'huis',
      soort: formData.get('soort') === 'merk' ? 'merk' : 'dienst',
      status: formData.get('status') === 'live' ? 'live' : 'concept',
      wat: tekst(formData.get('wat'), 300) || null,
      voordeel: tekst(formData.get('voordeel'), 300) || null,
      code: tekst(formData.get('code'), 60) || null,
      url: tekst(formData.get('url'), 300) || null,
      plek: tekst(formData.get('plek'), 80) || null,
      vak: tekst(formData.get('vak'), 80) || null,
      regio: tekst(formData.get('regio'), 120) || null,
      postcode: tekst(formData.get('postcode'), 10) || null,
      telefoon: tekst(formData.get('telefoon'), 40) || null,
      email: email || null,
      preferred: formData.get('preferred') === 'ja',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  revalidatePath('/hub/beheer');
  redirect(`/hub/beheer/partners/${id}?${error ? 'fout=opslaan' : 'bewaard=1'}`);
}

// Maakt een login voor de partner, koppelt die aan zijn fiche en stuurt de uitnodiging.
async function geefLogin(formData: FormData) {
  'use server';
  const id = tekst(formData.get('id'), 60);
  const terug = `/hub/beheer/partners/${id}`;
  const { db } = await eisBeheer(terug);
  const { data } = await db.from('hub_partners').select('id,naam,email,eigenaar').eq('id', id).maybeSingle();
  const p = data as { id: string; naam: string; email: string | null; eigenaar: string | null } | null;
  if (!p) redirect('/hub/beheer');
  if (p.eigenaar) redirect(`${terug}?login=bestaat`);
  if (!p.email || !geldigEmail(p.email)) redirect(`${terug}?fout=email`);
  const email = p.email.toLowerCase();

  let userId: string | null = null;
  const { data: prof } = await db.from('hub_profielen').select('id,rol').eq('email', email).maybeSingle();
  if (prof) {
    // Eén account heeft één rol: een lid kan niet tegelijk partner zijn met hetzelfde adres.
    if (prof.rol !== 'partner') redirect(`${terug}?fout=lid`);
    userId = prof.id as string;
    await db.from('hub_profielen').update({ status: 'actief' }).eq('id', userId);
  } else {
    const { data: nieuw } = await db.auth.admin.createUser({ email, email_confirm: true });
    userId = nieuw?.user?.id ?? null;
    if (!userId) {
      // Het adres had al een account zonder profiel.
      const { data: lijst } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
      userId = lijst?.users.find((u) => u.email?.toLowerCase() === email)?.id ?? null;
    }
    if (!userId) redirect(`${terug}?fout=login`);
    const { error } = await db.from('hub_profielen').insert({ id: userId, email, naam: p.naam, rol: 'partner', soort: 'partner', status: 'actief', bedrijf: p.naam });
    if (error) redirect(`${terug}?fout=login`);
  }

  // Een account beheert één fiche.
  const { data: al } = await db.from('hub_partners').select('id').eq('eigenaar', userId).maybeSingle();
  if (al && al.id !== id) redirect(`${terug}?fout=fiche`);
  await db.from('hub_partners').update({ eigenaar: userId, kanaal: 'login' }).eq('id', id);
  await mailUitnodiging(email, p.naam, `${await basisUrl()}/hub/inloggen?link=1&naar=/hub/partner`);
  revalidatePath('/hub/beheer');
  redirect(`${terug}?login=ok`);
}

const fouten: Record<string, string> = {
  naam: 'Vul een naam in.',
  email: 'Vul eerst een geldig e-mailadres in en bewaar.',
  opslaan: 'Opslaan lukte niet. Probeer het opnieuw.',
  lid: 'Dit adres is al een lid van de hub. Gebruik voor de partner een ander adres.',
  login: 'De login kon niet gemaakt worden. Probeer het opnieuw.',
  fiche: 'Dit adres beheert al een andere fiche.',
};

export default async function PartnerBewerken({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ bewaard?: string; fout?: string; login?: string }> }) {
  const { id } = await params;
  const sp = await searchParams;
  const { db } = await eisBeheer(`/hub/beheer/partners/${id}`);
  const { data } = await db.from('hub_partners').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  const p = data as PartnerRij;

  return (
    <>
      <Sectie>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/hub/beheer" className="hub-meta">terug naar leden, partners, academy</Link>
          <Kop boven="partner" titel={p.naam} />
        </div>
        <form action={bewaar} className="hub-form" style={{ maxWidth: 'none', marginTop: 24 }}>
          <input type="hidden" name="id" value={p.id} />
          <div className="rij-velden">
            <div className="veld"><label htmlFor="naam">naam</label><input id="naam" name="naam" required defaultValue={p.naam} /></div>
            <div className="veld"><label htmlFor="soort">soort</label><select id="soort" name="soort" defaultValue={p.soort}><option value="dienst">dienst (vakman)</option><option value="merk">merk (product in het huis)</option></select></div>
            <div className="veld"><label htmlFor="status">status</label><select id="status" name="status" defaultValue={p.status}><option value="concept">concept</option><option value="live">live</option></select></div>
          </div>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="vak">vak</label><input id="vak" name="vak" defaultValue={p.vak ?? ''} placeholder="ramen, loodgieter, schoonmaak" /></div>
            <div className="veld"><label htmlFor="regio">regio</label><input id="regio" name="regio" defaultValue={p.regio ?? ''} /></div>
            <div className="veld"><label htmlFor="postcode">postcode</label><input id="postcode" name="postcode" defaultValue={p.postcode ?? ''} inputMode="numeric" /></div>
          </div>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="email">e-mail voor opdrachten</label><input id="email" name="email" type="email" defaultValue={p.email ?? ''} /></div>
            <div className="veld"><label htmlFor="telefoon">telefoon (alleen voor moroww)</label><input id="telefoon" name="telefoon" type="tel" defaultValue={p.telefoon ?? ''} /></div>
            <div className="veld"><label htmlFor="preferred">voorrang</label><select id="preferred" name="preferred" defaultValue={p.preferred ? 'ja' : 'nee'}><option value="nee">gewone partner</option><option value="ja">preferred partner</option></select></div>
          </div>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="categorie">categorie</label><select id="categorie" name="categorie" defaultValue={p.categorie}>{Object.entries(categorieNaam).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
            <div className="veld"><label htmlFor="wat">wat</label><input id="wat" name="wat" defaultValue={p.wat ?? ''} /></div>
            <div className="veld"><label htmlFor="plek">merk: waar in het huis</label><input id="plek" name="plek" defaultValue={p.plek ?? ''} /></div>
          </div>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="voordeel">voordeel</label><input id="voordeel" name="voordeel" defaultValue={p.voordeel ?? ''} /></div>
            <div className="veld"><label htmlFor="code">code</label><input id="code" name="code" defaultValue={p.code ?? ''} /></div>
            <div className="veld"><label htmlFor="url">website</label><input id="url" name="url" type="url" defaultValue={p.url ?? ''} /></div>
          </div>
          {sp.bewaard ? <p className="plat-ok">Bewaard.</p> : null}
          {sp.fout ? <p className="hub-fout">{fouten[sp.fout] ?? 'Er ging iets mis.'}</p> : null}
          <button type="submit" className="btn btn-primair">bewaar</button>
        </form>
      </Sectie>

      <Sectie toon="zacht">
        <Kop boven="login" titel={p.eigenaar ? 'deze partner heeft een login.' : 'opdrachten komen binnen via mail.'} />
        {p.eigenaar ? (
          <p style={{ maxWidth: 720 }}>De partner logt in met {p.email ?? 'zijn e-mailadres'}, ziet zijn opdrachten in het portaal en past zijn fiche zelf aan. Opdrachten komen ook nog per mail.</p>
        ) : (
          <form action={geefLogin} className="hub-form" style={{ maxWidth: 720 }}>
            <input type="hidden" name="id" value={p.id} />
            <p style={{ margin: 0 }}>Zonder login krijgt de partner elke opdracht per mail en antwoordt hij via de link. Met een login ziet hij daarnaast al zijn opdrachten in het portaal.</p>
            <p className="klein" style={{ margin: 0 }}>{p.email ? `De uitnodiging gaat naar ${p.email}.` : 'Vul hierboven eerst een e-mailadres in en bewaar.'}</p>
            <button type="submit" className="btn btn-primair" disabled={!p.email}>geef een login en stuur de uitnodiging</button>
          </form>
        )}
        {sp.login === 'ok' ? <p className="plat-ok" style={{ maxWidth: 720 }}>De login is gemaakt en de uitnodiging is verstuurd.</p> : null}
        {sp.login === 'bestaat' ? <p className="plat-ok" style={{ maxWidth: 720 }}>Deze partner had al een login.</p> : null}
      </Sectie>
    </>
  );
}
