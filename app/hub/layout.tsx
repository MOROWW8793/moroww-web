import type { Metadata } from 'next';
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
  description: 'Vraag het moroww: eigenaars en property managers met het label vragen wat hun huis nodig heeft, moroww regelt het met een partner in de buurt.',
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
    <div className="merk merk-hub">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
