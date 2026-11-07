import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { hubSessie } from '@/lib/hub/supabase';
import { MIN_WACHTWOORD } from '@/lib/hub/toegang';

export const metadata: Metadata = { title: 'wachtwoord', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function zetWachtwoord(formData: FormData) {
  'use server';
  const { sb, user } = await hubSessie();
  if (!user) redirect('/hub/inloggen?naar=/hub/leden/wachtwoord');
  const w = String(formData.get('wachtwoord') ?? '');
  if (w.length < MIN_WACHTWOORD) redirect('/hub/leden/wachtwoord?fout=kort');
  if (w !== String(formData.get('herhaal') ?? '')) redirect('/hub/leden/wachtwoord?fout=anders');
  const { error } = await sb.auth.updateUser({ password: w });
  if (error) {
    const code = (error as { code?: string }).code;
    redirect(`/hub/leden/wachtwoord?fout=${code === 'same_password' ? 'zelfde' : code === 'weak_password' ? 'zwak' : 'opslaan'}`);
  }
  redirect('/hub/leden/wachtwoord?bewaard=1');
}

const fouten: Record<string, string> = {
  kort: `Kies een wachtwoord van minstens ${MIN_WACHTWOORD} tekens.`,
  anders: 'De twee wachtwoorden zijn niet hetzelfde.',
  zelfde: 'Dat is je huidige wachtwoord. Kies een ander.',
  zwak: 'Dat wachtwoord is te makkelijk te raden. Kies een ander.',
  opslaan: 'Bewaren lukte niet. Probeer het opnieuw.',
};

export default async function Wachtwoord({ searchParams }: { searchParams: Promise<{ fout?: string; bewaard?: string }> }) {
  const sp = await searchParams;
  const { user, profiel } = await hubSessie();
  if (!user) redirect('/hub/inloggen?naar=/hub/leden/wachtwoord');
  const actief = profiel?.status === 'actief';

  return (
    <section className="held">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 640 }}>
        <span className="boven">{user.email}</span>
        <h1 className="titel-1">je <i>wachtwoord.</i></h1>
        {sp.bewaard ? (
          <>
            <p className="inleiding">Bewaard. Voortaan log je in met je e-mailadres en dit wachtwoord.</p>
            <Link href="/hub/leden" className="btn btn-primair" style={{ alignSelf: 'flex-start' }}>{actief ? 'naar je overzicht' : 'verder'}</Link>
          </>
        ) : (
          <>
            <p className="inleiding">Kies een wachtwoord. Daarmee log je voortaan in, zonder link per mail.</p>
            <form action={zetWachtwoord} className="hub-form">
              <label htmlFor="wachtwoord">nieuw wachtwoord</label>
              <input id="wachtwoord" name="wachtwoord" type="password" required minLength={MIN_WACHTWOORD} autoComplete="new-password" />
              <label htmlFor="herhaal">nog eens</label>
              <input id="herhaal" name="herhaal" type="password" required minLength={MIN_WACHTWOORD} autoComplete="new-password" />
              <p className="klein" style={{ margin: 0 }}>Minstens {MIN_WACHTWOORD} tekens.</p>
              {sp.fout && fouten[sp.fout] ? <p className="hub-fout">{fouten[sp.fout]}</p> : null}
              <button type="submit" className="btn btn-primair">bewaar mijn wachtwoord</button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
