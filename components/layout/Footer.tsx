import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-moroww-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="max-w-xs">
            <Image src="/images/logo.png" alt="moroww" width={100} height={28} className="h-7 w-auto brightness-0 invert mb-4" />
            <p className="text-sm text-white/50 leading-relaxed">
              No worries for the day of moroww.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Ontdekken</p>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <Link href="/collectie" className="hover:text-white transition-colors">Collectie</Link>
                <Link href="/over-moroww" className="hover:text-white transition-colors">Over moroww</Link>
              </nav>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Eigenaars</p>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <Link href="/eigenaar-worden" className="hover:text-white transition-colors">Eigenaar worden</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© {new Date().getFullYear()} moroww. Alle rechten voorbehouden.</span>
          <span>moroww BV · België · www.moroww.com</span>
        </div>
      </div>
    </footer>
  );
}
