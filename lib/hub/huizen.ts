// moroww hub · huizen per lid: wat moroww en de partner nodig hebben voor een opdracht.
import { tekst } from '@/lib/hub/supabase';

export interface Huis {
  id: string;
  profiel_id: string;
  naam: string;
  adres: string;
  postcode: string;
  gemeente: string;
  slaapkamers: number | null;
  badkamers: number | null;
  bedden: string | null;
  toegang: string | null;
  parkeren: string | null;
  contact_naam: string | null;
  contact_telefoon: string | null;
  opmerkingen: string | null;
}

const getal = (v: FormDataEntryValue | null) => {
  const n = Number(tekst(v, 3));
  return Number.isInteger(n) && n >= 0 && n <= 50 && tekst(v, 3) !== '' ? n : null;
};

export function huisVelden(f: FormData) {
  return {
    naam: tekst(f.get('naam'), 120),
    adres: tekst(f.get('adres'), 200),
    postcode: tekst(f.get('postcode'), 12),
    gemeente: tekst(f.get('gemeente'), 80),
    slaapkamers: getal(f.get('slaapkamers')),
    badkamers: getal(f.get('badkamers')),
    bedden: tekst(f.get('bedden'), 300) || null,
    toegang: tekst(f.get('toegang'), 1000) || null,
    parkeren: tekst(f.get('parkeren'), 300) || null,
    contact_naam: tekst(f.get('contact_naam'), 120) || null,
    contact_telefoon: tekst(f.get('contact_telefoon'), 40) || null,
    opmerkingen: tekst(f.get('opmerkingen'), 2000) || null,
  };
}

// Zoals het huis in een vraag en in de regie heet.
export const huisLabel = (h: Pick<Huis, 'naam' | 'gemeente'>) => `${h.naam}, ${h.gemeente}`;

// De regels voor het dossier, alleen wat ingevuld is.
export function huisRegels(h: Huis): [string, string][] {
  const kamers = [h.slaapkamers != null ? `${h.slaapkamers} slaapkamers` : '', h.badkamers != null ? `${h.badkamers} badkamers` : ''].filter(Boolean).join(' · ');
  const contact = [h.contact_naam, h.contact_telefoon].filter(Boolean).join(' · ');
  return ([
    ['adres', `${h.adres}, ${h.postcode} ${h.gemeente}`],
    ['kamers', kamers],
    ['bedden', h.bedden ?? ''],
    ['toegang', h.toegang ?? ''],
    ['parkeren', h.parkeren ?? ''],
    ['contact ter plaatse', contact],
    ['nog te weten', h.opmerkingen ?? ''],
  ] as [string, string][]).filter(([, v]) => v);
}
