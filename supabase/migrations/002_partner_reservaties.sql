-- Bezoeken en reservaties op moroww.com via een partnerlink
-- (?ref=<slug>, zie lib/partner.ts). Bedragen en data staan in Guesty; hier
-- enkel de koppeling bevestigingscode → partner.
--
-- RLS aan zonder policies: enkel de service role leest en schrijft.

create table if not exists partner_reservaties (
  confirmation_code text primary key,
  partner           text not null,
  aangekomen_op     timestamptz not null,
  geboekt_op        timestamptz not null default now()
);

alter table partner_reservaties enable row level security;

-- Eén rij per landing via een partnerlink. Geen IP of andere
-- bezoekersgegevens: enkel welke partner en wanneer.
create table if not exists partner_bezoeken (
  id         bigint generated always as identity primary key,
  partner    text not null,
  bezocht_op timestamptz not null default now()
);

alter table partner_bezoeken enable row level security;
