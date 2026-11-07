import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { hubClient, hubBeheerClient, hubSessie, tekst } from '@/lib/hub/supabase';
import { basisUrl, geldigEmail, MIN_WACHTWOORD } from '@/lib/hub/toegang';
import { meldBeheer } from '@/lib/hub/mail';

export const metadata: Metadata = { title: 'meld je aan', robots: { index: false } };
export const dynamic = 'force-dynamic';

const labelKeuzes: [string, string][] = [
  ['ja', 'ja, mijn huis draagt het label'],
  ['nee', 'nog niet'],
  ['weet-niet', 'ik weet het niet'],
];

async function meldAan(formData: FormData) {
  'use server';
  const email = tekst(formData.get('email'), 200).toLowerCase();
  const wachtwoord = String(formData.get('wachtwoord') ?? '');
  const naam = tekst(formData.get('naam'), 120);
  const soort = tekst(formData.get('soort'), 30) === 'property-manager' ? 'property-manager' : 'eigenaar';
  const label = labelKeuzes.find(([k]) => k === tekst(formData.get('label'), 20))?.[1] ?? 'ik weet het niet';
  const huis = tekst(formData.get('huis'), 200) || null;
  const bedrijf = tekst(formData.get('bedrijf'), 200) || null;
  const telefoon = tekst(formData.get('telefoon'), 40) || null;
  const bericht = tekst(formData.get('bericht'), 2000);

  if (!naam) redirect('/hub/aanmelden?fout=naam');
  if (!geldigEmail(email)) redirect('/hub/aanmelden?fout=email');
  if (wachtwoord.length < MIN_WACHTWOORD) redirect('/hub/aanmelden?fout=kort');
  if (wachtwoord !== String(formData.get('herhaal') ?? '')) redirect('/hub/aanmelden?fout=anders');

  const sb = await hubClient();
  const { data, error } = await sb.auth.signUp({
    email,
    password: wachtwoord,
    options: { data: { naam }, emailRedirectTo: `${await basisUrl()}/hub/auth/callback?naar=${encodeURIComponent('/hub/leden')}` },
  });
  if (error) {
    const code = (error as { code?: string }).code;
    if (code === 'user_already_exists') redirect('/hub/aanmelden?fout=bestaat');
    if (code === 'weak_password') redirect('/hub/aanmelden?fout=zwak');
    if (error.status === 429) redirect('/hub/aanmelden?fout=teveel');
    redirect('/hub/aanmelden?fout=opslaan');
  }
  // Bestaat het adres al, dan geeft Supabase een gebruiker zonder identities terug.
  if (!data.user || (data.user.identities && data.user.identities.length === 0)) redirect('/hub/aanmelden?fout=bestaat');

  const db = hubBeheerClient();
  await db.from('hub_profielen').upsert(
    {
      id: data.user.id,
      email,
      naam,
      soort,
      rol: 'lid',
      status: 'aangevraagd',
      huis,
      bedrijf,
      telefoon,
      bericht: [`label: ${label}`, bericht].filter(Boolean).join('\n'),
    },
    { onConflict: 'id', ignoreDuplicates: true },
  );
  await meldBeheer(`nieuwe aanmelding · ${naam}`, [
    ['soort', soort],
    ['e-mail', email],
    ['label', label],
    ['huis', huis ?? ''],
    ['bedrijf', bedrijf ?? ''],
    ['telefoon', telefoon ?? ''],
    ['bericht', bericht],
  ]);
  if (data.session) redirect('/hub/leden');
  redirect('/hub/aanmelden?verstuurd=1');
}

const fouten: Record<string, string> = {
  naam: 'Vul je naam in.',
  email: 'Dat e-mailadres klopt niet.',
  kort: `Kies een wachtwoord van minstens ${MIN_WACHTWOORD} tekens.`,
  zwak: 'Dat wachtwoord is te makkelijk te raden. Kies een ander.',
  anders: 'De twee wachtwoorden zijn niet hetzelfde.',
  bestaat: 'Er is al een account met dit e-mailadres. Log in, of vraag een link als je je wachtwoord niet meer weet.',
  teveel: 'Te veel aanmeldingen op korte tijd. Probeer het binnen een uur opnieuw.',
  opslaan: 'Aanmelden lukte niet. Probeer het opnieuw, of mail ons op info@moroww.com.',
};

export default async function Aanmelden({ searchParams }: { searchParams: Promise<{ fout?: string; verstuurd?: string }> }) {
  const sp = await searchParams;
  const { user } = await hubSessie();
  if (user) redirect('/hub/leden');

  if (sp.verstuurd) {
    return (
      <section className="held" style={{ minHeight: '70vh' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 680 }}>
          <span className="boven">moroww hub · aanmelden</span>
          <h1 className="titel-1">kijk in je <i>mailbox.</i></h1>
          <p className="inleiding">We stuurden je een link om je e-mailadres te bevestigen. Daarna kijken we je aanvraag na, en laten we je per mail weten wanneer je toegang hebt.</p>
          <p className="klein"><Link href="/hub" style={{ color: '#C9D8E8' }}>naar moroww hub</Link></p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="held" style={{ paddingBottom: 48 }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span className="boven">moroww hub · aanmelden</span>
          <h1 className="titel-1">meld je <i>aan.</i></h1>
          <p className="inleiding">Voor eigenaars en property managers. Je kiest nu een wachtwoord. Wij kijken je aanvraag na en laten je per mail weten wanneer je toegang hebt.</p>
        </div>
      </section>
      <section className="plat-los-vlak">
        <div className="wrap">
          <form action={meldAan} className="hub-form" style={{ maxWidth: 720 }}>
            <div className="rij-velden">
              <div className="veld"><label htmlFor="naam">naam</label><input id="naam" name="naam" required autoComplete="name" /></div>
              <div className="veld">
                <label htmlFor="soort">ik ben</label>
                <select id="soort" name="soort" defaultValue="eigenaar">
                  <option value="eigenaar">eigenaar of host</option>
                  <option value="property-manager">property manager</option>
                </select>
              </div>
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
            <div className="rij-velden">
              <div className="veld"><label htmlFor="huis">je huis of je portefeuille</label><input id="huis" name="huis" placeholder="naam en gemeente" /></div>
              <div className="veld"><label htmlFor="bedrijf">bedrijf</label><input id="bedrijf" name="bedrijf" /></div>
            </div>
            <fieldset className="hub-chips">
              <legend className="klein" style={{ marginBottom: 10 }}>draagt je huis het moroww-label?</legend>
              {labelKeuzes.map(([k, l], i) => (
                <label key={k}>
                  <input type="radio" name="label" value={k} defaultChecked={i === 0} />
                  <span>{l}</span>
                </label>
              ))}
            </fieldset>
            <div className="veld"><label htmlFor="bericht">waarom de hub?</label><textarea id="bericht" name="bericht" /></div>
            {sp.fout && fouten[sp.fout] ? <p className="hub-fout">{fouten[sp.fout]}</p> : null}
            <button type="submit" className="btn btn-primair">meld me aan</button>
            <p className="klein">Al een account? <Link href="/hub/inloggen">log in</Link></p>
          </form>
        </div>
      </section>
    </>
  );
}
