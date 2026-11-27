-- moroww hub · opdrachten naar partners
-- Een vraag gaat als opdracht naar een partner. Die aanvaardt of weigert via
-- een link in de mail, met of zonder login. Het adres en de toegang van het
-- huis ziet hij pas na het aanvaarden.
-- Uitvoeren na 007_hub_huizen.sql.

-- ---------- partners: hoe de opdracht hen bereikt ----------
alter table public.hub_partners add column if not exists email text;
alter table public.hub_partners add column if not exists kanaal text not null default 'mail';
alter table public.hub_partners drop constraint if exists hub_partners_kanaal_check;
alter table public.hub_partners add constraint hub_partners_kanaal_check check (kanaal in ('mail', 'login'));
alter table public.hub_partners add column if not exists postcode text;
alter table public.hub_partners add column if not exists preferred boolean not null default false;

-- ---------- opdrachten ----------
create table if not exists public.hub_opdrachten (
  id uuid primary key default gen_random_uuid(),
  vraag_id uuid not null references public.hub_vragen (id) on delete cascade,
  partner_id uuid not null references public.hub_partners (id) on delete cascade,
  token uuid not null unique default gen_random_uuid(),
  status text not null default 'verstuurd'
    check (status in ('verstuurd', 'aanvaard', 'geweigerd', 'verlopen', 'ingetrokken')),
  bericht text,
  antwoord text,
  verstuurd_om timestamptz not null default now(),
  vervalt_om timestamptz,
  antwoord_om timestamptz
);

create index if not exists hub_opdrachten_vraag_idx on public.hub_opdrachten (vraag_id);
create index if not exists hub_opdrachten_partner_idx on public.hub_opdrachten (partner_id);

alter table public.hub_opdrachten enable row level security;

-- De site leest en schrijft opdrachten via de service role. Een partner zonder
-- login komt binnen met de token uit zijn mail. Een partner met login mag zijn
-- eigen opdrachten lezen.
drop policy if exists "partner leest eigen opdrachten" on public.hub_opdrachten;
create policy "partner leest eigen opdrachten" on public.hub_opdrachten
  for select to authenticated
  using (partner_id in (select id from public.hub_partners where eigenaar = auth.uid()));
