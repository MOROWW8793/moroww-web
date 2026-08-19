import type { Config } from "tailwindcss";

// Design tokens — één bron van waarheid voor kleuren, typografie en ruimte.
// Nieuwe waarden gaan hier binnen, niet als losse hex verspreid over de code.
//
// De namen volgen bouwspec-visuele-herziening.md sectie 2. De legacy-namen
// (moroww-black/brown/blue-gray/ardennes/coast/white/text) blijven staan
// tot alle callsites gemigreerd zijn — dan verdwijnen ze in één opruimcommit.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Spec-tokens (bouwspec sectie 2.1) ────────────────────────────────
        "moroww-dark":      "#1A1A1A",   // tekst, gastenoverlay
        "moroww-blush":     "#FAE4D6",   // gastenoppervlak
        "moroww-orange":    "#FEA05E",   // actie, uitsluitend
        "moroww-label":     "#C08D6E",   // auditlijn, keurmerk
        "moroww-shore":     "#829B9B",   // uitsluitend the shore
        "moroww-fields":    "#CBD085",   // uitsluitend the fields
        "moroww-paper":     "#FBFAF8",   // eigenaarsoppervlak, koeler dan blush
        "moroww-ink-2":     "#6B6863",   // secundaire tekst, bijschriften
        "moroww-rule":      "#E3DED7",   // neutrale scheidingslijn

        // ── Legacy — te migreren naar spec-tokens ───────────────────────────
        "moroww-white":     "#FFFFFF",
        "moroww-black":     "#1A1A1A",
        "moroww-brown":     "#C08D6E",
        "moroww-coast":     "#EEBC9D",
        "moroww-ardennes":  "#CBD085",
        "moroww-blue-gray": "#829B9B",
        "moroww-text":      "var(--color-text)",
      },
      fontFamily: {
        sans: ["OverusedGrotesk", "Inter", "sans-serif"],
      },
      // Font-tokens — bouwspec sectie 2.2. Elk paar is [size, options]. Gewicht,
      // lineHeight en letterSpacing zitten in het token zodat classes als
      // `font-semibold` of extra `leading-*` niet nodig zijn.
      fontSize: {
        display:   ["clamp(3.5rem, 9vw, 8rem)",     { lineHeight: "0.92", letterSpacing: "-0.035em", fontWeight: "600" }],
        h2:        ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1",  letterSpacing: "-0.02em",  fontWeight: "600" }],
        h3:        ["1.25rem",                       { lineHeight: "1.3",  letterSpacing: "-0.01em",  fontWeight: "600" }],
        body:      ["1.0625rem",                     { lineHeight: "1.65", letterSpacing: "0"                          }],
        "body-lg": ["1.25rem",                       { lineHeight: "1.55", letterSpacing: "0"                          }],
        audit:     ["0.6875rem",                     { lineHeight: "1",    letterSpacing: "0.14em",   fontWeight: "600" }],
      },
      // Ritme — bouwspec sectie 2.3. Onder aparte prefix `mw` zodat Tailwinds
      // default spacing (p-4, m-8, gap-6) niet doorbroken wordt.
      spacing: {
        "mw-2":  "0.5rem",
        "mw-3":  "0.75rem",
        "mw-4":  "1.25rem",
        "mw-5":  "2rem",
        "mw-6":  "3rem",
        "mw-8":  "5rem",
        "mw-10": "8rem",
        "mw-12": "12rem",
      },
      maxWidth: {
        // Regelbreedtes uit bouwspec sectie 2.2.
        "mw-gast":     "52ch",
        "mw-eigenaar": "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
