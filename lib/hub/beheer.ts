import { redirect } from 'next/navigation';
import { hubSessie, hubBeheerClient } from '@/lib/hub/supabase';

export async function eisBeheer(naar = '/hub/beheer') {
  const s = await hubSessie();
  if (!s.user) redirect(`/hub/inloggen?naar=${naar}`);
  if (!s.beheerder) redirect('/hub/leden');
  return { ...s, db: hubBeheerClient() };
}
