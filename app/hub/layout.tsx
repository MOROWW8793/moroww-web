import type { Metadata } from 'next';
import { Header, Footer } from '@/components/merk/Shell';
import { MerkTeken } from '@/components/merk/Logo';
import { Analytics } from '@vercel/analytics/next';
import '@fontsource/fraunces/300.css';
import '@fontsource/fraunces/300-italic.css';
import '@fontsource/fraunces/400.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/inter-tight/300.css';
import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
import '@/components/merk/merk.css';


export const metadata: Metadata = {
  title: { default: 'moroww hub · where the stay stays.', template: '%s · moroww hub' },
  description: 'De plek van de moroww-familie: partners en tools voor eigenaars, de academy voor hosts en de market voor gasten.',
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
    <div className="merk merk-hub">
      <Header
        donker
        home="/hub"
        merk={<MerkTeken merk="hub" op="donker" size={26} />}
        nav={[
          { href: '/hub/partners', label: 'partners' },
          { href: '/hub/academy', label: 'academy' },
          { href: '/hub/market', label: 'market' },
          { href: '/hub/property-managers', label: 'property managers' },
        ]}
        cta={{ href: '/hub/lid-worden', label: 'lid worden' }}
      />
      <main>{children}</main>
      <Footer donker merk={<span>where the stay stays.</span>} />
    </div>
        <Analytics />
      </body>
    </html>
  );
}
