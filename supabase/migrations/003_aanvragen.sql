-- Eén tabel voor alle formulieren van moroww, moroww how en moroww hub.
create table if not exists public.aanvragen (
  id          uuid primary key default gen_random_uuid(),
  aangemaakt  timestamptz not null default now(),
  merk        text not null check (merk in ('moroww', 'how', 'hub')),
  soort       text not null,            -- keuring, contact, scan, partner, academy
  naam        text not null,
  email       text not null,
  telefoon    text,
  adres       text,
  bericht     text,
  extra       jsonb not null default '{}'::jsonb,
  status      text not null default 'nieuw' check (status in ('nieuw', 'in behandeling', 'afgerond'))
);

alter table public.aanvragen enable row level security;

-- Bezoekers (anon) mogen enkel een nieuwe aanvraag toevoegen, niets lezen of wijzigen.
create policy "iedereen mag een aanvraag indienen"
  on public.aanvragen for insert
  to anon
  with check (
    char_length(naam) between 1 and 200
    and char_length(email) between 3 and 320
    and coalesce(char_length(bericht), 0) <= 5000
    and status = 'nieuw'
  );

-- Lezen en opvolgen doen jullie in het Supabase-dashboard of via moroww-os met de service role.
create index if not exists aanvragen_merk_idx on public.aanvragen (merk, aangemaakt desc);
