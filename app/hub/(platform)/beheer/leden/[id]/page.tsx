import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { eisBeheer } from '@/lib/hub/beheer';
import { tekst, soortNaam, datumNL, type Profiel } from '@/lib/hub/supabase';
import { huisVelden, huisRegels, type Huis } from '@/lib/hub/huizen';
import { HuisVelden } from '@/components/hub/HuisVelden';

export const metadata: Metadata = { title: 'beheer · lid', robots: { index: false } };
export const dynamic = 'force-dynamic';

const pad = (id: string) => `/hub/beheer/leden/${id}`;

// Het profiel van een lid of partner aanpassen. Het e-mailadres is de login en blijft staan.
async function bewaar(formData: FormData) {
  'use server';
  const id = tekst(formData.get('id'), 60);
  const { db } = await eisBeheer(pad(id));
  const naam = tekst(formData.get('naam'), 120);
  if (!naam) redirect(`${pad(id)}?fout=naam`);
  const soort = tekst(formData.get('soort'), 30);
  const status = tekst(formData.get('status'), 20);
  const { error } = await db
    .from('hub_profielen')
    .update({
      naam,
      soort: ['eigenaar', 'property-manager', 'partner'].includes(soort) ? soort : 'eigenaar',
      status: ['aangevraagd', 'actief', 'geweigerd'].includes(status) ? status : 'aangevraagd',
      huis: tekst(formData.get('huis'), 160) || null,
      bedrijf: tekst(formData.get('bedrijf'), 160) || null,
      telefoon: tekst(formData.get('telefoon'), 40) || null,
    })
    .eq('id', id);
  if (error) redirect(`${pad(id)}?fout=opslaan`);
  revalidatePath('/hub/beheer');
  redirect(`${pad(id)}?bewaard=1`);
}

async function bewaarHuis(formData: FormData) {
  'use server';
  const lid = tekst(formData.get('lid'), 60);
  const { db } = await eisBeheer(pad(lid));
  const v = huisVelden(formData);
  if (!v.naam || !v.adres || !v.postcode || !v.gemeente) redirect(`${pad(lid)}?fout=huis`);
  const id = tekst(formData.get('id'), 60);
  const { error } = id
    ? await db.from('hub_huizen').update({ ...v, updated_at: new Date().toISOString() }).eq('id', id).eq('profiel_id', lid)
    : await db.from('hub_huizen').insert({ ...v, profiel_id: lid });
  if (error) redirect(`${pad(lid)}?fout=opslaan`);
  redirect(`${pad(lid)}?bewaard=1`);
}

async function verwijderHuis(formData: FormData) {
  'use server';
  const lid = tekst(formData.get('lid'), 60);
  const { db } = await eisBeheer(pad(lid));
  await db.from('hub_huizen').delete().eq('id', tekst(formData.get('id'), 60)).eq('profiel_id', lid);
  redirect(`${pad(lid)}?bewaard=1`);
}

const fouten: Record<string, string> = {
  naam: 'Vul een naam in.',
  huis: 'Vul de naam, het adres, de postcode en de gemeente van het huis in.',
  opslaan: 'Opslaan lukte niet. Probeer het opnieuw.',
};

export default async function LidBewerken({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ bewaard?: string; fout?: string }> }) {
  const { id } = await params;
  const sp = await searchParams;
  const { db } = await eisBeheer(pad(id));
  const { data } = await db.from('hub_profielen').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  const p = data as Profiel;
  const partner = p.rol === 'partner';
  const [{ data: hzn }, { data: fiche }, { count }] = await Promise.all([
    db.from('hub_huizen').select('*').eq('profiel_id', id).order('naam'),
    db.from('hub_partners').select('id,naam').eq('eigenaar', id).maybeSingle(),
    db.from('hub_vragen').select('id', { count: 'exact', head: true }).eq('eigenaar', id),
  ]);
  const huizen = (hzn ?? []) as Huis[];

  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/hub/beheer" className="hub-meta">terug naar leden, partners, academy</Link>
          <h1 className="titel-1">{p.naam}</h1>
          <p className="inleiding">{partner ? 'partner' : soortNaam[p.soort] ?? p.soort} · {p.email} · sinds {datumNL(p.created_at)}{partner ? '' : ` · ${count ?? 0} ${count === 1 ? 'vraag' : 'vragen'}`}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
            <Link href={`${pad(id)}/bekijk`} className="hub-knopklein primair">bekijk de hub als {p.naam.split(' ')[0]}</Link>
            {fiche ? <Link href={`/hub/beheer/partners/${fiche.id}`} className="hub-knopklein">bewerk de fiche van {fiche.naam}</Link> : null}
          </div>
          {sp.bewaard ? <p className="plat-ok" style={{ alignSelf: 'flex-start' }}>Bewaard.</p> : null}
          {sp.fout ? <p className="hub-fout" style={{ alignSelf: 'flex-start' }}>{fouten[sp.fout] ?? 'Er ging iets mis.'}</p> : null}
        </div>
      </section>

      <Sectie>
        <Kop boven="profiel" titel="gegevens." tekst="Het e-mailadres is de login en pas je hier niet aan." />
        <form action={bewaar} className="hub-form" style={{ maxWidth: 'none' }}>
          <input type="hidden" name="id" value={p.id} />
          <div className="rij-velden">
            <div className="veld"><label htmlFor="naam">naam</label><input id="naam" name="naam" required defaultValue={p.naam} /></div>
            <div className="veld"><label htmlFor="soort">soort</label>
              <select id="soort" name="soort" defaultValue={p.soort} disabled={partner}>
                {Object.entries(soortNaam).filter(([k]) => partner || k !== 'partner').map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              {partner ? <input type="hidden" name="soort" value="partner" /> : null}
            </div>
            <div className="veld"><label htmlFor="status">toegang</label>
              <select id="status" name="status" defaultValue={p.status}>
                <option value="aangevraagd">aangevraagd</option>
                <option value="actief">actief</option>
                <option value="geweigerd">geen toegang</option>
              </select>
            </div>
          </div>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="huis">huis</label><input id="huis" name="huis" defaultValue={p.huis ?? ''} /></div>
            <div className="veld"><label htmlFor="bedrijf">bedrijf</label><input id="bedrijf" name="bedrijf" defaultValue={p.bedrijf ?? ''} /></div>
            <div className="veld"><label htmlFor="telefoon">telefoon</label><input id="telefoon" name="telefoon" type="tel" defaultValue={p.telefoon ?? ''} /></div>
          </div>
          {p.bericht ? <p className="klein" style={{ margin: 0 }}>Bij de aanvraag: {p.bericht}</p> : null}
          <button type="submit" className="btn btn-primair">bewaar</button>
        </form>
      </Sectie>

      {partner ? null : (
        <Sectie>
          <Kop boven="huizen" titel={huizen.length === 1 ? 'één huis.' : `${huizen.length} huizen.`} tekst="Wat hier staat krijgt de partner bij een opdracht: adres, toegang en contact ter plaatse." />
          {huizen.length ? (
            <div className="raster" style={{ marginBottom: 24 }}>
              {huizen.map((h) => (
                <div key={h.id} className="kaart">
                  <span className="kaart-label">{h.gemeente}</span>
                  <h3 className="kaart-titel">{h.naam}</h3>
                  <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                    {huisRegels(h).map(([k, v]) => (
                      <div key={k}><dt className="hub-meta">{k}</dt><dd style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{v}</dd></div>
                    ))}
                  </dl>
                  <details style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--line)' }}>
                    <summary style={{ cursor: 'pointer', fontSize: 14, minHeight: 40, display: 'flex', alignItems: 'center' }}>pas aan</summary>
                    <form action={bewaarHuis} className="hub-form" style={{ marginTop: 12 }}>
                      <input type="hidden" name="lid" value={p.id} />
                      <input type="hidden" name="id" value={h.id} />
                      <HuisVelden h={h} />
                      <button type="submit" className="btn btn-primair">bewaar</button>
                    </form>
                    <form action={verwijderHuis} style={{ marginTop: 12 }}>
                      <input type="hidden" name="lid" value={p.id} />
                      <input type="hidden" name="id" value={h.id} />
                      <button type="submit" className="hub-knopklein">verwijder dit huis</button>
                    </form>
                  </details>
                </div>
              ))}
            </div>
          ) : null}
          <details>
            <summary style={{ cursor: 'pointer', fontSize: 15, minHeight: 40, display: 'flex', alignItems: 'center' }}>voeg een huis toe voor {p.naam.split(' ')[0]}</summary>
            <form action={bewaarHuis} className="hub-form" style={{ maxWidth: 760, marginTop: 12 }}>
              <input type="hidden" name="lid" value={p.id} />
              <HuisVelden />
              <button type="submit" className="btn btn-primair">voeg het huis toe</button>
            </form>
          </details>
        </Sectie>
      )}
    </>
  );
}
