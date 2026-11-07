import { Header, Footer } from '@/components/merk/Shell';
import { MerkTeken } from '@/components/merk/Logo';

export default function HubSite({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        donker
        home="/hub"
        merk={<MerkTeken merk="hub" op="donker" size={26} />}
        nav={[
          { href: '/hub/partners', label: 'partners' },
          { href: '/hub/academy', label: 'academy' },
          { href: '/hub/market', label: 'market' },
          { href: '/hub/property-managers', label: 'property managers' },
          { href: '/hub/leden', label: 'inloggen' },
        ]}
        cta={{ href: '/hub/lid-worden', label: 'lid worden' }}
      />
      <main>{children}</main>
      <Footer donker merk={<span>where the stay stays.</span>} />
    </>
  );
}
