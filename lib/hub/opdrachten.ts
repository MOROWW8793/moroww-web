// moroww hub · opdrachten: een vraag gaat naar een partner, die aanvaardt of
// weigert via een link. Werkt voor partners met en zonder login.
import type { SupabaseClient } from '@supabase/supabase-js';
import { hubBeheerClient } from '@/lib/hub/supabase';
import { soortLabel, wanneer, berichten, type Vraag } from '@/lib/hub/vragen';
import { mailOpdracht, mailVraag, meldBeheer } from '@/lib/hub/mail';
import type { Huis } from '@/lib/hub/huizen';

export type OpdrachtStatus = 'verstuurd' | 'aanvaard' | 'geweigerd' | 'verlopen' | 'ingetrokken';

export interface Opdracht {
  id: string;
  vraag_id: string;
  partner_id: string;
  token: string;
  status: OpdrachtStatus;
  bericht: string | null;
  antwoord: string | null;
  verstuurd_om: string;
  vervalt_om: string | null;
  antwoord_om: string | null;
}

export interface DienstPartner {
  id: string;
  naam: string;
  vak: string | null;
  regio: string | null;
  telefoon: string | null;
  email: string | null;
  kanaal: 'mail' | 'login';
  preferred: boolean;
}

export const opdrachtStatusNaam: Record<OpdrachtStatus, string> = {
  verstuurd: 'wacht op antwoord',
  aanvaard: 'aanvaard',
  geweigerd: 'kan niet',
  verlopen: 'geen antwoord',
  ingetrokken: 'ingetrokken',
};

// De eigenaar heeft binnen de 2 uur een antwoord, ook als we niemand vinden.
export const BELOFTE_MS = 2 * 60 * 60 * 1000;
export const restVanBelofte = (vraag: Pick<Vraag, 'created_at'>, nu = Date.now()) => new Date(vraag.created_at).getTime() + BELOFTE_MS - nu;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Stuurt de opdracht naar één partner. In de mail staan soort, plaats en vraag;
// adres en toegang volgen pas na het aanvaarden.
export async function stuurOpdracht(db: SupabaseClient, vraag: Vraag, partnerId: string, minuten: number, bericht: string | null, basis: string): Promise<'ok' | 'geen-mail' | 'fout'> {
  const { data: p } = await db.from('hub_partners').select('id,naam,email').eq('id', partnerId).maybeSingle();
  const partner = p as { id: string; naam: string; email: string | null } | null;
  if (!partner) return 'fout';
  if (!partner.email) return 'geen-mail';
  const vervalt = new Date(Date.now() + Math.min(Math.max(minuten, 10), 24 * 60) * 60000).toISOString();
  const { data, error } = await db
    .from('hub_opdrachten')
    .insert({ vraag_id: vraag.id, partner_id: partner.id, bericht, vervalt_om: vervalt })
    .select('token')
    .single();
  if (error || !data) return 'fout';
  await mailOpdracht(partner.email, {
    soort: soortLabel(vraag.soort),
    huis: vraag.huis,
    wat: vraag.wat,
    tegen: vraag.tegen ? wanneer(vraag.tegen) : null,
    vervalt: wanneer(vervalt),
    bericht,
    link: `${basis}/hub/opdracht/${data.token}`,
  });
  return 'ok';
}

export interface OpdrachtDossier {
  opdracht: Opdracht;
  vraag: Vraag;
  partner: { id: string; naam: string };
  huis: Huis | null;
}

// Leest een opdracht op haar token. Een opdracht waarvan de termijn voorbij is,
// wordt hier op 'verlopen' gezet.
export async function leesOpdracht(token: string): Promise<OpdrachtDossier | null> {
  if (!UUID.test(token)) return null;
  const db = hubBeheerClient();
  const { data: o } = await db.from('hub_opdrachten').select('*').eq('token', token).maybeSingle();
  if (!o) return null;
  let opdracht = o as Opdracht;
  if (opdracht.status === 'verstuurd' && opdracht.vervalt_om && new Date(opdracht.vervalt_om).getTime() < Date.now()) {
    await db.from('hub_opdrachten').update({ status: 'verlopen' }).eq('id', opdracht.id).eq('status', 'verstuurd');
    opdracht = { ...opdracht, status: 'verlopen' };
  }
  const [{ data: v }, { data: p }] = await Promise.all([
    db.from('hub_vragen').select('*').eq('id', opdracht.vraag_id).maybeSingle(),
    db.from('hub_partners').select('id,naam').eq('id', opdracht.partner_id).maybeSingle(),
  ]);
  if (!v || !p) return null;
  const vraag = v as Vraag;
  const { data: h } = vraag.huis_id ? await db.from('hub_huizen').select('*').eq('id', vraag.huis_id).maybeSingle() : { data: null };
  return { opdracht, vraag, partner: p as { id: string; naam: string }, huis: (h as Huis | null) ?? null };
}

// De partner antwoordt. Aanvaarden plant de vraag in, trekt de andere open
// opdrachten in en laat de eigenaar en moroww het weten.
export async function beantwoordOpdracht(token: string, ja: boolean, antwoord: string, komtOm: string | null): Promise<OpdrachtStatus | null> {
  const dossier = await leesOpdracht(token);
  if (!dossier) return null;
  const { opdracht, vraag, partner } = dossier;
  if (opdracht.status !== 'verstuurd') return opdracht.status;
  const db = hubBeheerClient();
  const nu = new Date().toISOString();

  if (!ja) {
    await db.from('hub_opdrachten').update({ status: 'geweigerd', antwoord: antwoord || null, antwoord_om: nu }).eq('id', opdracht.id).eq('status', 'verstuurd');
    await meldBeheer(`${partner.naam} kan niet · ${vraag.huis}`, [['vraag', vraag.wat], ['reden', antwoord], ['volgende stap', 'stuur de opdracht naar een andere partner']]);
    return 'geweigerd';
  }

  // Alleen een vraag die nog geen partner heeft, kan aanvaard worden.
  const { data: vast } = await db
    .from('hub_vragen')
    .update({ partner_id: partner.id, status: 'ingepland', ingepland_om: komtOm })
    .eq('id', vraag.id)
    .eq('status', 'binnen')
    .select('id');
  if (!vast?.length) {
    await db.from('hub_opdrachten').update({ status: 'ingetrokken', antwoord_om: nu }).eq('id', opdracht.id);
    return 'ingetrokken';
  }
  await db.from('hub_opdrachten').update({ status: 'aanvaard', antwoord: antwoord || null, antwoord_om: nu }).eq('id', opdracht.id);
  await db.from('hub_opdrachten').update({ status: 'ingetrokken' }).eq('vraag_id', vraag.id).eq('status', 'verstuurd').neq('id', opdracht.id);

  const tekst = berichten.ingepland(partner.naam, komtOm);
  await db.from('hub_vraag_updates').insert({ vraag_id: vraag.id, wie: 'moroww', tekst });
  if (vraag.eigenaar) {
    const { data: lid } = await db.from('hub_profielen').select('email,naam').eq('id', vraag.eigenaar).maybeSingle();
    if (lid) await mailVraag(lid.email, lid.naam, vraag.huis, tekst, false);
  }
  await meldBeheer(`${partner.naam} aanvaardt · ${vraag.huis}`, [['vraag', vraag.wat], ['komt', komtOm ? wanneer(komtOm) : 'moment nog af te spreken'], ['opmerking', antwoord]]);
  return 'aanvaard';
}
