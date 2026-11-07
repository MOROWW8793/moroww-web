import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { hubClient, hubSessie, tekst } from '@/lib/hub/supabase';

export const metadata: Metadata = { title: 'inloggen', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function stuurLink(formData: FormData) {
  'use server';
  const email = tekst(formData.get('email'), 200).toLowerCase();
  const naar = tekst(formData.get('naar'), 100);
  const veilig = /^\/hub\/(leden|partner|beheer)(\/[\w/-]*)?$/.test(naar) ? naar : '/hub/leden';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect('/hub/inloggen?fout=email');
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host');
  const proto = h.get('x-forwarded-proto') || 'https';
  const sb = await hubClient();
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${proto}://${host}/hub/auth/callback?naar=${encodeURIComponent(veilig)}` },
  });
  if (error) redirect(error.status === 429 ? '/hub/inloggen?fout=teveel' : '/hub/inloggen?fout=versturen');
  redirect('/hub/inloggen?verstuurd=1');
}

export default async function Inloggen({ searchParams }: { searchParams: Promise<{ verstuurd?: string; fout?: string; naar?: string }> }) {
  const sp = await searchParams;
  const { user } = await hubSessie();
  if (user) redirect(sp.naar || '/hub/leden');

  return (
    <section className="held" style={{ minHeight: '70vh' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 640 }}>
        <span className="boven">moroww hub · ledenzone</span>
        <h1 className="titel-1">welkom <i>terug.</i></h1>
        {sp.verstuurd ? (
          <p className="inleiding">Kijk in je mailbox. We stuurden je een link om in te loggen. Hij werkt één keer en een uur lang.</p>
        ) : (
          <>
            <p className="inleiding">Geen wachtwoord nodig. Vul je e-mailadres in, en je krijgt een link om in te loggen.</p>
            <form action={stuurLink} className="hub-form">
              <input type="hidden" name="naar" value={sp.naar || '/hub/leden'} />
              <label htmlFor="email">e-mail</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
              {sp.fout === 'email' ? <p className="hub-fout">Dat e-mailadres klopt niet.</p> : null}
              {sp.fout === 'versturen' ? <p className="hub-fout">Versturen lukte niet. Probeer het straks opnieuw.</p> : null}
              {sp.fout === 'teveel' ? <p className="hub-fout">Er zijn op korte tijd te veel links aangevraagd. Wacht even, en probeer het binnen een uur opnieuw.</p> : null}
              {sp.fout === 'link' ? <p className="hub-fout">Die link is verlopen of al gebruikt. Vraag een nieuwe aan.</p> : null}
              <button type="submit" className="btn btn-primair">stuur me een link</button>
            </form>
            <p className="klein" style={{ color: 'var(--donker-muted)' }}>
              Nog geen lid? Toegang tot de hub hoort bij het label. <Link href="/hub/lid-worden" style={{ color: 'inherit' }}>zo word je lid</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
