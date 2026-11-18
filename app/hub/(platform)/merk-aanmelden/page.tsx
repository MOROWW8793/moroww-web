import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { hubClient, hubBeheerClient, hubSessie, tekst } from '@/lib/hub/supabase';
import { basisUrl, geldigEmail, MIN_WACHTWOORD } from '@/lib/hub/toegang';
import { meldBeheer } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'meld je merk aan', robots: { index: false } };
export const dynamic = 'force-dynamic';

const plekken = ['in de badkamer', 'in de keuken', 'in de living', 'in de slaapkamer', 'aan de voordeur', 'buiten', 'ergens anders'];

async function meldMerkAan(formData: FormData) {
  'use server';
  const email = tekst(formData.get('email'), 200).toLowerCase();
  const wachtwoord = String(formData.get('wachtwoord') ?? '');
  const naam = tekst(formData.get('naam'), 120);
  const merk = tekst(formData.get('merk'), 120);
  const wat = tekst(formData.get('wat'), 300);
  const plekIn = tekst(formData.get('plek'), 80);
  const plek = plekken.includes(plekIn) ? plekIn : null;
  const url = tekst(formData.get('url'), 300) || null;
  const voordeel = tekst(formData.get('voordeel'), 300) || null;
  const telefoon = tekst(formData.get('telefoon'), 40) || null;
  const bericht = tekst(formData.get('bericht'), 2000) || null;

  if (!naam || !merk || !wat) redirect('/hub/merk-aanmelden?fout=leeg');
  if (!geldigEmail(email)) redirect('/hub/merk-aanmelden?fout=email');
  if (wachtwoord.length < MIN_WACHTWOORD) redirect('/hub/merk-aanmelden?fout=kort');
  if (wachtwoord !== String(formData.get('herhaal') ?? '')) redirect('/hub/merk-aanmelden?fout=anders');

  const sb = await hubClient();
  const { data, error } = await sb.auth.signUp({
    email,
    password: wachtwoord,
    options: { data: { naam }, emailRedirectTo: `${await basisUrl()}/hub/auth/callback?naar=${encodeURIComponent('/hub/partner')}` },
  });
  if (error) {
    const code = (error as { code?: string }).code;
    if (code === 'user_already_exists') redirect('/hub/merk-aanmelden?fout=bestaat');
    if (code === 'weak_password') redirect('/hub/merk-aanmelden?fout=zwak');
    if (error.status === 429) redirect('/hub/merk-aanmelden?fout=teveel');
    redirect('/hub/merk-aanmelden?fout=opslaan');
  }
  // Bestaat het adres al, dan geeft Supabase een gebruiker zonder identities terug.
  if (!data.user || (data.user.identities && data.user.identities.length === 0)) redirect('/hub/merk-aanmelden?fout=bestaat');

  // Vóór de bevestiging van het e-mailadres is er nog geen sessie: profiel en
  // fiche gaan daarom via de service role, altijd als aanvraag en als concept.
  const db = hubBeheerClient();
  await db.from('hub_profielen').upsert(
    { id: data.user.id, email, naam, soort: 'partner', rol: 'partner', status: 'aangevraagd', bedrijf: merk, telefoon, bericht },
    { onConflict: 'id', ignoreDuplicates: true },
  );
  const { error: ficheFout } = await db.from('hub_partners').insert({
    eigenaar: data.user.id,
    naam: merk,
    categorie: 'huis',
    soort: 'merk',
    wat,
    plek,
    voordeel,
    url,
    contact: email,
    status: 'concept',
  });
  await meldBeheer(`nieuw merk · ${merk}`, [
    ['contact', naam],
    ['e-mail', email],
    ['telefoon', telefoon ?? ''],
    ['wat', wat],
    ['waar in het huis', plek ?? ''],
    ['voordeel voor eigenaars', voordeel ?? ''],
    ['website', url ?? ''],
    ['bericht', bericht ?? ''],
    ...(ficheFout ? ([['let op', `fiche niet bewaard: ${ficheFout.message}`]] as [string, string][]) : []),
  ]);
  if (data.session) redirect('/hub/partner');
  redirect('/hub/merk-aanmelden?verstuurd=1');
}

const fouten: Record<string, string> = {
  leeg: 'Vul je naam, je merk en wat je maakt in.',
  email: 'Dat e-mailadres klopt niet.',
  kort: `Kies een wachtwoord van minstens ${MIN_WACHTWOORD} tekens.`,
  zwak: 'Dat wachtwoord is te makkelijk te raden. Kies een ander.',
  anders: 'De twee wachtwoorden zijn niet hetzelfde.',
  bestaat: 'Er is al een account met dit e-mailadres. Log in, of vraag een link als je je wachtwoord niet meer weet.',
  teveel: 'Te veel aanmeldingen op korte tijd. Probeer het binnen een uur opnieuw.',
  opslaan: 'Aanmelden lukte niet. Probeer het opnieuw, of mail ons op info@moroww.com.',
};

export default async function MerkAanmelden({ searchParams }: { searchParams: Promise<{ fout?: string; verstuurd?: string }> }) {
  const sp = await searchParams;
  const { user } = await hubSessie();
  if (user) redirect('/hub/leden');

  if (sp.verstuurd) {
    return (
      <section className="held" style={{ minHeight: '70vh' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 680 }}>
          <span className="boven">moroww hub · voor merken</span>
          <h1 className="titel-1">kijk in je <i>mailbox.</i></h1>
          <p className="inleiding">We stuurden je een link om je e-mailadres te bevestigen. Daarna kan je je fiche aanvullen en producten toevoegen. Wij kijken alles na en laten je weten wanneer je merk in de hub staat.</p>
          <p className="klein"><Link href="/hub" style={{ color: '#C9D8E8' }}>naar moroww hub</Link></p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="held" style={{ paddingBottom: 48 }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span className="boven">moroww hub · voor merken</span>
          <h1 className="titel-1">meld je merk <i>aan.</i></h1>
          <p className="inleiding">Voor merken die in de huizen van moroww willen staan. Je kiest een wachtwoord en vult je fiche in. Wij kijken ze na. Daarna zien eigenaars je merk in de hub en vragen ze het aan voor hun huis.</p>
        </div>
      </section>
      <section className="plat-los-vlak">
        <div className="wrap">
          <form action={meldMerkAan} className="hub-form" style={{ maxWidth: 720 }}>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="merk">je merk</label><input id="merk" name="merk" required autoComplete="organization" /></div>
              <div className="veld"><label htmlFor="naam">je naam</label><input id="naam" name="naam" required autoComplete="name" /></div>
            </div>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="email">e-mail</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
              <div className="veld"><label htmlFor="telefoon">telefoon</label><input id="telefoon" name="telefoon" type="tel" autoComplete="tel" /></div>
            </div>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="wachtwoord">wachtwoord</label><input id="wachtwoord" name="wachtwoord" type="password" required minLength={MIN_WACHTWOORD} autoComplete="new-password" /></div>
              <div className="veld"><label htmlFor="herhaal">nog eens</label><input id="herhaal" name="herhaal" type="password" required minLength={MIN_WACHTWOORD} autoComplete="new-password" /></div>
            </div>
            <p className="klein" style={{ margin: 0 }}>Minstens {MIN_WACHTWOORD} tekens.</p>
            <div className="veld"><label htmlFor="wat">wat je maakt, in één zin</label><input id="wat" name="wat" required maxLength={300} /></div>
            <div className="rij-velden">
              <div className="veld">
                <label htmlFor="plek">waar in het huis</label>
                <select id="plek" name="plek" defaultValue={plekken[0]}>
                  {plekken.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="veld"><label htmlFor="url">website</label><input id="url" name="url" type="url" placeholder="https://" /></div>
            </div>
            <div className="veld"><label htmlFor="voordeel">voordeel voor eigenaars die je product plaatsen</label><input id="voordeel" name="voordeel" maxLength={300} /></div>
            <div className="veld"><label htmlFor="bericht">iets dat we moeten weten</label><textarea id="bericht" name="bericht" /></div>
            {sp.fout && fouten[sp.fout] ? <p className="hub-fout">{fouten[sp.fout]}</p> : null}
            <button type="submit" className="btn btn-primair">meld mijn merk aan</button>
            <p className="klein">Al een account? <Link href="/hub/inloggen?naar=/hub/partner">log in</Link> · Vakman of tool? <Link href="/hub/partner-worden#aanmelden">vertel ons wat je doet</Link></p>
          </form>
        </div>
      </section>
    </>
  );
}
