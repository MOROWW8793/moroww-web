import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Sectie } from '@/components/merk/Shell';
import { LedenNav } from '@/components/hub/LedenNav';
import { hubSessie, hubBeheerClient, tekst, datumNL } from '@/lib/hub/supabase';

export const metadata: Metadata = { title: 'community', robots: { index: false } };
export const dynamic = 'force-dynamic';

interface Bericht { id: string; parent_id: string | null; auteur: string; auteur_naam: string; titel: string | null; tekst: string; created_at: string }

async function antwoord(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await hubSessie();
  if (!user || profiel?.status !== 'actief') redirect('/hub/leden');
  const parent = tekst(formData.get('parent'), 60);
  const inhoud = tekst(formData.get('tekst'), 5000);
  if (inhoud) await sb.from('hub_berichten').insert({ parent_id: parent, auteur: user.id, auteur_naam: profiel.naam, tekst: inhoud });
  revalidatePath(`/hub/leden/community/${parent}`);
}

async function verwijder(formData: FormData) {
  'use server';
  const { sb, user, beheerder } = await hubSessie();
  if (!user) redirect('/hub/inloggen');
  const id = tekst(formData.get('id'), 60);
  const terug = tekst(formData.get('terug'), 60);
  // Een lid verwijdert zijn eigen bericht; beheer mag elk bericht verwijderen.
  if (beheerder) await hubBeheerClient().from('hub_berichten').delete().eq('id', id);
  else await sb.from('hub_berichten').delete().eq('id', id).eq('auteur', user.id);
  if (terug) {
    revalidatePath(`/hub/leden/community/${terug}`);
    redirect(`/hub/leden/community/${terug}`);
  }
  redirect('/hub/leden/community');
}

export default async function Draad({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { sb, user, profiel, beheerder } = await hubSessie();
  if (!user) redirect(`/hub/inloggen?naar=/hub/leden/community/${id}`);
  if (profiel?.status !== 'actief') redirect('/hub/leden');

  const { data: vraag } = await sb.from('hub_berichten').select('*').eq('id', id).is('parent_id', null).maybeSingle();
  if (!vraag) notFound();
  const { data: antwoorden } = await sb.from('hub_berichten').select('*').eq('parent_id', id).order('created_at');
  const v = vraag as Bericht;

  const knop = (b: Bericht, terug: string) =>
    b.auteur === user.id || beheerder ? (
      <form action={verwijder}>
        <input type="hidden" name="id" value={b.id} />
        <input type="hidden" name="terug" value={terug} />
        <button type="submit" className="hub-linkknop" style={{ padding: 0, fontSize: 14 }}>verwijderen</button>
      </form>
    ) : null;

  return (
    <>
      <LedenNav actief="community" partner={profiel.rol === 'partner'} beheerder={beheerder} />
      <Sectie>
        <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Link href="/hub/leden/community" className="hub-meta">terug naar de community</Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h1 className="titel-2">{v.titel}</h1>
            <span className="hub-meta">{v.auteur_naam} · {datumNL(v.created_at)}</span>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{v.tekst}</p>
            {knop(v, '')}
          </div>
          <div className="hub-draad">
            {((antwoorden as Bericht[] | null) ?? []).map((a) => (
              <div key={a.id} className="hub-bericht">
                <span className="hub-meta">{a.auteur_naam} · {datumNL(a.created_at)}</span>
                <p>{a.tekst}</p>
                {knop(a, id)}
              </div>
            ))}
          </div>
          <form action={antwoord} className="hub-form" style={{ maxWidth: 760 }}>
            <input type="hidden" name="parent" value={id} />
            <label htmlFor="tekst">je antwoord</label>
            <textarea id="tekst" name="tekst" required maxLength={5000} />
            <button type="submit" className="btn btn-primair">antwoord</button>
          </form>
        </div>
      </Sectie>
    </>
  );
}
