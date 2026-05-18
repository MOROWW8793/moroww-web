import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAE4D6] flex items-center justify-center px-6">
      <div className="max-w-md text-center">

        <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-6">
          pagina niet gevonden
        </p>

        <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] text-[#1A1A1A]">
          <span className="font-light">deze pagina</span><br />
          bestaat niet.
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]/70 max-w-sm mx-auto">
          Maar onze collectie wel.
          Misschien vind je daar wat je zocht.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/collectie"
            className="bg-[#1A1A1A] text-white rounded-full px-8 py-4 text-sm font-semibold hover:bg-[#333] transition-colors"
          >
            bekijk de collectie
          </Link>
          <Link
            href="/"
            className="border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-full px-8 py-4 text-sm font-medium hover:border-[#1A1A1A] transition-colors"
          >
            terug naar home
          </Link>
        </div>

      </div>
    </main>
  )
}
