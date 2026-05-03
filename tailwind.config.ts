import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "moroww-blush":       "#FAE4D6",
        "moroww-white":       "#FFFFFF",
        "moroww-black":       "#1A1A1A",
        "moroww-orange":      "#FEA05E",
        "moroww-orange-dark": "#E8894A",
        "moroww-border":      "#F0D4C4",
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
