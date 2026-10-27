-- Reservaties op moroww.com die via een partnerlink binnenkwamen
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
