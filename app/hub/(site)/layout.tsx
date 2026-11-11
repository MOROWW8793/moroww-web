import { Header, Footer } from '@/components/merk/Shell';
import { MerkTeken } from '@/components/merk/Logo';
import '@/components/merk/zwitsers.css';

export default function HubSite({ children }: { children: React.ReactNode }) {
  return (
    <div className="z z-hub">
      <Header
        home="/hub"
        merk={<MerkTeken merk="hub" op="licht" size={24} />}
        nav={[
          { href: '/hub/partners', label: 'partners' },
          { href: '/hub/academy', label: 'academy' },
          { href: '/hub/market', label: 'market' },
          { href: '/hub/property-managers', label: 'voor beheerders' },
          { href: '/hub/inloggen', label: 'inloggen' },
        ]}
        cta={{ href: '/hub/aanmelden', label: 'meld je aan' }}
      />
      <main>{children}</main>
      <Footer merk={<span>jij vraagt, wij regelen.</span>} />
    </div>
  );
}
