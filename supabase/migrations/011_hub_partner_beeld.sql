-- moroww hub · logo en foto per partner
-- De bestanden staan in de privé-opslag hub-fotos, onder partners/<id>/.
-- De site toont ze met een tijdelijke link. Uitvoeren na 010.

alter table public.hub_partners add column if not exists logo text;
alter table public.hub_partners add column if not exists foto text;

-- Sinds 009 lezen ingelogde gebruikers alleen benoemde kolommen.
grant select (logo, foto) on public.hub_partners to authenticated;
