import { headers } from 'next/headers';

export const veiligNaar = (naar: string) => (/^\/hub\/(leden|partner|beheer)(\/[\w/-]*)?$/.test(naar) ? naar : '/hub/leden');
export const geldigEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
export const MIN_WACHTWOORD = 8;

export async function basisUrl() {
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host');
  const proto = h.get('x-forwarded-proto') || 'https';
  return `${proto}://${host}`;
}
