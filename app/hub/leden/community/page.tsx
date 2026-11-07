import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Sectie, Kop } from '@/components/merk/Shell';
import { LedenNav } from '@/components/hub/LedenNav';
import { hubSessie, tekst, datumNL } from '@/lib/hub/supabase';

export const metadata: Metadata = { title: 'community', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function nieuweVraag(formData: FormData) {
  'use server';
  const { sb, user, profiel } = await hubSessie();
  if (!user || profiel?.status !== 'actief') redirect('/hub/leden');
  const titel = tekst(formData.get('titel'), 140);
  const inhoud = tekst(formData.get('tekst'), 5000);
  if (!titel || !inhoud) redirect('/hub/leden/community?fout=leeg');
  const { data, error } = await sb
    .from('hub_berichten')
    .insert({ auteur: user.id, auteur_naam: profiel.naam, titel, tekst: inhoud })
    .select('id')
    .single();
  if (error || !data) redirect('/hub/leden/community?fout=opslaan');
  redirect(`/hub/leden/community/${data.id}`);
}

interface Draad { id: string; titel: string | null; tekst: string; auteur_naam: string; created_at: string }

export default async function Community({ searchParams }: { searchParams: Promise<{ fout?: string }> }) {
  const sp = await searchParams;
  const { sb, user, profiel, beheerder } = await hubSessie();
  if (!user) redirect('/hub/inloggen?naar=/hub/leden/community');
  if (profiel?.status !== 'actief') redirect('/hub/leden');

  const [{ data: draden }, { data: antwoorden }] = await Promise.all([
    sb.from('hub_berichten').select('id,titel,tekst,auteur_naam,created_at').is('parent_id', null).order('created_at', { ascending: false }).limit(50),
    sb.from('hub_berichten').select('parent_id').not('parent_id', 'is', null),
  ]);
  const aantal = new Map<string, number>();
  (antwoorden ?? []).forEach((a: { parent_id: string }) => aantal.set(a.parent_id, (aantal.get(a.parent_id) ?? 0) + 1));

  return (
    <>
      <LedenNav actief="community" partner={profiel.rol === 'partner'} beheerder={beheerder} />
      <Sectie>
        <div className="rij">
          <div className="smal" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Kop boven="community" titel={<>hosts <i>voor hosts.</i></>} tekst="Een vraag over je huis, je gasten, de regels of een partner? Andere leden en moroww antwoorden." />
            <form action={nieuweVraag} className="hub-form">
              <label htmlFor="titel">je vraag, in één zin</label>
              <input id="titel" name="titel" required maxLength={140} />
              <label htmlFor="tekst">meer uitleg</label>
              <textarea id="tekst" name="tekst" required maxLength={5000} />
              {sp.fout === 'leeg' ? <p className="hub-fout">Vul je vraag en de uitleg in.</p> : null}
              {sp.fout === 'opslaan' ? <p className="hub-fout">Opslaan lukte niet. Probeer het opnieuw.</p> : null}
              <button type="submit" className="btn btn-primair">stel je vraag</button>
            </form>
          </div>
          <div className="breed">
            {(draden as Draad[] | null)?.length ? (
              <div className="hub-draad">
                {(draden as Draad[]).map((d) => (
                  <Link key={d.id} href={`/hub/leden/community/${d.id}`}>
                    <h2 className="kaart-titel" style={{ fontSize: 22 }}>{d.titel || 'zonder titel'}</h2>
                    <span className="hub-meta">
                      {d.auteur_naam} · {datumNL(d.created_at)} · {aantal.get(d.id) ?? 0} {aantal.get(d.id) === 1 ? 'antwoord' : 'antwoorden'}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="hub-leeg">Nog geen vragen. Stel de eerste.</p>
            )}
          </div>
        </div>
      </Sectie>
    </>
  );
}
