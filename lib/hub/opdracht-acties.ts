'use server';

// Regie: een vraag als opdracht naar een partner sturen.
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { eisBeheer } from '@/lib/hub/beheer';
import { tekst } from '@/lib/hub/supabase';
import { basisUrl } from '@/lib/hub/toegang';
import { stuurOpdracht } from '@/lib/hub/opdrachten';
import type { Vraag } from '@/lib/hub/vragen';

export async function stuurNaarPartner(formData: FormData) {
  const id = tekst(formData.get('id'), 60);
  const { db } = await eisBeheer(`/hub/beheer/vragen/${id}`);
  const { data: v } = await db.from('hub_vragen').select('*').eq('id', id).maybeSingle();
  if (!v) redirect('/hub/beheer/vragen');
  const partner = tekst(formData.get('partner'), 60);
  const minuten = Number(tekst(formData.get('minuten'), 5)) || 30;
  const uitkomst = partner ? await stuurOpdracht(db, v as Vraag, partner, minuten, tekst(formData.get('bericht'), 1000) || null, await basisUrl()) : 'fout';
  revalidatePath(`/hub/beheer/vragen/${id}`);
  redirect(`/hub/beheer/vragen/${id}?opdracht=${uitkomst}`);
}
