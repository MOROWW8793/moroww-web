-- Verblijfsbelasting per Belgische gemeente.
--
-- Voedt /kennis/verblijfsbelasting-vakantiewoning en de gemeentedetails
-- daaronder. Publieke lees-toegang: de anon key mag SELECT doen op deze
-- tabel, niets meer.
--
-- Bron per rij staat in reglement_url. Elke tariefwijziging is een UPDATE +
-- laatst_nagekeken_op bijstellen. Rijen worden nooit stilletjes verwijderd:
-- een gemeente die haar reglement afschaft, krijgt heffingsvorm = 'geen'.

do $$ begin
  create type heffingsvorm as enum (
    'per_persoon_per_nacht',
    'forfait_per_slaapplaats',
    'forfait_per_eenheid',
    'belasting_op_uitbating',
    'onbekend',
    'geen'
  );
exception when duplicate_object then null; end $$;

create table if not exists verblijfsbelasting (
  gemeente_slug         text primary key,
  gemeente_naam         text not null,
  provincie             text not null,
  heffingsvorm          heffingsvorm not null,
  tarief_bedrag         numeric,
  tarief_eenheid        text,
  tarief_bedrag_alt     numeric,
  tarief_eenheid_alt    text,
  doorrekenbaar_max     numeric,
  aangifte_frequentie   text,
  reglement_url         text,
  laatst_nagekeken_op   date not null default current_date,
  status                text
);

alter table verblijfsbelasting enable row level security;

drop policy if exists "publiek lezen" on verblijfsbelasting;
create policy "publiek lezen" on verblijfsbelasting for select using (true);

-- Seed. 12 gemeenten, aangeleverd 19-08-2026. Vier zonder tarief zijn open
-- vragen bij de dienst belastingen — hun rij bestaat wél zodat de hubpagina
-- toont dat we bezig zijn en waar de gast een mail kan sturen om ze aan te
-- vullen (zie kennisbank-pagina2-verblijfsbelasting.md, sectie "Wat je nog
-- moet opvragen").

insert into verblijfsbelasting (
  gemeente_slug, gemeente_naam, provincie, heffingsvorm,
  tarief_bedrag, tarief_eenheid, tarief_bedrag_alt, tarief_eenheid_alt,
  doorrekenbaar_max, aangifte_frequentie, reglement_url,
  laatst_nagekeken_op, status
) values
  ('oostende', 'Oostende', 'West-Vlaanderen', 'forfait_per_eenheid',
    825, 'EUR per kamer of verblijfseenheid per jaar (permanent aangeboden)',
    275, 'EUR per kamer of verblijfseenheid per jaar (occasionele verhuur, max. 120 dagen)',
    4.72, 'jaarlijks, betaalbaar per kwartaal',
    'https://www.oostende.be/verblijfsbelasting',
    '2026-08-19', 'bevestigd'),

  ('knokke-heist', 'Knokke-Heist', 'West-Vlaanderen', 'forfait_per_slaapplaats',
    250, 'EUR per slaapplaats per jaar (vakantiewoning)',
    500, 'EUR per slaapplaats per jaar (informeel logies)',
    null, 'jaarlijks',
    'https://www.knokke-heist.be/belasting-toeristische-logies',
    '2026-08-19', 'tarief 2024 — nieuw reglement 27-11-2025 na te kijken'),

  ('de-panne', 'De Panne', 'West-Vlaanderen', 'forfait_per_eenheid',
    null, 'zie reglement', null, null,
    1.00, 'jaarlijks',
    'https://www.depanne.be/nl/over-de-panne/beleidsdocumenten-reglementen/belastingen/overzicht-belastingen-retributies/belasting-op-een-toeristisch-logies',
    '2026-08-19', 'tarief op te vragen'),

  ('koksijde', 'Koksijde', 'West-Vlaanderen', 'belasting_op_uitbating',
    null, 'zie reglement', null, null,
    null, 'jaarlijks',
    null,
    '2026-08-19', 'ingevoerd 2026 — tarief op te vragen'),

  ('antwerpen', 'Antwerpen', 'Antwerpen', 'per_persoon_per_nacht',
    null, 'zie reglement (vrijstelling onder 12 jaar)', null, null,
    null, 'per kwartaal, binnen 14 dagen',
    'https://www.antwerpen.be/product/belasting-op-overnachtingen-in-toeristische-logies',
    '2026-08-19', 'vorm bevestigd — tarief na te kijken'),

  ('deinze', 'Deinze', 'Oost-Vlaanderen', 'per_persoon_per_nacht',
    null, 'zie reglement', null, null,
    null, 'per semester, binnen 14 dagen',
    'https://www.deinze.be/belasting-op-toeristische-logies',
    '2026-08-19', 'vorm bevestigd — tarief na te kijken'),

  ('sint-martens-latem', 'Sint-Martens-Latem', 'Oost-Vlaanderen', 'per_persoon_per_nacht',
    2.83, 'EUR per overnachting', null, null,
    null, 'per aangifteformulier',
    'https://www.sint-martens-latem.be',
    '2026-08-19', 'reglement 2021-2025 — verlenging na te kijken'),

  ('beringen', 'Beringen', 'Limburg', 'per_persoon_per_nacht',
    1.50, 'EUR per toerist per overnachting', null, null,
    null, 'per kwartaal',
    'https://www.beringen.be',
    '2026-08-19', 'bevestigd (aanslagjaren 2026-2031)'),

  ('aalter', 'Aalter', 'Oost-Vlaanderen', 'onbekend',
    null, null, null, null,
    null, 'jaarlijkse aangifte toegestuurd',
    'https://www.aalter.be/belastingen',
    '2026-08-19', 'op te vragen bij dienst belastingen'),

  ('wingene', 'Wingene', 'West-Vlaanderen', 'onbekend',
    null, null, null, null,
    null, 'jaarlijks',
    'https://www.wingene.be/belasting-op-tweede-verblijven',
    '2026-08-19', 'op te vragen bij dienst belastingen'),

  ('beernem', 'Beernem', 'West-Vlaanderen', 'onbekend',
    null, null, null, null,
    null, null,
    'https://www.beernem.be',
    '2026-08-19', 'op te vragen bij dienst belastingen'),

  ('brakel', 'Brakel', 'Oost-Vlaanderen', 'onbekend',
    null, null, null, null,
    null, null,
    null,
    '2026-08-19', 'op te vragen bij dienst belastingen')
on conflict (gemeente_slug) do nothing;
