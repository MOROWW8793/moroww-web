-- moroww hub · de vaste partners van een lid
-- Wie vandaag al voor een eigenaar werkt, krijgt zijn vraag eerst. Per soort
-- werk één vaste partner. Alleen het lid zelf en moroww zien deze gegevens.
-- Uitvoeren na 009_hub_partners_afschermen.sql.

create table if not exists public.hub_eigen_partners (
  id uuid primary key default gen_random_uuid(),
  profiel_id uuid not null references public.hub_profielen (id) on delete cascade,
  soort text not null,
  naam text not null check (char_length(naam) between 1 and 120),
  telefoon text,
  updated_at timestamptz not null default now(),
  unique (profiel_id, soort)
);

alter table public.hub_eigen_partners enable row level security;

drop policy if exists "eigen vaste partners lezen" on public.hub_eigen_partners;
create policy "eigen vaste partners lezen" on public.hub_eigen_partners
  for select to authenticated using (profiel_id = auth.uid());

drop policy if exists "eigen vaste partner toevoegen" on public.hub_eigen_partners;
create policy "eigen vaste partner toevoegen" on public.hub_eigen_partners
  for insert to authenticated with check (profiel_id = auth.uid() and public.hub_is_actief());

drop policy if exists "eigen vaste partner aanpassen" on public.hub_eigen_partners;
create policy "eigen vaste partner aanpassen" on public.hub_eigen_partners
  for update to authenticated using (profiel_id = auth.uid()) with check (profiel_id = auth.uid());

drop policy if exists "eigen vaste partner verwijderen" on public.hub_eigen_partners;
create policy "eigen vaste partner verwijderen" on public.hub_eigen_partners
  for delete to authenticated using (profiel_id = auth.uid());
