import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "moroww — Geen gok. Een garantie.",
  description: "moroww selecteert vakantiewoningen die aan elk detail kloppen. Zodat jij alleen nog maar hoeft aan te komen.",
  openGraph: {
    title: "moroww — Geen gok. Een garantie.",
    description: "moroww selecteert vakantiewoningen die aan elk detail kloppen.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="antialiased font-sans bg-moroww-blush text-moroww-black">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
