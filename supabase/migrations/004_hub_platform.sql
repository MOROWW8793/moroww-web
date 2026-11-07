-- moroww hub: ledenzone, community, partnerportaal en market.
-- Uitvoeren in de Supabase SQL-editor van het project van moroww.com.
-- Beheer (goedkeuren, publiceren) gebeurt op de site via de service role,
-- die RLS overslaat. Gewone gebruikers zien enkel wat de policies toelaten.

-- ---------- profielen ----------
create table if not exists public.hub_profielen (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  naam text not null,
  rol text not null default 'lid' check (rol in ('lid', 'partner')),
  soort text not null default 'eigenaar' check (soort in ('eigenaar', 'property-manager', 'partner')),
  status text not null default 'aangevraagd' check (status in ('aangevraagd', 'actief', 'geweigerd')),
  huis text,
  bedrijf text,
  telefoon text,
  bericht text,
  created_at timestamptz not null default now()
);

alter table public.hub_profielen enable row level security;

create or replace function public.hub_is_actief()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.hub_profielen
    where id = auth.uid() and status = 'actief'
  );
$$;

drop policy if exists "eigen profiel lezen" on public.hub_profielen;
create policy "eigen profiel lezen" on public.hub_profielen
  for select to authenticated using (id = auth.uid());

drop policy if exists "eigen aanvraag indienen" on public.hub_profielen;
create policy "eigen aanvraag indienen" on public.hub_profielen
  for insert to authenticated
  with check (id = auth.uid() and status = 'aangevraagd');

-- ---------- partners ----------
create table if not exists public.hub_partners (
  id uuid primary key default gen_random_uuid(),
  eigenaar uuid references public.hub_profielen (id) on delete set null,
  naam text not null,
  categorie text not null default 'huis' check (categorie in ('tools', 'huis', 'stil', 'vakmensen')),
  wat text,
  voordeel text,
  code text,
  url text,
  contact text,
  status text not null default 'concept' check (status in ('concept', 'live')),
  updated_at timestamptz not null default now()
);

alter table public.hub_partners enable row level security;

drop policy if exists "leden zien live partners" on public.hub_partners;
create policy "leden zien live partners" on public.hub_partners
  for select to authenticated using (status = 'live' and public.hub_is_actief());

drop policy if exists "partner ziet eigen fiche" on public.hub_partners;
create policy "partner ziet eigen fiche" on public.hub_partners
  for select to authenticated using (eigenaar = auth.uid());

drop policy if exists "partner maakt eigen fiche" on public.hub_partners;
create policy "partner maakt eigen fiche" on public.hub_partners
  for insert to authenticated
  with check (eigenaar = auth.uid() and status = 'concept' and public.hub_is_actief());

drop policy if exists "partner past eigen fiche aan" on public.hub_partners;
create policy "partner past eigen fiche aan" on public.hub_partners
  for update to authenticated using (eigenaar = auth.uid()) with check (eigenaar = auth.uid());

-- Een partner mag zijn fiche aanpassen, maar niet zelf op live zetten.
revoke update on public.hub_partners from authenticated;
grant update (naam, categorie, wat, voordeel, code, url, contact, updated_at) on public.hub_partners to authenticated;

-- ---------- producten voor de market ----------
create table if not exists public.hub_producten (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.hub_partners (id) on delete cascade,
  naam text not null,
  tekst text,
  foto text,
  url text,
  status text not null default 'concept' check (status in ('concept', 'live')),
  created_at timestamptz not null default now()
);

alter table public.hub_producten enable row level security;

drop policy if exists "iedereen ziet live producten" on public.hub_producten;
create policy "iedereen ziet live producten" on public.hub_producten
  for select to anon, authenticated using (status = 'live');

drop policy if exists "partner ziet eigen producten" on public.hub_producten;
create policy "partner ziet eigen producten" on public.hub_producten
  for select to authenticated
  using (exists (select 1 from public.hub_partners p where p.id = partner_id and p.eigenaar = auth.uid()));

drop policy if exists "partner voegt product toe" on public.hub_producten;
create policy "partner voegt product toe" on public.hub_producten
  for insert to authenticated
  with check (
    status = 'concept'
    and exists (select 1 from public.hub_partners p where p.id = partner_id and p.eigenaar = auth.uid())
  );

drop policy if exists "partner past product aan" on public.hub_producten;
create policy "partner past product aan" on public.hub_producten
  for update to authenticated
  using (exists (select 1 from public.hub_partners p where p.id = partner_id and p.eigenaar = auth.uid()));

drop policy if exists "partner verwijdert product" on public.hub_producten;
create policy "partner verwijdert product" on public.hub_producten
  for delete to authenticated
  using (exists (select 1 from public.hub_partners p where p.id = partner_id and p.eigenaar = auth.uid()));

revoke update on public.hub_producten from authenticated;
grant update (naam, tekst, foto, url) on public.hub_producten to authenticated;

-- ---------- academy ----------
create table if not exists public.hub_sessies (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  tekst text,
  datum timestamptz not null,
  plaats text,
  plaatsen int,
  created_at timestamptz not null default now()
);

alter table public.hub_sessies enable row level security;

drop policy if exists "leden zien sessies" on public.hub_sessies;
create policy "leden zien sessies" on public.hub_sessies
  for select to authenticated using (public.hub_is_actief());

create table if not exists public.hub_inschrijvingen (
  sessie_id uuid not null references public.hub_sessies (id) on delete cascade,
  profiel_id uuid not null references public.hub_profielen (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (sessie_id, profiel_id)
);

alter table public.hub_inschrijvingen enable row level security;

drop policy if exists "eigen inschrijvingen" on public.hub_inschrijvingen;
create policy "eigen inschrijvingen" on public.hub_inschrijvingen
  for select to authenticated using (profiel_id = auth.uid());

drop policy if exists "inschrijven" on public.hub_inschrijvingen;
create policy "inschrijven" on public.hub_inschrijvingen
  for insert to authenticated with check (profiel_id = auth.uid() and public.hub_is_actief());

drop policy if exists "uitschrijven" on public.hub_inschrijvingen;
create policy "uitschrijven" on public.hub_inschrijvingen
  for delete to authenticated using (profiel_id = auth.uid());

-- ---------- ledenbrief ----------
create table if not exists public.hub_ledenbrieven (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  tekst text not null,
  datum date not null default current_date
);

alter table public.hub_ledenbrieven enable row level security;

drop policy if exists "leden lezen de ledenbrief" on public.hub_ledenbrieven;
create policy "leden lezen de ledenbrief" on public.hub_ledenbrieven
  for select to authenticated using (public.hub_is_actief());

-- ---------- community ----------
create table if not exists public.hub_berichten (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.hub_berichten (id) on delete cascade,
  auteur uuid not null default auth.uid() references public.hub_profielen (id) on delete cascade,
  auteur_naam text not null,
  titel text,
  tekst text not null check (char_length(tekst) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.hub_berichten enable row level security;

drop policy if exists "leden lezen berichten" on public.hub_berichten;
create policy "leden lezen berichten" on public.hub_berichten
  for select to authenticated using (public.hub_is_actief());

drop policy if exists "leden schrijven berichten" on public.hub_berichten;
create policy "leden schrijven berichten" on public.hub_berichten
  for insert to authenticated with check (auteur = auth.uid() and public.hub_is_actief());

drop policy if exists "eigen bericht verwijderen" on public.hub_berichten;
create policy "eigen bericht verwijderen" on public.hub_berichten
  for delete to authenticated using (auteur = auth.uid());

create index if not exists hub_berichten_parent on public.hub_berichten (parent_id, created_at);
create index if not exists hub_sessies_datum on public.hub_sessies (datum);

-- ---------- startinhoud: de partners die vandaag live zijn ----------
insert into public.hub_partners (naam, categorie, wat, url, status)
select * from (values
  ('Moro Essentials', 'huis', 'badkamerproducten, Belgisch merk', 'https://moro-essentials.com/nl/collections/all-products-new', 'live'),
  ('Nuki', 'stil', 'slimme sloten · moroww is gecertificeerd Nuki Pro Partner en installeert zelf', 'https://nuki.io/nl-nl/', 'live'),
  ('Opruimingen CB', 'vakmensen', 'schoonmaak, dieptereiniging en ontruiming · West- en Oost-Vlaanderen', 'https://www.opruimingencb.be/', 'live'),
  ('Amelie Bauwens', 'vakmensen', 'fotografie volgens de moroww-standaard', 'https://www.ameliebauwens.com/', 'live')
) as v(naam, categorie, wat, url, status)
where not exists (select 1 from public.hub_partners);
