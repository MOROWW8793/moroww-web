// moroww hub · vraag het moroww: gedeelde types, namen en berichten.
import { hubBeheerClient } from '@/lib/hub/supabase';

export type VraagStatus = 'binnen' | 'ingepland' | 'geregeld' | 'lukt-niet';

export interface Vraag {
  id: string;
  eigenaar: string | null;
  eigenaar_naam: string | null;
  huis: string;
  soort: string;
  wat: string;
  tegen: string | null;
  kanaal: string;
  status: VraagStatus;
  partner_id: string | null;
  ingepland_om: string | null;
  geregeld_om: string | null;
  foto: string | null;
  score: number | null;
  created_at: string;
}

export interface VraagUpdate { id: string; vraag_id: string; wie: 'jij' | 'moroww' | 'partner'; tekst: string; foto: string | null; created_at: string }

export const soorten: { sleutel: string; label: string; voorbeeld: string }[] = [
  { sleutel: 'schoonmaak', label: 'extra schoonmaak', voorbeeld: 'Een extra schoonmaak tussen twee verblijven.' },
  { sleutel: 'ramen', label: 'ramen', voorbeeld: 'Kunnen de ramen gepoetst zijn? Er komen gasten.' },
  { sleutel: 'herstelling', label: 'herstelling', voorbeeld: 'Er moet iets hersteld worden: ' },
  { sleutel: 'linnen', label: 'extra linnen', voorbeeld: 'Extra linnen voor een grotere groep.' },
  { sleutel: 'koelkast', label: 'koelkast vullen', voorbeeld: 'De koelkast vullen voor de aankomst van de gasten.' },
  { sleutel: 'tuin', label: 'tuin en terras', voorbeeld: 'De tuin en het terras netjes maken voor het weekend.' },
  { sleutel: 'andere', label: 'iets anders', voorbeeld: '' },
];

export const soortLabel = (s: string) => soorten.find((x) => x.sleutel === s)?.label ?? s;

export const statusNaam: Record<VraagStatus, string> = {
  binnen: 'binnen',
  ingepland: 'ingepland',
  geregeld: 'geregeld',
  'lukt-niet': 'lukt niet',
};

export const kanaalNaam: Record<string, string> = { hub: 'de hub', whatsapp: 'WhatsApp', telefoon: 'telefoon', mail: 'mail' };

function brussel(iso: string) {
  const d = new Date(iso);
  const deel = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('nl-BE', { timeZone: 'Europe/Brussels', ...o }).format(d);
  return { d, uur: deel({ hour: '2-digit', minute: '2-digit' }).replace(':', 'u'), dag: deel({ weekday: 'long' }), datum: deel({ day: 'numeric', month: 'long' }) };
}

// "vandaag om 17u30", "morgen om 8u30", "zaterdag 14 november om 13u30"
export function wanneer(iso: string): string {
  const b = brussel(iso);
  const sleutel = (x: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Brussels' }).format(x);
  const vandaag = sleutel(new Date());
  const morgen = sleutel(new Date(Date.now() + 864e5));
  const dezeDag = sleutel(b.d);
  if (dezeDag === vandaag) return `vandaag om ${b.uur}`;
  if (dezeDag === morgen) return `morgen om ${b.uur}`;
  return `${b.dag} ${b.datum} om ${b.uur}`;
}

export function kort(iso: string): string {
  const b = brussel(iso);
  return `${b.datum} · ${b.uur}`;
}

export function duur(ms: number): string {
  const min = Math.round(ms / 60000);
  if (min < 60) return `${min} min`;
  const u = Math.round(min / 60);
  if (u < 48) return `${u} u`;
  return `${Math.round(u / 24)} dagen`;
}

// Standaardteksten voor de tijdlijn; moroww kan ze aanpassen voor ze vertrekken.
export const berichten = {
  binnen: 'Je vraag is binnen. We zoeken een partner dicht bij het huis en laten je weten wanneer het ingepland is.',
  ingepland: (partner: string, om: string | null) => `Ingepland. ${partner} komt ${om ? wanneer(om) : 'zo snel mogelijk'}. We laten je weten wanneer het klaar is.`,
  geregeld: 'Het is gebeurd. Je hoeft niets meer te doen.',
  luktNiet: (tegen: string | null) =>
    `Dit lukt niet${tegen ? ` tegen ${wanneer(tegen)}` : ''}. We zeggen het je liever meteen, dan kan je nog schakelen. We bellen je om samen een oplossing te zoeken.`,
};

// Tijdelijke links voor foto's in de privé-opslag.
export async function fotoLinks(paden: (string | null | undefined)[]): Promise<Map<string, string>> {
  const uniek = [...new Set(paden.filter((p): p is string => !!p))];
  const kaart = new Map<string, string>();
  if (!uniek.length) return kaart;
  const { data } = await hubBeheerClient().storage.from('hub-fotos').createSignedUrls(uniek, 60 * 60);
  (data ?? []).forEach((r) => { if (r.path && r.signedUrl) kaart.set(r.path, r.signedUrl); });
  return kaart;
}

export async function bewaarFoto(vraagId: string, bestand: FormDataEntryValue | null): Promise<string | null> {
  if (!bestand || typeof bestand === 'string' || bestand.size === 0) return null;
  if (!bestand.type.startsWith('image/') || bestand.size > 12 * 1024 * 1024) return null;
  const ext = (bestand.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const pad = `${vraagId}/${Date.now()}.${ext}`;
  const { error } = await hubBeheerClient()
    .storage.from('hub-fotos')
    .upload(pad, Buffer.from(await bestand.arrayBuffer()), { contentType: bestand.type, upsert: false });
  return error ? null : pad;
}
