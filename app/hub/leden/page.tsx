import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie, Kop } from '@/components/merk/Shell';
import { LedenNav } from '@/components/hub/LedenNav';
import { hubSessie, hubBeheerClient, tekst, brusselNaarISO } from '@/lib/hub/supabase';
import { soorten, berichten, duur, fotoLinks, type Vraag, type VraagUpdate } from '@/lib/hub/vragen';
import { VraagKaart } from '@/components/hub/VraagKaart';
import { meldBeheer } from '@/lib/hub/mail';
import { site } from '@/lib/merk/site';

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


async function stelVraag(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await hubSessie();
  if (!user || profiel?.status !== 'actief') redirect('/hub/leden');
  const soort = tekst(formData.get('soort'), 30);
  const wat = tekst(formData.get('wat'), 2000);
  const huis = tekst(formData.get('huis'), 200) || profiel.huis || 'mijn huis';
  const tegen = brusselNaarISO(tekst(formData.get('tegen'), 20));
  if (!wat) redirect('/hub/leden?fout=vraag#vraag');
  const { data, error } = await sb
    .from('hub_vragen')
    .insert({ eigenaar: user.id, eigenaar_naam: profiel.naam, huis, soort: soorten.some((x) => x.sleutel === soort) ? soort : 'andere', wat, tegen, kanaal: 'hub', status: 'binnen' })
    .select('id')
    .single();
  if (error || !data) redirect('/hub/leden?fout=vraag#vraag');
  await hubBeheerClient().from('hub_vraag_updates').insert({ vraag_id: data.id, wie: 'moroww', tekst: berichten.binnen });
  await meldBeheer(`nieuwe vraag · ${huis}`, [['van', profiel.naam], ['wat', wat], ['klaar tegen', tegen ?? 'geen deadline']]);
  revalidatePath('/hub/leden');
  redirect('/hub/leden?gesteld=1');
}

async function geefScore(formData: FormData) {
  'use server';
  const { sb, user } = await hubSessie();
  if (!user) redirect('/hub/inloggen');
  const score = Number(tekst(formData.get('score'), 2));
  if (score >= 1 && score <= 5) await sb.from('hub_vragen').update({ score }).eq('id', tekst(formData.get('id'), 60)).eq('eigenaar', user.id);
  revalidatePath('/hub/leden');
}

export default async function Leden({ searchParams }: { searchParams: Promise<{ fout?: string; gesteld?: string }> }) {
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

  const { data: rijen } = await sb.from('hub_vragen').select('*').eq('eigenaar', user.id).order('created_at', { ascending: false }).limit(60);
  const vragen = (rijen ?? []) as Vraag[];
  const ids = vragen.map((v) => v.id);
  const db = hubBeheerClient();
  const [{ data: ups }, { data: ptn }] = await Promise.all([
    ids.length ? sb.from('hub_vraag_updates').select('*').in('vraag_id', ids).order('created_at') : Promise.resolve({ data: [] }),
    db.from('hub_partners').select('id,naam').in('id', [...new Set(vragen.map((v) => v.partner_id).filter(Boolean))] as string[]),
  ]);
  const updates = (ups ?? []) as VraagUpdate[];
  const partnerNaam = new Map(((ptn ?? []) as { id: string; naam: string }[]).map((p) => [p.id, p.naam]));
  const fotos = await fotoLinks([...vragen.map((v) => v.foto), ...updates.map((u) => u.foto)]);
  const loopt = vragen.filter((v) => v.status === 'binnen' || v.status === 'ingepland');
  const klaar = vragen.filter((v) => v.status === 'geregeld' || v.status === 'lukt-niet');
  const doorlooptijden = vragen.filter((v) => v.geregeld_om).map((v) => new Date(v.geregeld_om!).getTime() - new Date(v.created_at).getTime()).sort((a, b) => a - b);
  const mediaan = doorlooptijden.length ? doorlooptijden[Math.floor(doorlooptijden.length / 2)] : null;
  const kaart = (v: Vraag) => (
    <VraagKaart key={v.id} v={v} updates={updates.filter((u) => u.vraag_id === v.id)} partner={v.partner_id ? partnerNaam.get(v.partner_id) : null} fotos={fotos} scoreActie={geefScore} />
  );

  return (
    <>
      <LedenNav actief="vragen" partner={profiel.rol === 'partner'} beheerder={beheerder} />
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span className="boven">moroww hub · {profiel.huis || 'ledenzone'}</span>
          <h1 className="titel-1">vraag het <i>moroww.</i></h1>
          <p className="inleiding">Je vraagt, wij zoeken een partner in de buurt, en volgen op tot het klaar is. Je ziet het met een foto.</p>
          {vragen.length ? (
            <div className="hub-cijfers">
              <div><b>{vragen.filter((v) => v.status === 'geregeld').length}</b><span>vragen geregeld</span></div>
              {mediaan !== null ? <div><b>{duur(mediaan)}</b><span>van vraag tot geregeld, mediaan</span></div> : null}
              <div><b>{loopt.length}</b><span>lopen nu</span></div>
            </div>
          ) : null}
        </div>
      </section>

      <Sectie id="vraag">
        <div className="rij">
          <div className="smal">
            <Kop boven="nieuwe vraag" titel={<>wat moet er <i>gebeuren?</i></>} tekst="Wij kiezen de partner die het snelst kan en volgen op tot het klaar is." />
            <p className="klein" style={{ marginTop: 16 }}>Liever bellen of een bericht sturen? {site.contact.telefoon}</p>
          </div>
          <form action={stelVraag} className="hub-form breed" style={{ maxWidth: 720 }}>
            <fieldset className="hub-chips">
              <legend className="klein" style={{ marginBottom: 10 }}>soort vraag</legend>
              {soorten.map((s, i) => (
                <label key={s.sleutel}>
                  <input type="radio" name="soort" value={s.sleutel} defaultChecked={i === 0} />
                  <span>{s.label}</span>
                </label>
              ))}
            </fieldset>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="huis">voor welk huis</label><input id="huis" name="huis" defaultValue={profiel.huis ?? ''} required /></div>
              <div className="veld"><label htmlFor="tegen">klaar tegen</label><input id="tegen" name="tegen" type="datetime-local" /></div>
            </div>
            <div className="veld"><label htmlFor="wat">je vraag</label><textarea id="wat" name="wat" required placeholder="Kunnen de ramen gepoetst zijn tegen 19 uur? Er komen gasten." /></div>
            {sp.fout === 'vraag' ? <p className="hub-fout">Je vraag kon niet bewaard worden. Probeer het opnieuw, of bel ons.</p> : null}
            {sp.gesteld ? <p className="klein" style={{ margin: 0 }}>Je vraag is binnen. Je ziet hieronder hoe het loopt.</p> : null}
            <button type="submit" className="btn btn-primair">vraag het moroww</button>
          </form>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <Kop boven="loopt nu" titel={loopt.length ? <>{loopt.length} {loopt.length === 1 ? 'vraag' : 'vragen'} <i>onderweg.</i></> : <>alles is <i>geregeld.</i></>} />
        {loopt.length ? <div className="raster-2" style={{ alignItems: 'start' }}>{loopt.map(kaart)}</div> : <p className="hub-leeg">Heb je iets nodig, vraag het hierboven.</p>}
      </Sectie>

      {klaar.length ? (
        <Sectie>
          <Kop boven="geregeld" titel={<>wat al <i>gebeurd is.</i></>} />
          <div className="raster-2" style={{ alignItems: 'start' }}>{klaar.map(kaart)}</div>
        </Sectie>
      ) : null}
    </>
  );
}
