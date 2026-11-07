import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { hubClient, hubSessie, tekst } from '@/lib/hub/supabase';
import { basisUrl, geldigEmail, veiligNaar } from '@/lib/hub/toegang';

export const metadata: Metadata = { title: 'inloggen', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function logIn(formData: FormData) {
  'use server';
  const email = tekst(formData.get('email'), 200).toLowerCase();
  const wachtwoord = String(formData.get('wachtwoord') ?? '');
  const naar = veiligNaar(tekst(formData.get('naar'), 100));
  const q = `naar=${encodeURIComponent(naar)}`;
  if (!geldigEmail(email) || !wachtwoord) redirect(`/hub/inloggen?fout=gegevens&${q}`);
  const sb = await hubClient();
  const { error } = await sb.auth.signInWithPassword({ email, password: wachtwoord });
  if (error) {
    const code = (error as { code?: string }).code;
    if (code === 'email_not_confirmed') redirect(`/hub/inloggen?fout=bevestig&${q}`);
    if (error.status === 429) redirect(`/hub/inloggen?fout=teveel&${q}`);
    redirect(`/hub/inloggen?fout=gegevens&${q}`);
  }
  redirect(naar);
}

async function stuurLink(formData: FormData) {
  'use server';
  const email = tekst(formData.get('email'), 200).toLowerCase();
  if (!geldigEmail(email)) redirect('/hub/inloggen?link=1&fout=email');
  const sb = await hubClient();
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false, emailRedirectTo: `${await basisUrl()}/hub/auth/callback?naar=${encodeURIComponent('/hub/leden/wachtwoord')}` },
  });
  // Ook als het adres onbekend is, zeggen we hetzelfde: zo verklappen we niet wie lid is.
  if (error && error.status === 429) redirect('/hub/inloggen?link=1&fout=teveel');
  redirect('/hub/inloggen?link=1&verstuurd=1');
}

export default async function Inloggen({ searchParams }: { searchParams: Promise<{ verstuurd?: string; fout?: string; naar?: string; link?: string }> }) {
  const sp = await searchParams;
  const { user } = await hubSessie();
  if (user) redirect(veiligNaar(sp.naar || '/hub/leden'));
  const naar = veiligNaar(sp.naar || '/hub/leden');

  if (sp.link) {
    return (
      <section className="held" style={{ minHeight: '70vh' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 640 }}>
          <span className="boven">moroww hub · wachtwoord</span>
          <h1 className="titel-1">een link <i>per mail.</i></h1>
          {sp.verstuurd ? (
            <p className="inleiding">Is dat adres bij ons gekend, dan staat er nu een link in je mailbox. Hij werkt één keer en een uur lang. Daarna kies je een nieuw wachtwoord.</p>
          ) : (
            <>
              <p className="inleiding">Wachtwoord vergeten, of nog nooit een gekozen? Vul je e-mailadres in. Je krijgt een link, en daarna kies je een wachtwoord.</p>
              <form action={stuurLink} className="hub-form">
                <label htmlFor="email">e-mail</label>
                <input id="email" name="email" type="email" required autoComplete="email" />
                {sp.fout === 'email' ? <p className="hub-fout">Dat e-mailadres klopt niet.</p> : null}
                {sp.fout === 'teveel' ? <p className="hub-fout">Er zijn op korte tijd te veel links aangevraagd. Probeer het binnen een uur opnieuw.</p> : null}
                <button type="submit" className="btn btn-primair">stuur me een link</button>
              </form>
            </>
          )}
          <p className="klein"><Link href="/hub/inloggen" style={{ color: '#C9D8E8' }}>terug naar inloggen</Link></p>
        </div>
      </section>
    );
  }

  return (
    <section className="held" style={{ minHeight: '70vh' }}>
      <div className="wrap plat-toegang">
        <div className="plat-toegang-blok">
          <span className="boven">moroww hub · inloggen</span>
          <h1 className="titel-1">welkom <i>terug.</i></h1>
          <form action={logIn} className="hub-form">
            <input type="hidden" name="naar" value={naar} />
            <label htmlFor="email">e-mail</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
            <label htmlFor="wachtwoord">wachtwoord</label>
            <input id="wachtwoord" name="wachtwoord" type="password" required autoComplete="current-password" />
            {sp.fout === 'gegevens' ? <p className="hub-fout">Dat e-mailadres en wachtwoord passen niet bij elkaar.</p> : null}
            {sp.fout === 'bevestig' ? <p className="hub-fout">Bevestig eerst je e-mailadres, met de link die we je stuurden.</p> : null}
            {sp.fout === 'teveel' ? <p className="hub-fout">Te veel pogingen op korte tijd. Wacht even, en probeer het opnieuw.</p> : null}
            {sp.fout === 'link' ? <p className="hub-fout">Die link werkte niet meer. Kwam hij uit je aanmeldmail, dan is je adres wellicht al bevestigd: log dan gewoon in. Anders vraag je een nieuwe link.</p> : null}
            <button type="submit" className="btn btn-primair">inloggen</button>
          </form>
          <p className="klein"><Link href="/hub/inloggen?link=1" style={{ color: '#C9D8E8' }}>wachtwoord vergeten, of nog geen wachtwoord?</Link></p>
        </div>
        <div className="plat-toegang-blok plat-toegang-nieuw">
          <span className="boven">nieuw in de hub?</span>
          <h2 className="titel-2">meld je <i>aan.</i></h2>
          <p className="inleiding">Voor eigenaars en property managers. Je kiest een wachtwoord, wij kijken je aanvraag na en laten je per mail weten wanneer je toegang hebt.</p>
          <Link href="/hub/aanmelden" className="btn btn-lijn" style={{ alignSelf: 'flex-start' }}>meld je aan</Link>
        </div>
      </div>
    </section>
  );
}
