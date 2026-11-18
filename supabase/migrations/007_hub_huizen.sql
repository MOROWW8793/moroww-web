-- moroww hub · huizen per lid
-- Een eigenaar of beheerder zet elk huis één keer in de hub, met wat moroww
-- en de partner nodig hebben om een opdracht uit te voeren: adres, toegang,
-- kamers en bedden, parkeren en een contact ter plaatse.
-- Uitvoeren na 006_hub_merken_aanmelden.sql.

create table if not exists public.hub_huizen (
  id uuid primary key default gen_random_uuid(),
  profiel_id uuid not null references public.hub_profielen (id) on delete cascade,
  naam text not null check (char_length(naam) between 1 and 120),
  adres text not null,
  postcode text not null,
  gemeente text not null,
  slaapkamers int check (slaapkamers between 0 and 50),
  badkamers int check (badkamers between 0 and 50),
  bedden text,
  toegang text,
  parkeren text,
  contact_naam text,
  contact_telefoon text,
  opmerkingen text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.hub_huizen enable row level security;

drop policy if exists "eigen huizen lezen" on public.hub_huizen;
create policy "eigen huizen lezen" on public.hub_huizen
  for select to authenticated using (profiel_id = auth.uid());

drop policy if exists "eigen huis toevoegen" on public.hub_huizen;
create policy "eigen huis toevoegen" on public.hub_huizen
  for insert to authenticated
  with check (profiel_id = auth.uid() and public.hub_is_actief());

drop policy if exists "eigen huis aanpassen" on public.hub_huizen;
create policy "eigen huis aanpassen" on public.hub_huizen
  for update to authenticated
  using (profiel_id = auth.uid()) with check (profiel_id = auth.uid());

drop policy if exists "eigen huis verwijderen" on public.hub_huizen;
create policy "eigen huis verwijderen" on public.hub_huizen
  for delete to authenticated using (profiel_id = auth.uid());

create index if not exists hub_huizen_profiel on public.hub_huizen (profiel_id, naam);

-- Een vraag verwijst naar het huis. De naam blijft ook als tekst in de vraag
-- staan, zodat een dossier leesbaar blijft als het huis later verdwijnt.
alter table public.hub_vragen add column if not exists huis_id uuid references public.hub_huizen (id) on delete set null;

drop policy if exists "eigenaar stelt een vraag" on public.hub_vragen;
create policy "eigenaar stelt een vraag" on public.hub_vragen
  for insert to authenticated
  with check (
    eigenaar = auth.uid() and status = 'binnen' and kanaal = 'hub'
    and partner_id is null and foto is null and score is null
    and public.hub_is_actief()
    and (huis_id is null or exists (
      select 1 from public.hub_huizen h where h.id = huis_id and h.profiel_id = auth.uid()
    ))
  );
