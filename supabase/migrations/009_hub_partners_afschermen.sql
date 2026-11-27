-- moroww hub · partners afschermen
-- Partners zien elkaar niet: alleen leden lezen de live fiches. En wat alleen
-- voor moroww is (telefoon, e-mail, postcode, kanaal, voorrang) is voor niemand
-- anders leesbaar, ook niet rechtstreeks via de API.
-- Uitvoeren na 008_hub_opdrachten.sql.

-- Alleen leden zien de live partners; een partner ziet enkel zijn eigen fiche.
drop policy if exists "leden zien live partners" on public.hub_partners;
create policy "leden zien live partners" on public.hub_partners
  for select to authenticated
  using (
    status = 'live'
    and exists (
      select 1 from public.hub_profielen
      where id = auth.uid() and status = 'actief' and rol = 'lid'
    )
  );

-- Ingelogde gebruikers lezen alleen de kolommen van de fiche zelf.
revoke select on public.hub_partners from authenticated;
grant select (id, eigenaar, naam, categorie, soort, wat, voordeel, code, url, contact, plek, vak, regio, status, updated_at)
  on public.hub_partners to authenticated;
