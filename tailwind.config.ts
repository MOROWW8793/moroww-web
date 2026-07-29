import type { Config } from "tailwindcss";

// Design tokens — één bron van waarheid voor kleuren, afgeleid van de huisstijl
// (Moroww_Kleuren.pdf). Nieuwe kleuren gaan hier binnen, niet als losse hex
// verspreid over de codebase. Zelfbedachte tinten worden afgeleid met opacity
// (bv. bg-moroww-brown/15 in plaats van een aparte blush-shade te declareren).
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primaire huisstijlkleuren
        "moroww-blush":     "#FAE4D6",
        "moroww-white":     "#FFFFFF",
        "moroww-black":     "#1A1A1A",   // primaire donkere kleur, zie ook --color-text in globals.css
        "moroww-orange":    "#FEA05E",
        "moroww-brown":     "#C08D6E",
        "moroww-coast":     "#EEBC9D",   // categoriekleur the shore
        "moroww-ardennes":  "#CBD085",   // categoriekleur the fields
        "moroww-blue-gray": "#829B9B",   // huisstijl BLUE GRAY — beschikbaar voor gebruik
        // Text-token — kan later één regel wijzigen naar #000000 als dat de beslissing wordt
        "moroww-text":      "var(--color-text)",
      },
      fontFamily: {
        sans: ["OverusedGrotesk", "Inter", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3rem,6vw,5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};

export default config;
