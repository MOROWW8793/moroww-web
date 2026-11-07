-- moroww hub · vraag het moroww
-- Eigenaars stellen een vraag (schoonmaak, ramen, herstelling, linnen ...).
-- moroww zoekt een partner, plant in, volgt op en sluit af met een foto.
-- Partners loggen hiervoor niet in: moroww zet de updates in de regie (/hub/beheer).
-- Uitvoeren na 004_hub_platform.sql.

-- ---------- partners: extra velden voor diensten en merken ----------
alter table public.hub_partners add column if not exists soort text not null default 'dienst';
alter table public.hub_partners drop constraint if exists hub_partners_soort_check;
alter table public.hub_partners add constraint hub_partners_soort_check check (soort in ('dienst', 'merk'));
alter table public.hub_partners add column if not exists vak text;
alter table public.hub_partners add column if not exists regio text;
alter table public.hub_partners add column if not exists telefoon text;
alter table public.hub_partners add column if not exists plek text;   -- merken: waar het in het huis staat

-- ---------- vragen ----------
create table if not exists public.hub_vragen (
  id uuid primary key default gen_random_uuid(),
  eigenaar uuid references public.hub_profielen (id) on delete set null,
  eigenaar_naam text,
  huis text not null,
  soort text not null default 'andere'
    check (soort in ('schoonmaak', 'ramen', 'herstelling', 'linnen', 'koelkast', 'tuin', 'andere')),
  wat text not null check (char_length(wat) between 1 and 2000),
  tegen timestamptz,
  kanaal text not null default 'hub' check (kanaal in ('hub', 'whatsapp', 'telefoon', 'mail')),
  status text not null default 'binnen' check (status in ('binnen', 'ingepland', 'geregeld', 'lukt-niet')),
  partner_id uuid references public.hub_partners (id) on delete set null,
  ingepland_om timestamptz,
  geregeld_om timestamptz,
  foto text,
  score int check (score between 1 and 5),
  created_at timestamptz not null default now()
);

alter table public.hub_vragen enable row level security;

drop policy if exists "eigenaar ziet eigen vragen" on public.hub_vragen;
create policy "eigenaar ziet eigen vragen" on public.hub_vragen
  for select to authenticated using (eigenaar = auth.uid());

drop policy if exists "eigenaar stelt een vraag" on public.hub_vragen;
create policy "eigenaar stelt een vraag" on public.hub_vragen
  for insert to authenticated
  with check (
    eigenaar = auth.uid() and status = 'binnen' and kanaal = 'hub'
    and partner_id is null and foto is null and score is null
    and public.hub_is_actief()
  );

drop policy if exists "eigenaar geeft een score" on public.hub_vragen;
create policy "eigenaar geeft een score" on public.hub_vragen
  for update to authenticated
  using (eigenaar = auth.uid() and status = 'geregeld')
  with check (eigenaar = auth.uid());

-- Een eigenaar mag alleen de score aanpassen; de rest doet moroww.
revoke update on public.hub_vragen from authenticated;
grant update (score) on public.hub_vragen to authenticated;

create index if not exists hub_vragen_status on public.hub_vragen (status, tegen);
create index if not exists hub_vragen_eigenaar on public.hub_vragen (eigenaar, created_at);

-- ---------- tijdlijn per vraag ----------
create table if not exists public.hub_vraag_updates (
  id uuid primary key default gen_random_uuid(),
  vraag_id uuid not null references public.hub_vragen (id) on delete cascade,
  wie text not null default 'moroww' check (wie in ('jij', 'moroww', 'partner')),
  tekst text not null,
  foto text,
  created_at timestamptz not null default now()
);

alter table public.hub_vraag_updates enable row level security;

drop policy if exists "eigenaar leest de tijdlijn" on public.hub_vraag_updates;
create policy "eigenaar leest de tijdlijn" on public.hub_vraag_updates
  for select to authenticated
  using (exists (select 1 from public.hub_vragen v where v.id = vraag_id and v.eigenaar = auth.uid()));

create index if not exists hub_vraag_updates_vraag on public.hub_vraag_updates (vraag_id, created_at);

-- ---------- interne notities: geen policies, dus alleen via de service role ----------
create table if not exists public.hub_vraag_notities (
  id uuid primary key default gen_random_uuid(),
  vraag_id uuid not null references public.hub_vragen (id) on delete cascade,
  tekst text not null,
  created_at timestamptz not null default now()
);

alter table public.hub_vraag_notities enable row level security;

-- ---------- merken aanvragen voor een huis ----------
create table if not exists public.hub_merk_aanvragen (
  id uuid primary key default gen_random_uuid(),
  profiel_id uuid not null references public.hub_profielen (id) on delete cascade,
  partner_id uuid not null references public.hub_partners (id) on delete cascade,
  huis text,
  status text not null default 'aangevraagd' check (status in ('aangevraagd', 'geplaatst', 'gestopt')),
  created_at timestamptz not null default now(),
  unique (profiel_id, partner_id)
);

alter table public.hub_merk_aanvragen enable row level security;

drop policy if exists "eigen merkaanvragen lezen" on public.hub_merk_aanvragen;
create policy "eigen merkaanvragen lezen" on public.hub_merk_aanvragen
  for select to authenticated using (profiel_id = auth.uid());

drop policy if exists "merk aanvragen" on public.hub_merk_aanvragen;
create policy "merk aanvragen" on public.hub_merk_aanvragen
  for insert to authenticated
  with check (profiel_id = auth.uid() and status = 'aangevraagd' and public.hub_is_actief());

-- ---------- foto's van het resultaat: privé, de site toont ze met een tijdelijke link ----------
insert into storage.buckets (id, name, public)
values ('hub-fotos', 'hub-fotos', false)
on conflict (id) do nothing;

-- ---------- de bestaande partners indelen ----------
update public.hub_partners set soort = 'merk', plek = 'in de badkamer' where naam = 'Moro Essentials' and plek is null;
update public.hub_partners set vak = 'slimme sloten' where naam = 'Nuki' and vak is null;
update public.hub_partners set vak = 'schoonmaak', regio = 'West- en Oost-Vlaanderen' where naam = 'Opruimingen CB' and vak is null;
update public.hub_partners set vak = 'fotografie' where naam = 'Amelie Bauwens' and vak is null;
