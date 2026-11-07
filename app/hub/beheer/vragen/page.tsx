import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Sectie, Kop } from '@/components/merk/Shell';
import { LedenNav } from '@/components/hub/LedenNav';
import { RegieNav } from '@/components/hub/RegieNav';
import { eisBeheer } from '@/lib/hub/beheer';
import { tekst, brusselNaarISO, type Profiel } from '@/lib/hub/supabase';
import { soorten, soortLabel, statusNaam, kanaalNaam, wanneer, duur, berichten, type Vraag } from '@/lib/hub/vragen';

export const metadata: Metadata = { title: 'regie · vragen', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function noteer(formData: FormData) {
  'use server';
  const { db } = await eisBeheer('/hub/beheer/vragen');
  const eigenaar = tekst(formData.get('eigenaar'), 60) || null;
  const kanaal = tekst(formData.get('kanaal'), 20);
  const soort = tekst(formData.get('soort'), 30);
  const rij = {
    eigenaar,
    eigenaar_naam: tekst(formData.get('eigenaar_naam'), 120) || null,
    huis: tekst(formData.get('huis'), 200),
    soort: soorten.some((s) => s.sleutel === soort) ? soort : 'andere',
    wat: tekst(formData.get('wat'), 2000),
    tegen: brusselNaarISO(tekst(formData.get('tegen'), 20)),
    kanaal: Object.keys(kanaalNaam).includes(kanaal) ? kanaal : 'telefoon',
    status: 'binnen',
  };
  if (!rij.huis || !rij.wat) redirect('/hub/beheer/vragen?fout=leeg');
  if (eigenaar && !rij.eigenaar_naam) {
    const { data } = await db.from('hub_profielen').select('naam').eq('id', eigenaar).single();
    rij.eigenaar_naam = data?.naam ?? null;
  }
  const { data } = await db.from('hub_vragen').insert(rij).select('id').single();
  if (data) {
    await db.from('hub_vraag_updates').insert({ vraag_id: data.id, wie: 'moroww', tekst: berichten.binnen });
    redirect(`/hub/beheer/vragen/${data.id}`);
  }
  redirect('/hub/beheer/vragen?fout=opslaan');
}

export default async function RegieVragen({ searchParams }: { searchParams: Promise<{ fout?: string; toon?: string }> }) {
  const sp = await searchParams;
  const { db, profiel } = await eisBeheer('/hub/beheer/vragen');
  const [{ data: rijen }, { data: ptn }, { data: leden }] = await Promise.all([
    db.from('hub_vragen').select('*').order('created_at', { ascending: false }).limit(300),
    db.from('hub_partners').select('id,naam'),
    db.from('hub_profielen').select('id,naam,huis').eq('status', 'actief').order('naam'),
  ]);
  const alle = (rijen ?? []) as Vraag[];
  const partnerNaam = new Map(((ptn ?? []) as { id: string; naam: string }[]).map((p) => [p.id, p.naam]));
  const open = alle
    .filter((v) => v.status === 'binnen' || v.status === 'ingepland')
    .sort((a, b) => (a.tegen ? new Date(a.tegen).getTime() : Infinity) - (b.tegen ? new Date(b.tegen).getTime() : Infinity));
  const afgerond = alle.filter((v) => v.status === 'geregeld' || v.status === 'lukt-niet');
  const toon = sp.toon === 'alles' ? afgerond : afgerond.slice(0, 15);
  const nu = Date.now();
  const tijden = alle.filter((v) => v.geregeld_om).map((v) => new Date(v.geregeld_om!).getTime() - new Date(v.created_at).getTime()).sort((a, b) => a - b);
  const mediaan = tijden.length ? tijden[Math.floor(tijden.length / 2)] : null;
  const scores = alle.filter((v) => v.score).map((v) => v.score!);

  const rij = (v: Vraag) => {
    const over = v.tegen ? new Date(v.tegen).getTime() - nu : null;
    return (
      <Link key={v.id} href={`/hub/beheer/vragen/${v.id}`} className="regie-rij">
        <span>
          <strong style={{ fontWeight: 500 }}>{v.huis}</strong> · {soortLabel(v.soort)}
          <br /><span className="hub-meta">{v.wat.length > 90 ? v.wat.slice(0, 90) + '…' : v.wat}</span>
        </span>
        <span className="hub-meta">{v.eigenaar_naam || 'eigenaar onbekend'}<br />via {kanaalNaam[v.kanaal] ?? v.kanaal}</span>
        <span className="hub-meta">{v.partner_id ? partnerNaam.get(v.partner_id) : 'nog geen partner'}<br />
          {v.status === 'binnen' || v.status === 'ingepland'
            ? over === null ? 'geen deadline' : over < 0 ? <span className="regie-laat">te laat</span> : `nog ${duur(over)}`
            : v.geregeld_om ? wanneer(v.geregeld_om) : ''}
        </span>
        <span className={`hub-label ${v.status === 'geregeld' ? 'live' : ''}`}>{statusNaam[v.status]}</span>
      </Link>
    );
  };

  return (
    <>
      <LedenNav actief="beheer" partner={profiel?.rol === 'partner'} beheerder />
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span className="boven">moroww hub · regie</span>
          <h1 className="titel-1">{open.length ? <>{open.length} {open.length === 1 ? 'vraag' : 'vragen'} <i>open.</i></> : <>alles <i>geregeld.</i></>}</h1>
          <div className="hub-cijfers">
            <div><b>{alle.filter((v) => v.status === 'geregeld').length}</b><span>geregeld</span></div>
            {mediaan !== null ? <div><b>{duur(mediaan)}</b><span>van vraag tot geregeld, mediaan</span></div> : null}
            {scores.length ? <div><b>{(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1).replace('.', ',')}</b><span>gemiddelde score</span></div> : null}
            <div><b>{open.filter((v) => v.tegen && new Date(v.tegen).getTime() < nu).length}</b><span>te laat</span></div>
          </div>
        </div>
      </section>
      <Sectie>
        <RegieNav actief="vragen" />
        <div style={{ marginTop: 28 }}>
          <Kop boven="open" titel="eerst wat het dringendst is." />
          {open.length ? <div style={{ borderTop: '1px solid var(--line)' }}>{open.map(rij)}</div> : <p className="hub-leeg">Geen open vragen.</p>}
        </div>
      </Sectie>
      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal">
            <Kop boven="vraag noteren" titel="kwam het binnen via WhatsApp, telefoon of mail?" tekst="Zet de vraag hier, dan loopt ze mee in de regie en ziet de eigenaar ze in de hub." />
          </div>
          <form action={noteer} className="hub-form breed" style={{ maxWidth: 720 }}>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="n-huis">huis</label><input id="n-huis" name="huis" required list="huizen" /></div>
              <div className="veld">
                <label htmlFor="n-eig">lid van de hub</label>
                <select id="n-eig" name="eigenaar" defaultValue="">
                  <option value="">geen lid, of onbekend</option>
                  {((leden ?? []) as Pick<Profiel, 'id' | 'naam' | 'huis'>[]).map((l) => <option key={l.id} value={l.id}>{l.naam}{l.huis ? ` · ${l.huis}` : ''}</option>)}
                </select>
              </div>
            </div>
            <datalist id="huizen">{[...new Set(alle.map((v) => v.huis))].map((h) => <option key={h} value={h} />)}</datalist>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="n-naam">eigenaar, voornaam</label><input id="n-naam" name="eigenaar_naam" /></div>
              <div className="veld">
                <label htmlFor="n-kanaal">kwam binnen via</label>
                <select id="n-kanaal" name="kanaal" defaultValue="whatsapp">
                  {Object.entries(kanaalNaam).filter(([k]) => k !== 'hub').map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="rij-velden">
              <div className="veld">
                <label htmlFor="n-soort">soort</label>
                <select id="n-soort" name="soort">{soorten.map((s) => <option key={s.sleutel} value={s.sleutel}>{s.label}</option>)}</select>
              </div>
              <div className="veld"><label htmlFor="n-tegen">klaar tegen</label><input id="n-tegen" name="tegen" type="datetime-local" /></div>
            </div>
            <div className="veld"><label htmlFor="n-wat">wat moet er gebeuren</label><textarea id="n-wat" name="wat" required /></div>
            {sp.fout ? <p className="hub-fout">Vul minstens het huis en de vraag in.</p> : null}
            <button type="submit" className="btn btn-primair">noteer de vraag</button>
          </form>
        </div>
      </Sectie>
      <Sectie>
        <Kop boven="afgerond" titel="geregeld en niet gelukt." />
        {toon.length ? <div style={{ borderTop: '1px solid var(--line)' }}>{toon.map(rij)}</div> : <p className="hub-leeg">Nog niets afgerond.</p>}
        {afgerond.length > toon.length ? <p style={{ marginTop: 16 }}><Link href="/hub/beheer/vragen?toon=alles">toon alles ({afgerond.length})</Link></p> : null}
      </Sectie>
    </>
  );
}
