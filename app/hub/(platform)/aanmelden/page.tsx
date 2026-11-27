import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { hubClient, hubBeheerClient, hubSessie, tekst } from '@/lib/hub/supabase';
import { basisUrl, geldigEmail, MIN_WACHTWOORD } from '@/lib/hub/toegang';
import { meldBeheer } from '@/lib/hub/mail';
import { AanmeldStappen } from '@/components/hub/AanmeldStappen';
import { AanvraagBinnen } from '@/components/hub/AanvraagBinnen';

export const metadata: Metadata = { title: 'meld je aan', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function meldAan(formData: FormData) {
  'use server';
  const email = tekst(formData.get('email'), 200).toLowerCase();
  const wachtwoord = String(formData.get('wachtwoord') ?? '');
  const naam = tekst(formData.get('naam'), 120);
  const soort = tekst(formData.get('soort'), 30) === 'property-manager' ? 'property-manager' : 'eigenaar';
  const telefoon = tekst(formData.get('telefoon'), 40) || null;
  const aantal = Number(tekst(formData.get('aantal'), 4));
  const huizen = Number.isInteger(aantal) && aantal > 0 ? String(aantal) : '';
  const streek = tekst(formData.get('streek'), 200);
  const huis = streek || null;
  const bericht = [huizen ? `aantal huizen: ${huizen}` : '', streek ? `streek: ${streek}` : ''].filter(Boolean).join('\n');

  if (!naam) redirect('/hub/aanmelden?fout=naam');
  if (!geldigEmail(email)) redirect('/hub/aanmelden?fout=email');
  if (wachtwoord.length < MIN_WACHTWOORD) redirect('/hub/aanmelden?fout=kort');

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
      telefoon,
      bericht: bericht || null,
    },
    { onConflict: 'id', ignoreDuplicates: true },
  );
  await meldBeheer(`nieuwe aanmelding · ${naam}`, [
    ['soort', soort],
    ['e-mail', email],
    ['aantal huizen', huizen],
    ['streek', streek],
    ['telefoon', telefoon ?? ''],
  ]);
  if (data.session) redirect('/hub/leden');
  redirect('/hub/aanmelden?verstuurd=1');
}

const fouten: Record<string, string> = {
  naam: 'Vul je naam in.',
  email: 'Dat e-mailadres klopt niet.',
  kort: `Kies een wachtwoord van minstens ${MIN_WACHTWOORD} tekens.`,
  zwak: 'Dat wachtwoord is te makkelijk te raden. Kies een ander.',
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
      <AanvraagBinnen
        titel="bedankt. je aanvraag is binnen."
        inleiding="Bevestig eerst je e-mailadres met de link die we je net stuurden. Je hoort daarna van ons binnen enkele werkdagen."
        voet={<Link href="/hub" className="btn btn-lijn">naar moroww hub</Link>}
      />
    );
  }

  const fout = sp.fout ? fouten[sp.fout] : undefined;
  return <AanmeldStappen actie={meldAan} fout={fout} startOp={sp.fout === 'naam' ? 2 : 1} minWachtwoord={MIN_WACHTWOORD} />;
}
