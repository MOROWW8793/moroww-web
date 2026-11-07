import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import Link from 'next/link';
import { hubSessie, hubBeheerClient, tekst, categorieNaam, soortNaam, datumNL, brusselNaarISO, type Profiel } from '@/lib/hub/supabase';
import { mailLid } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'beheer', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function eisBeheer() {
  const { user, beheerder } = await hubSessie();
  if (!user) redirect('/hub/inloggen?naar=/hub/beheer');
  if (!beheerder) redirect('/hub/leden');
  return hubBeheerClient();
}

async function zetStatus(formData: FormData) {
  'use server';
  const db = await eisBeheer();
  const id = tekst(formData.get('id'), 60);
  const status = tekst(formData.get('status'), 20);
  if (!['actief', 'geweigerd', 'aangevraagd'].includes(status)) return;
  const { data } = await db.from('hub_profielen').update({ status }).eq('id', id).select('email,naam').single();
  if (status === 'actief' && data) await mailLid(data.email, data.naam);
  revalidatePath('/hub/beheer');
}

async function zetPartner(formData: FormData) {
  'use server';
  const db = await eisBeheer();
  const tabel = formData.get('tabel') === 'producten' ? 'hub_producten' : 'hub_partners';
  const status = formData.get('status') === 'live' ? 'live' : 'concept';
  await db.from(tabel).update({ status }).eq('id', tekst(formData.get('id'), 60));
  revalidatePath('/hub/beheer');
}

async function partnerToevoegen(formData: FormData) {
  'use server';
  const db = await eisBeheer();
  const naam = tekst(formData.get('naam'), 120);
  const cat = tekst(formData.get('categorie'), 20);
  if (!naam) return;
  await db.from('hub_partners').insert({
    naam,
    categorie: Object.keys(categorieNaam).includes(cat) ? cat : 'huis',
    wat: tekst(formData.get('wat'), 300) || null,
    voordeel: tekst(formData.get('voordeel'), 300) || null,
    code: tekst(formData.get('code'), 60) || null,
    url: tekst(formData.get('url'), 300) || null,
    soort: formData.get('soort') === 'merk' ? 'merk' : 'dienst',
    vak: tekst(formData.get('vak'), 80) || null,
    regio: tekst(formData.get('regio'), 120) || null,
    telefoon: tekst(formData.get('telefoon'), 40) || null,
    plek: tekst(formData.get('plek'), 80) || null,
    status: 'concept',
  });
  revalidatePath('/hub/beheer');
}

async function zetMerk(formData: FormData) {
  'use server';
  const db = await eisBeheer();
  const status = tekst(formData.get('status'), 20);
  if (['aangevraagd', 'geplaatst', 'gestopt'].includes(status)) await db.from('hub_merk_aanvragen').update({ status }).eq('id', tekst(formData.get('id'), 60));
  revalidatePath('/hub/beheer');
}

async function sessieToevoegen(formData: FormData) {
  'use server';
  const db = await eisBeheer();
  const titel = tekst(formData.get('titel'), 160);
  const datum = brusselNaarISO(tekst(formData.get('datum'), 20));
  if (!titel || !datum) return;
  const plaatsen = Number(tekst(formData.get('plaatsen'), 6)) || null;
  await db.from('hub_sessies').insert({ titel, datum, tekst: tekst(formData.get('tekst'), 600) || null, plaats: tekst(formData.get('plaats'), 160) || null, plaatsen });
  revalidatePath('/hub/beheer');
}

async function briefToevoegen(formData: FormData) {
  'use server';
  const db = await eisBeheer();
  const titel = tekst(formData.get('titel'), 160);
  const inhoud = tekst(formData.get('tekst'), 8000);
  if (!titel || !inhoud) return;
  await db.from('hub_ledenbrieven').insert({ titel, tekst: inhoud });
  revalidatePath('/hub/beheer');
}

async function verwijder(formData: FormData) {
  'use server';
  const db = await eisBeheer();
  const tabellen: Record<string, string> = { sessie: 'hub_sessies', brief: 'hub_ledenbrieven', partner: 'hub_partners', product: 'hub_producten' };
  const tabel = tabellen[tekst(formData.get('soort'), 20)];
  if (tabel) await db.from(tabel).delete().eq('id', tekst(formData.get('id'), 60));
  revalidatePath('/hub/beheer');
}

function Knop({ actie, velden, label, primair }: { actie: (f: FormData) => Promise<void>; velden: Record<string, string>; label: string; primair?: boolean }) {
  return (
    <form action={actie}>
      {Object.entries(velden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <button type="submit" className={`hub-knopklein${primair ? ' primair' : ''}`}>{label}</button>
    </form>
  );
}

export default async function Beheer() {
  const db = await eisBeheer();
  const [{ data: profielen }, { data: partners }, { data: producten }, { data: sessies }, { data: inschrijvingen }, { data: brieven }] = await Promise.all([
    db.from('hub_profielen').select('*').order('created_at', { ascending: false }),
    db.from('hub_partners').select('*').order('naam'),
    db.from('hub_producten').select('*, hub_partners(naam)').order('created_at', { ascending: false }),
    db.from('hub_sessies').select('*').order('datum', { ascending: false }),
    db.from('hub_inschrijvingen').select('sessie_id, hub_profielen(naam,email)'),
    db.from('hub_ledenbrieven').select('*').order('datum', { ascending: false }),
  ]);
  const [{ data: merkAanvragen }, { data: openVragen }] = await Promise.all([
    db.from('hub_merk_aanvragen').select('id,huis,status,created_at,hub_profielen(naam),hub_partners(naam)').order('created_at', { ascending: false }),
    db.from('hub_vragen').select('id').in('status', ['binnen', 'ingepland']),
  ]);
  const alle = (profielen ?? []) as Profiel[];
  const wachtend = alle.filter((p) => p.status === 'aangevraagd');
  const actief = alle.filter((p) => p.status === 'actief');
  type Inschrijving = { sessie_id: string; hub_profielen: { naam: string; email: string } | null };
  const perSessie = new Map<string, string[]>();
  ((inschrijvingen ?? []) as unknown as Inschrijving[]).forEach((i) => {
    const lijst = perSessie.get(i.sessie_id) ?? [];
    if (i.hub_profielen) lijst.push(i.hub_profielen.naam);
    perSessie.set(i.sessie_id, lijst);
  });

  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="boven">moroww hub · beheer</span>
          <h1 className="titel-1">{wachtend.length ? <>{wachtend.length} {wachtend.length === 1 ? 'aanvraag' : 'aanvragen'} <i>wacht.</i></> : <>alles <i>bijgewerkt.</i></>}</h1>
          <p className="inleiding">{actief.length} {actief.length === 1 ? 'actief lid' : 'actieve leden'} · {(partners ?? []).filter((p: { status: string }) => p.status === 'live').length} partners live</p>
        </div>
      </section>

      <Sectie>
        <p style={{ margin: '20px 0 32px' }}>
          <Link href="/hub/beheer/vragen" className="btn btn-primair">{(openVragen ?? []).length} open {(openVragen ?? []).length === 1 ? 'vraag' : 'vragen'} opvolgen</Link>
        </p>
        <Kop boven="aanvragen" titel="wie wil erbij?" />
        {wachtend.length ? (
          <div className="hub-tabel-wrap">
            <table className="hub-tabel">
              <thead><tr><th>naam</th><th>soort</th><th>huis of bedrijf</th><th>bericht</th><th></th></tr></thead>
              <tbody>
                {wachtend.map((p) => (
                  <tr key={p.id}>
                    <td>{p.naam}<br /><span className="hub-meta">{p.email}{p.telefoon ? ` · ${p.telefoon}` : ''}</span></td>
                    <td>{soortNaam[p.soort] ?? p.soort}</td>
                    <td>{[p.huis, p.bedrijf].filter(Boolean).join(' · ') || '—'}</td>
                    <td style={{ maxWidth: 320 }}>{p.bericht || '—'}</td>
                    <td><div style={{ display: 'flex', gap: 8 }}>
                      <Knop actie={zetStatus} velden={{ id: p.id, status: 'actief' }} label="goedkeuren" primair />
                      <Knop actie={zetStatus} velden={{ id: p.id, status: 'geweigerd' }} label="weigeren" />
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="hub-leeg">Geen nieuwe aanvragen.</p>
        )}
      </Sectie>

      <Sectie toon="zacht">
        <Kop boven="partners" titel="fiches en voordelen." tekst="Een fiche op live zetten maakt ze zichtbaar in de ledenzone, met voordeel en code." />
        <div className="hub-tabel-wrap">
          <table className="hub-tabel">
            <thead><tr><th>partner</th><th>soort</th><th>voordeel</th><th>code</th><th>status</th><th></th></tr></thead>
            <tbody>
              {(partners ?? []).map((p: { id: string; naam: string; categorie: string; soort: string; vak: string | null; regio: string | null; plek: string | null; voordeel: string | null; code: string | null; status: string; eigenaar: string | null }) => (
                <tr key={p.id}>
                  <td>{p.naam}{p.eigenaar ? <><br /><span className="hub-meta">beheerd door de partner</span></> : null}</td>
                  <td>{p.soort === 'merk' ? `merk · ${p.plek ?? 'in het huis'}` : [p.vak, p.regio].filter(Boolean).join(' · ') || 'dienst'}</td>
                  <td>{p.voordeel || '—'}</td>
                  <td>{p.code || '—'}</td>
                  <td><span className={`hub-label ${p.status === 'live' ? 'live' : ''}`}>{p.status}</span></td>
                  <td><div style={{ display: 'flex', gap: 8 }}>
                    <Knop actie={zetPartner} velden={{ id: p.id, tabel: 'partners', status: p.status === 'live' ? 'concept' : 'live' }} label={p.status === 'live' ? 'offline' : 'zet live'} primair={p.status !== 'live'} />
                    <Knop actie={verwijder} velden={{ id: p.id, soort: 'partner' }} label="verwijder" />
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form action={partnerToevoegen} className="hub-form" style={{ maxWidth: 'none', marginTop: 32 }}>
          <span className="kaart-label">partner toevoegen zonder login</span>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="pn">naam</label><input id="pn" name="naam" required /></div>
            <div className="veld"><label htmlFor="pc">categorie</label><select id="pc" name="categorie">{Object.entries(categorieNaam).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
            <div className="veld"><label htmlFor="pw">wat</label><input id="pw" name="wat" /></div>
          </div>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="pv">voordeel</label><input id="pv" name="voordeel" /></div>
            <div className="veld"><label htmlFor="pk">code</label><input id="pk" name="code" /></div>
            <div className="veld"><label htmlFor="pu">website</label><input id="pu" name="url" type="url" /></div>
          </div>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="ps">soort</label><select id="ps" name="soort"><option value="dienst">dienst (vakman)</option><option value="merk">merk (product in het huis)</option></select></div>
            <div className="veld"><label htmlFor="pva">vak</label><input id="pva" name="vak" placeholder="ramen, loodgieter, schoonmaak" /></div>
            <div className="veld"><label htmlFor="pr">regio</label><input id="pr" name="regio" /></div>
          </div>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="pt">telefoon (alleen voor moroww)</label><input id="pt" name="telefoon" type="tel" /></div>
            <div className="veld"><label htmlFor="pl">merk: waar in het huis</label><input id="pl" name="plek" placeholder="in de badkamer" /></div>
          </div>
          <button type="submit" className="btn btn-primair">voeg partner toe</button>
        </form>
      </Sectie>

      <Sectie>
        <Kop boven="merken" titel="aangevraagd door eigenaars." />
        {(merkAanvragen ?? []).length ? (
          <div className="hub-tabel-wrap">
            <table className="hub-tabel">
              <thead><tr><th>merk</th><th>eigenaar</th><th>huis</th><th>status</th><th></th></tr></thead>
              <tbody>
                {((merkAanvragen ?? []) as unknown as { id: string; huis: string | null; status: string; hub_profielen: { naam: string } | null; hub_partners: { naam: string } | null }[]).map((m) => (
                  <tr key={m.id}>
                    <td>{m.hub_partners?.naam ?? '—'}</td>
                    <td>{m.hub_profielen?.naam ?? '—'}</td>
                    <td>{m.huis || '—'}</td>
                    <td><span className={`hub-label ${m.status === 'geplaatst' ? 'live' : ''}`}>{m.status}</span></td>
                    <td><div style={{ display: 'flex', gap: 8 }}>
                      {m.status !== 'geplaatst' ? <Knop actie={zetMerk} velden={{ id: m.id, status: 'geplaatst' }} label="geplaatst" primair /> : null}
                      {m.status !== 'gestopt' ? <Knop actie={zetMerk} velden={{ id: m.id, status: 'gestopt' }} label="gestopt" /> : null}
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="hub-leeg">Nog geen merken aangevraagd.</p>
        )}
      </Sectie>

      <Sectie toon="zacht">
        <Kop boven="market" titel="producten van partners." />
        {(producten ?? []).length ? (
          <div className="hub-tabel-wrap">
            <table className="hub-tabel">
              <thead><tr><th>product</th><th>partner</th><th>link</th><th>status</th><th></th></tr></thead>
              <tbody>
                {(producten ?? []).map((p: { id: string; naam: string; url: string | null; status: string; hub_partners: { naam: string } | null }) => (
                  <tr key={p.id}>
                    <td>{p.naam}</td>
                    <td>{p.hub_partners?.naam ?? '—'}</td>
                    <td>{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer">webshop</a> : '—'}</td>
                    <td><span className={`hub-label ${p.status === 'live' ? 'live' : ''}`}>{p.status}</span></td>
                    <td><div style={{ display: 'flex', gap: 8 }}>
                      <Knop actie={zetPartner} velden={{ id: p.id, tabel: 'producten', status: p.status === 'live' ? 'concept' : 'live' }} label={p.status === 'live' ? 'offline' : 'zet live'} primair={p.status !== 'live'} />
                      <Knop actie={verwijder} velden={{ id: p.id, soort: 'product' }} label="verwijder" />
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="hub-leeg">Nog geen producten. Partners voegen ze toe in hun portaal.</p>
        )}
      </Sectie>

      <Sectie toon="zacht">
        <div className="raster-2" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Kop boven="academy" titel="sessies." />
            <form action={sessieToevoegen} className="hub-form">
              <label htmlFor="st">titel</label><input id="st" name="titel" required />
              <div className="rij-velden">
                <div className="veld"><label htmlFor="sd">datum en uur</label><input id="sd" name="datum" type="datetime-local" required /></div>
                <div className="veld"><label htmlFor="sp">plaatsen</label><input id="sp" name="plaatsen" type="number" min="1" /></div>
              </div>
              <label htmlFor="sl">plaats</label><input id="sl" name="plaats" />
              <label htmlFor="sx">korte uitleg</label><textarea id="sx" name="tekst" />
              <button type="submit" className="btn btn-primair">plan de sessie</button>
            </form>
            <div className="hub-draad">
              {(sessies ?? []).map((s: { id: string; titel: string; datum: string; plaats: string | null; plaatsen: number | null }) => {
                const wie = perSessie.get(s.id) ?? [];
                return (
                  <div key={s.id} className="hub-bericht">
                    <span className="hub-meta">{datumNL(s.datum, true)}{s.plaats ? ` · ${s.plaats}` : ''}</span>
                    <h3 className="kaart-titel" style={{ fontSize: 20 }}>{s.titel}</h3>
                    <span className="hub-meta">{wie.length}{s.plaatsen ? ` van ${s.plaatsen}` : ''} ingeschreven{wie.length ? `: ${wie.join(', ')}` : ''}</span>
                    <Knop actie={verwijder} velden={{ id: s.id, soort: 'sessie' }} label="verwijder" />
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Kop boven="ledenbrief" titel="schrijven." />
            <form action={briefToevoegen} className="hub-form">
              <label htmlFor="bt">titel</label><input id="bt" name="titel" required />
              <label htmlFor="bx">tekst</label><textarea id="bx" name="tekst" required style={{ minHeight: 200 }} />
              <button type="submit" className="btn btn-primair">publiceer voor leden</button>
            </form>
            <div className="hub-draad">
              {(brieven ?? []).map((b: { id: string; titel: string; datum: string }) => (
                <div key={b.id} className="hub-bericht">
                  <span className="hub-meta">{datumNL(b.datum)}</span>
                  <h3 className="kaart-titel" style={{ fontSize: 20 }}>{b.titel}</h3>
                  <Knop actie={verwijder} velden={{ id: b.id, soort: 'brief' }} label="verwijder" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sectie>

      <Sectie>
        <Kop boven="leden" titel={`${actief.length} actief.`} />
        <div className="hub-tabel-wrap">
          <table className="hub-tabel">
            <thead><tr><th>naam</th><th>soort</th><th>huis of bedrijf</th><th>sinds</th><th></th></tr></thead>
            <tbody>
              {actief.map((p) => (
                <tr key={p.id}>
                  <td>{p.naam}<br /><span className="hub-meta">{p.email}</span></td>
                  <td>{soortNaam[p.soort] ?? p.soort}</td>
                  <td>{[p.huis, p.bedrijf].filter(Boolean).join(' · ') || '—'}</td>
                  <td>{datumNL(p.created_at)}</td>
                  <td><Knop actie={zetStatus} velden={{ id: p.id, status: 'geweigerd' }} label="toegang intrekken" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sectie>
    </>
  );
}
