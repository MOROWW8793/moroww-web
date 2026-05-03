import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white w-full">
      <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {/* Logo + tagline */}
          <div>
            <Image
              src="/images/logo.png"
              alt="moroww"
              width={100}
              height={28}
              className="h-7 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-white/40 leading-relaxed mb-2">
              No worries for the day of moroww.
            </p>
            <p className="text-xs text-white/25">
              moroww BV · België · www.moroww.com
            </p>
            <p className="text-xs text-white/25 mt-1">
              BTW BE1030.667.956
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Sitemap</p>
            <nav className="flex flex-col gap-2 text-sm text-white/50">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/collectie" className="hover:text-white transition-colors">De Collectie</Link>
              <Link href="/over-moroww" className="hover:text-white transition-colors">Over moroww</Link>
              <Link href="/eigenaar-worden" className="hover:text-white transition-colors">Founding Partner</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Contact</p>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              <Link href="mailto:info@moroww.com" className="hover:text-white transition-colors">
                info@moroww.com
              </Link>
              <a href="https://www.instagram.com/moroww.com_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/moroww/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://calendar.app.google/BH8wYeA9AGf6KrUz7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Een gesprek inplannen</a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 border-t border-white/10 pt-8">
          <p className="text-xs text-white/30">
            © 2026 moroww BV. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
