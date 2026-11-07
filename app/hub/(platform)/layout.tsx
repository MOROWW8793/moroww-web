import Link from 'next/link';
import type { Metadata } from 'next';
import { MerkTeken } from '@/components/merk/Logo';
import { PlatNav } from '@/components/hub/PlatNav';
import { hubSessie, hubBeheerClient } from '@/lib/hub/supabase';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function HubPlatform({ children }: { children: React.ReactNode }) {
  const { user, profiel, beheerder } = await hubSessie();

  if (!user || profiel?.status !== 'actief') {
    return (
      <div className="plat plat-los">
        <header className="plat-los-kop">
          <Link href="/hub" className="plat-logo" aria-label="moroww hub"><MerkTeken merk="hub" op="donker" size={26} /></Link>
          <Link href="/hub" className="plat-terug">naar moroww hub</Link>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  let open = 0;
  if (beheerder) {
    const { count } = await hubBeheerClient().from('hub_vragen').select('id', { count: 'exact', head: true }).in('status', ['binnen', 'ingepland']);
    open = count ?? 0;
  }

  return (
    <div className="plat plat-app">
      <PlatNav
        naam={profiel.naam}
        huis={profiel.huis}
        beheerder={beheerder}
        open={open}
        telefoon={site.contact.telefoon}
      />
      <main className="plat-main">{children}</main>
    </div>
  );
}
