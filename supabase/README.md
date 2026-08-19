# Supabase migraties · moroww-web

Deze map hoort bij moroww-web (de publieke website). Migraties die alleen
moroww-web nodig heeft, komen hier. Alles wat het interne platform raakt hoort
in `moroww-os/supabase/`.

## Toepassen

Vandaag nog handmatig. Open de Supabase-SQL-editor en plak het bestand,
of vanaf de commandline:

```sh
psql "$DATABASE_URL" -f supabase/migrations/001_verblijfsbelasting.sql
```

De migraties zijn idempotent: `create type` in een `do $$` blok en
`create table if not exists`, `insert … on conflict do nothing`.

## Bestanden

- `001_verblijfsbelasting.sql` — tabel voor de gemeentelijke verblijfs- en
  logiesbelasting, met seed van 12 gemeenten uit ons focusgebied (kust en
  Oost-Vlaanderen). Vier rijen staan op `onbekend`: die tarieven moeten we
  eerst opvragen bij de dienst belastingen (zie
  `moroww-kennisbank-pagina2-verblijfsbelasting.md`, sectie "Wat je nog moet
  opvragen").
