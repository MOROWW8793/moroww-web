# moroww hub · bouwplan

Stand: 26 november 2026. Dit document zegt wat de hub moet worden, wat er al staat
en in welke volgorde de rest gebouwd wordt. Werk het bij in dezelfde commit waarin
je een stap afwerkt.

## 1. Het model

- **Voor wie:** eigenaars die zelf beheren. Property managers gebruiken dezelfde hub met een volumetarief.
- **Probleem:** verschillende contactpersonen en communicatielijnen per huis.
- **Belofte:** alle professionals op één plek, alles eenvoudig op te volgen, en binnen de 2 uur een antwoord, ook als er niemand gevonden wordt.
- **Hoe:** de eigenaar praat alleen met moroww. Het platform stuurt de vraag naar een partner, die aanvaardt of weigert.
- **Volgorde van partners:** 1 eigen vaste partners van het lid, 2 preferred partner, 3 rest van het netwerk.
- **Verdienmodel:** 29 euro per maand per pand. Marge per opdracht bovenop, behalve bij eigen partners. Preferred partners betalen voor voorrang. Het label is gratis als het pand aan de standaard voldoet.
- **Nog open:** hoogte van de marge, prijs voor preferred, staffel voor property managers, goedkeuringstermijn, opzegtermijn, betaalwijze.

## 2. Wat er staat (app/hub, migraties 004 tot 007)

Aanmelden en goedkeuren, huizen per lid, vraag indienen per soort dienst, opvolgen met
tijdlijn, foto en score, regie onder /hub/beheer, partnerfiches, merken, academy en ledenbrief.

## 3. Stap 1 · opdrachten naar partners (geschreven op 26 nov, nog niet getest op een draaiende site)

- `supabase/migrations/008_hub_opdrachten.sql`: partners krijgen `email`, `kanaal` (mail of login), `postcode` en `preferred`. Nieuwe tabel `hub_opdrachten` met een token per opdracht.
- `lib/hub/opdrachten.ts`: versturen, lezen op token, aanvaarden en weigeren.
- `lib/hub/mail.ts`: `mailOpdracht`.
- `app/hub/(platform)/opdracht/[token]`: pagina voor de partner, zonder login. Adres en toegang verschijnen pas na het aanvaarden.
- `components/hub/OpdrachtBlok.tsx` en `lib/hub/opdracht-acties.ts`: in het dossier van een vraag stuur je de opdracht naar een partner, met een antwoordtermijn, en zie je wie antwoordde en hoeveel er rest van de 2 uur.
- `/hub/beheer`: bij een partner toevoegen vul je e-mail, kanaal en voorrang in.

**Om het aan te zetten:** migratie 008 uitvoeren in de SQL-editor van Supabase, nakijken dat `RESEND_API_KEY` gezet is, lokaal `next build` draaien, dan deployen.

**Wat stap 1 nog niet doet:** doorschuiven gebeurt met de hand (jij kiest de volgende partner). Een verlopen termijn wordt pas gezien wanneer iemand de opdracht of het dossier opent.

## 4. Volgende stappen, in volgorde

2. **Beheer en rollen.** Partner uitnodigen met een login vanuit het beheer. Partners, leden en huizen bewerken (nu kan je alleen toevoegen en de status zetten). "Bekijk als": de beheerder opent de hub als een gekozen lid of partner, alleen-lezen, via de service role en met een duidelijke balk bovenaan.
3. **Portaal voor partners met login.** Hun opdrachten in /hub/partner, aanvaarden, een update of foto toevoegen.
4. **Eigen partners per lid.** Per dienst een vaste partner, die de opdracht eerst krijgt en zonder marge werkt.
5. **Automatisch doorschuiven.** Een cron die verlopen opdrachten sluit en de volgende partner aanschrijft in de volgorde eigen, preferred, netwerk, op afstand tot de postcode van het huis. Na 2 uur zonder partner krijgt de eigenaar automatisch bericht.
6. **Ledenzone in de nieuwe stijl.** Overzicht als tabel met detail, zoals in het ontwerp "moroww hub - platform".
7. **Abonnement en facturen.** 29 euro per pand, marge per opdracht op de factuur.
8. **Voor property managers.** Huizen in bulk, meerdere gebruikers per lid, verslag voor de eigenaar.

Stappen 4, 5 en 7 wachten op poort 1 van de roadmap (eind februari 2027): betalen de leden, komen de vragen binnen, halen we de 2 uur.

## 5. Eerste partners

| Partner | Hoe de opdracht binnenkomt |
|---|---|
| Opruimingen CB | login |
| Amelie Bauwens | login |
| Immo Beguin | mail |
| Certilogies | mail |

De twee met mail kunnen erin zodra migratie 008 gedraaid is. De twee met login wachten op stap 2 (uitnodigen vanuit het beheer), of melden zich zelf aan via /hub/partner-worden.

## 6. Aandachtspunten

- **moroww-os niet verwijderen.** `lib/screenings.ts` in deze repo leest de Supabase van moroww-os. In moroww-os draaien ook de afrekeningen, de Guesty-sync, de sloten en de prospectmails. Eerst nagaan wat na de overdracht van het beheer nog nodig is, dan pas uitzetten.
- **Leden kunnen de kolommen `telefoon` en `email` van live partners lezen** via de policy "leden zien live partners". De site toont ze niet, maar de API geeft ze wel. Oplossen met kolomrechten of een view voor stap 3.
- **`@supabase/ssr` ontbreekt in de lokale node_modules**, en `tsc` geeft fouten die los staan van de hub (Set-iteratie, `components/PartnerToestemming.tsx`). `npm install` en een build lokaal nakijken voor de deploy.
