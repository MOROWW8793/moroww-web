// Supabase voor moroww hub: inloggen met een link per e-mail (Supabase Auth),
// sessie in cookies via @supabase/ssr. Beheer gebruikt de service role.
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function hubClient() {
  const store = await cookies();
  return createServerClient(URL, ANON, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (lijst: { name: string; value: string; options: CookieOptions }[]) => {
        try {
          lijst.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // In een server component mag je geen cookies zetten; de middleware vernieuwt ze.
        }
      },
    },
  });
}

export function hubBeheerClient() {
  return createClient(URL, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
}

export type Rol = 'lid' | 'partner';
export type Status = 'aangevraagd' | 'actief' | 'geweigerd';

export interface Profiel {
  id: string;
  email: string;
  naam: string;
  rol: Rol;
  soort: 'eigenaar' | 'property-manager' | 'partner';
  status: Status;
  huis: string | null;
  bedrijf: string | null;
  telefoon: string | null;
  bericht: string | null;
  created_at: string;
}

export function beheerders(): string[] {
  return (process.env.HUB_BEHEERDERS || 'info@moroww.com')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function hubSessie() {
  const sb = await hubClient();
  const { data } = await sb.auth.getUser();
  const user = data.user;
  if (!user) return { sb, user: null, profiel: null as Profiel | null, beheerder: false };
  const { data: profiel } = await sb.from('hub_profielen').select('*').eq('id', user.id).maybeSingle();
  const beheerder = !!user.email && beheerders().includes(user.email.toLowerCase());
  return { sb, user, profiel: (profiel as Profiel | null) ?? null, beheerder };
}

export const soortNaam: Record<string, string> = {
  eigenaar: 'eigenaar of host',
  'property-manager': 'property manager',
  partner: 'merk of vakman',
};

export const categorieNaam: Record<string, string> = {
  tools: 'tools en software',
  huis: 'in het huis',
  stil: 'slimme toestellen',
  vakmensen: 'vakmensen',
};

export function tekst(v: FormDataEntryValue | null, max = 500): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export function datumNL(iso: string, metUur = false): string {
  const d = new Date(iso);
  return d.toLocaleDateString('nl-BE', {
    weekday: metUur ? 'long' : undefined,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(metUur ? { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels' } : {}),
  });
}

// Een datetime-local uit het beheer ('2027-01-28T19:00') is Brusselse tijd.
export function brusselNaarISO(v: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(v);
  if (!m) return null;
  const [, j, mo, d, u, mi] = m.map(Number);
  const gok = Date.UTC(j, mo - 1, d, u, mi);
  const inBrussel = new Date(new Date(gok).toLocaleString('en-US', { timeZone: 'Europe/Brussels' }));
  const inUtc = new Date(new Date(gok).toLocaleString('en-US', { timeZone: 'UTC' }));
  const verschil = inBrussel.getTime() - inUtc.getTime();
  return new Date(gok - verschil).toISOString();
}

// Voor pagina's binnen de ledenzone: alleen actieve leden, anders naar inloggen of de aanvraag.
export async function eisLid(naar: string) {
  const { redirect } = await import('next/navigation');
  const s = await hubSessie();
  if (!s.user) redirect(`/hub/inloggen?naar=${naar}`);
  if (s.profiel?.status !== 'actief') redirect('/hub/leden');
  return s as typeof s & { user: NonNullable<typeof s.user>; profiel: Profiel };
}
