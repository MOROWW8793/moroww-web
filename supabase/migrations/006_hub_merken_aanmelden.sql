-- moroww hub · merken melden zichzelf aan (/hub/merk-aanmelden)
-- Een merk maakt een account, vult zijn fiche en producten in en wacht op
-- goedkeuring. Alles blijft concept tot beheer het live zet.
-- Uitvoeren na 005_hub_vragen.sql.

-- Een partner mag zijn fiche al aanmaken terwijl de aanmelding wordt nagekeken.
drop policy if exists "partner maakt eigen fiche" on public.hub_partners;
create policy "partner maakt eigen fiche" on public.hub_partners
  for insert to authenticated
  with check (
    eigenaar = auth.uid()
    and status = 'concept'
    and exists (
      select 1 from public.hub_profielen
      where id = auth.uid() and rol = 'partner' and status <> 'geweigerd'
    )
  );

-- De partner past zelf aan waar in het huis het product staat.
grant update (plek) on public.hub_partners to authenticated;
