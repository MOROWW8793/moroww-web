import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { Kopieer } from '@/components/hub/Kopieer';
import { VraagKaart } from '@/components/hub/VraagKaart';
import { eisBeheer } from '@/lib/hub/beheer';
import { tekst, brusselNaarISO } from '@/lib/hub/supabase';
import { soortLabel, statusNaam, kanaalNaam, wanneer, kort, berichten, fotoLinks, bewaarFoto, type Vraag, type VraagUpdate } from '@/lib/hub/vragen';
import { mailVraag } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'regie · dossier', robots: { index: false } };
export const dynamic = 'force-dynamic';

// Eén plek voor elke stap: toewijzen, update, geregeld, lukt niet. Stuurt de eigenaar een mail als hij lid is.
async function stap(formData: FormData) {
  'use server';
  const id = tekst(formData.get('id'), 60);
  const { db } = await eisBeheer(`/hub/beheer/vragen/${id}`);
  const actie = tekst(formData.get('actie'), 20);
  const bericht = tekst(formData.get('bericht'), 2000);
  const wie = formData.get('wie') === 'partner' ? 'partner' : 'moroww';
  const { data: v } = await db.from('hub_vragen').select('*').eq('id', id).single();
  if (!v) redirect('/hub/beheer/vragen');
  const vraag = v as Vraag;
  const foto = await bewaarFoto(id, formData.get('foto'));
  const wijzig: Partial<Vraag> = {};

  let bericht2 = bericht;
  if (actie === 'inplannen') {
    const partner = tekst(formData.get('partner'), 60) || null;
    wijzig.partner_id = partner;
    wijzig.ingepland_om = brusselNaarISO(tekst(formData.get('om'), 20));
    wijzig.status = 'ingepland';
    if (!bericht2) {
      const { data: p } = partner ? await db.from('hub_partners').select('naam').eq('id', partner).single() : { data: null };
      bericht2 = berichten.ingepland(p?.naam ?? 'Een partner van moroww', wijzig.ingepland_om ?? null);
    }
  }
  if (actie === 'geregeld') {
    wijzig.status = 'geregeld';
    wijzig.geregeld_om = new Date().toISOString();
    if (foto) wijzig.foto = foto;
  }
  if (actie === 'lukt-niet') wijzig.status = 'lukt-niet';
  if (actie === 'heropen') wijzig.status = vraag.partner_id ? 'ingepland' : 'binnen';
  if (Object.keys(wijzig).length) await db.from('hub_vragen').update(wijzig).eq('id', id);

  if (bericht2 || foto) {
    await db.from('hub_vraag_updates').insert({ vraag_id: id, wie, tekst: bericht2 || 'Een foto van het resultaat.', foto });
    if (formData.get('mail') === 'ja' && vraag.eigenaar) {
      const { data: p } = await db.from('hub_profielen').select('email,naam').eq('id', vraag.eigenaar).single();
      if (p) await mailVraag(p.email, p.naam, vraag.huis, bericht2 || 'Er is een foto van het resultaat.', !!foto);
    }
  }
  revalidatePath(`/hub/beheer/vragen/${id}`);
  revalidatePath('/hub/beheer/vragen');
  redirect(`/hub/beheer/vragen/${id}`);
}

async function notitie(formData: FormData) {
  'use server';
  const id = tekst(formData.get('id'), 60);
  const { db } = await eisBeheer(`/hub/beheer/vragen/${id}`);
  const t = tekst(formData.get('tekst'), 2000);
  if (t) await db.from('hub_vraag_notities').insert({ vraag_id: id, tekst: t });
  revalidatePath(`/hub/beheer/vragen/${id}`);
}

async function verwijder(formData: FormData) {
  'use server';
  const id = tekst(formData.get('id'), 60);
  const { db } = await eisBeheer(`/hub/beheer/vragen/${id}`);
  if (formData.get('zeker') === 'ja') {
    await db.from('hub_vragen').delete().eq('id', id);
    redirect('/hub/beheer/vragen');
  }
  redirect(`/hub/beheer/vragen/${id}?verwijder=1`);
}

interface Partner { id: string; naam: string; vak: string | null; regio: string | null; telefoon: string | null; soort: string }

export default async function Dossier({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ verwijder?: string }> }) {
  const { id } = await params;
  const sp = await searchParams;
  const { db } = await eisBeheer(`/hub/beheer/vragen/${id}`);
  const { data: v } = await db.from('hub_vragen').select('*').eq('id', id).maybeSingle();
  if (!v) notFound();
  const vraag = v as Vraag;
  const [{ data: ups }, { data: ptn }, { data: nts }, { data: eig }] = await Promise.all([
    db.from('hub_vraag_updates').select('*').eq('vraag_id', id).order('created_at'),
    db.from('hub_partners').select('id,naam,vak,regio,telefoon,soort').eq('soort', 'dienst').order('naam'),
    db.from('hub_vraag_notities').select('*').eq('vraag_id', id).order('created_at'),
    vraag.eigenaar ? db.from('hub_profielen').select('email,telefoon,naam').eq('id', vraag.eigenaar).maybeSingle() : Promise.resolve({ data: null }),
  ]);
  const updates = (ups ?? []) as VraagUpdate[];
  const partners = (ptn ?? []) as Partner[];
  const partner = partners.find((p) => p.id === vraag.partner_id);
  const fotos = await fotoLinks([vraag.foto, ...updates.map((u) => u.foto)]);
  const eigenaar = eig as { email: string; telefoon: string | null; naam: string } | null;
  const laatste = updates.at(-1)?.tekst ?? '';
  const voornaam = (vraag.eigenaar_naam || eigenaar?.naam || '').split(' ')[0];
  const kopieerTekst = `Dag ${voornaam || ''},\n${laatste}\n\nWarme groet,\nmoroww`;
  const kanMailen = !!eigenaar?.email;

  const Bericht = ({ standaard, hint }: { standaard: string; hint?: string }) => (
    <div className="veld"><label>bericht voor {voornaam || 'de eigenaar'}</label><textarea name="bericht" defaultValue={standaard} placeholder={hint} /></div>
  );
  const Mail = () =>
    kanMailen ? (
      <label className="klein" style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 400 }}>
        <input type="checkbox" name="mail" value="ja" defaultChecked /> stuur dit ook per mail naar {eigenaar!.email}
      </label>
    ) : (
      <p className="klein" style={{ margin: 0 }}>Geen lid van de hub: stuur het bericht zelf via {kanaalNaam[vraag.kanaal] ?? 'telefoon'}.</p>
    );

  return (
    <>
      <Sectie>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/hub/beheer/vragen" className="hub-meta">terug naar alle vragen</Link>
          <span className="kaart-label">{soortLabel(vraag.soort)} · via {kanaalNaam[vraag.kanaal] ?? vraag.kanaal} · {kort(vraag.created_at)}</span>
          <h1 className="titel-2">{vraag.huis}</h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: 720 }}>{vraag.wat}</p>
          <p className="hub-meta" style={{ margin: 0 }}>
            {vraag.eigenaar_naam || eigenaar?.naam || 'eigenaar onbekend'}
            {eigenaar?.email ? ` · ${eigenaar.email}` : ''}{eigenaar?.telefoon ? ` · ${eigenaar.telefoon}` : ''}
            {vraag.tegen ? ` · klaar tegen ${wanneer(vraag.tegen)}` : ' · geen deadline'}
          </p>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <div className="raster-2" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Kop boven="zo ziet de eigenaar het" titel={statusNaam[vraag.status] + '.'} />
            <VraagKaart v={vraag} updates={updates} partner={partner?.naam} fotos={fotos} />
            {vraag.kanaal !== 'hub' || !kanMailen ? (
              <div className="kaart" style={{ gap: 10 }}>
                <span className="kaart-label">bericht om zelf te versturen</span>
                <p style={{ whiteSpace: 'pre-wrap' }}>{kopieerTekst}</p>
                <Kopieer tekst={kopieerTekst} />
              </div>
            ) : null}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {vraag.status === 'binnen' || vraag.status === 'ingepland' ? (
              <>
                <form action={stap} className="hub-form kaart" style={{ maxWidth: 'none' }}>
                  <input type="hidden" name="id" value={vraag.id} />
                  <input type="hidden" name="actie" value="inplannen" />
                  <span className="kaart-label">1 · partner en moment</span>
                  <div className="rij-velden">
                    <div className="veld">
                      <label htmlFor="partner">partner</label>
                      <select id="partner" name="partner" defaultValue={vraag.partner_id ?? ''}>
                        <option value="">nog geen partner</option>
                        {partners.map((p) => <option key={p.id} value={p.id}>{p.naam}{p.vak ? ` · ${p.vak}` : ''}{p.regio ? ` · ${p.regio}` : ''}</option>)}
                      </select>
                    </div>
                    <div className="veld"><label htmlFor="om">komt op</label><input id="om" name="om" type="datetime-local" /></div>
                  </div>
                  {partner?.telefoon ? <p className="klein" style={{ margin: 0 }}>bel {partner.naam}: {partner.telefoon}</p> : null}
                  {!partners.length ? <p className="klein" style={{ margin: 0 }}>Nog geen partners voor diensten. Voeg ze toe onder <Link href="/hub/beheer">leden, partners, academy</Link>.</p> : null}
                  <Bericht standaard="" hint="Leeg laten: dan schrijven we 'Ingepland. [partner] komt [dag om uur]. We laten je weten wanneer het klaar is.'" />
                  <Mail />
                  <button type="submit" className="btn btn-primair">plan in</button>
                </form>

                <form action={stap} className="hub-form kaart" style={{ maxWidth: 'none' }} encType="multipart/form-data">
                  <input type="hidden" name="id" value={vraag.id} />
                  <input type="hidden" name="actie" value="geregeld" />
                  <span className="kaart-label">2 · geregeld</span>
                  <Bericht standaard={berichten.geregeld} />
                  <div className="veld"><label htmlFor="foto">foto van het resultaat</label><input id="foto" name="foto" type="file" accept="image/*" /></div>
                  <Mail />
                  <button type="submit" className="btn btn-primair">zet op geregeld</button>
                </form>

                <form action={stap} className="hub-form kaart" style={{ maxWidth: 'none' }}>
                  <input type="hidden" name="id" value={vraag.id} />
                  <input type="hidden" name="actie" value="lukt-niet" />
                  <span className="kaart-label">of · lukt niet</span>
                  <Bericht standaard={berichten.luktNiet(vraag.tegen)} />
                  <Mail />
                  <button type="submit" className="hub-knopklein">dit lukt niet</button>
                </form>
              </>
            ) : (
              <form action={stap} className="hub-form kaart" style={{ maxWidth: 'none' }}>
                <input type="hidden" name="id" value={vraag.id} />
                <input type="hidden" name="actie" value="heropen" />
                <span className="kaart-label">afgerond{vraag.geregeld_om ? ` · ${wanneer(vraag.geregeld_om)}` : ''}{vraag.score ? ` · score ${vraag.score} op 5` : ''}</span>
                <button type="submit" className="hub-knopklein">heropen de vraag</button>
              </form>
            )}

            <form action={stap} className="hub-form kaart" style={{ maxWidth: 'none' }} encType="multipart/form-data">
              <input type="hidden" name="id" value={vraag.id} />
              <input type="hidden" name="actie" value="update" />
              <span className="kaart-label">tussentijdse update</span>
              <div className="rij-velden">
                <div className="veld">
                  <label htmlFor="wie">van</label>
                  <select id="wie" name="wie" defaultValue="moroww"><option value="moroww">moroww</option><option value="partner">{partner?.naam ?? 'de partner'}</option></select>
                </div>
                <div className="veld"><label htmlFor="u-foto">foto</label><input id="u-foto" name="foto" type="file" accept="image/*" /></div>
              </div>
              <Bericht standaard="" />
              <Mail />
              <button type="submit" className="hub-knopklein primair">voeg toe aan de tijdlijn</button>
            </form>

            <div className="kaart" style={{ gap: 12 }}>
              <span className="kaart-label">notities, alleen intern</span>
              {((nts ?? []) as { id: string; tekst: string; created_at: string }[]).map((n) => (
                <p key={n.id} style={{ margin: 0 }}><span className="hub-meta">{kort(n.created_at)}</span><br />{n.tekst}</p>
              ))}
              <form action={notitie} className="hub-form" style={{ maxWidth: 'none' }}>
                <input type="hidden" name="id" value={vraag.id} />
                <textarea name="tekst" aria-label="nieuwe notitie" style={{ minHeight: 80 }} />
                <button type="submit" className="hub-knopklein">bewaar notitie</button>
              </form>
            </div>

            <form action={verwijder}>
              <input type="hidden" name="id" value={vraag.id} />
              {sp.verwijder ? <input type="hidden" name="zeker" value="ja" /> : null}
              <button type="submit" className="hub-linkknop">{sp.verwijder ? 'zeker? klik nog eens om te verwijderen' : 'vraag verwijderen'}</button>
            </form>
          </div>
        </div>
      </Sectie>
    </>
  );
}
