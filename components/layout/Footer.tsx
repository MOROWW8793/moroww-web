import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white w-full">
      <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
              <Link href="mailto:hello@moroww.com" className="hover:text-white transition-colors">
                hello@moroww.com
              </Link>
              <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-xs text-white/30">
            © 2026 moroww BV. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
