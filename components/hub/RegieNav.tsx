import Link from 'next/link';

export function RegieNav({ actief }: { actief: 'vragen' | 'rest' }) {
  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 15 }}>
      <Link href="/hub/beheer/vragen" aria-current={actief === 'vragen' ? 'page' : undefined} style={{ fontWeight: actief === 'vragen' ? 500 : 400 }}>vragen opvolgen</Link>
      <Link href="/hub/beheer" aria-current={actief === 'rest' ? 'page' : undefined} style={{ fontWeight: actief === 'rest' ? 500 : 400 }}>leden, partners, academy</Link>
    </div>
  );
}
