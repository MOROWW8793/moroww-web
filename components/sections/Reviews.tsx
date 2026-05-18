export function Reviews() {
  return (
    <section className="w-full bg-[#FAE4D6] py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-5">
          wat gasten zeggen
        </p>
        <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[1.1] text-[#1A1A1A] mb-16">
          <span className="font-light">geen beloften.</span><br />
          alleen ervaringen.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col justify-between">
            <p className="text-base leading-relaxed text-[#1A1A1A]">
              &ldquo;Een uiterst proper appartement, smaakvol en modern
              ingericht met alle oog op comfort. Prachtig uitzicht —
              niks op aan te merken. Zou zeker opnieuw huren.&rdquo;
            </p>
            <div className="mt-6 pt-6 border-t border-[#C08D6E]/30">
              <p className="text-sm font-semibold text-[#1A1A1A]">Stephen</p>
              <p className="text-xs text-[#C08D6E] mt-0.5">The Sixteenth, Oostende</p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-base leading-relaxed text-[#1A1A1A]">
              &ldquo;Kaarsen stonden ons op te wachten, het rook
              er heerlijk, het was verwarmd bij aankomst.
              De rust van deze plek is ongeëvenaard.
              We voelden ons helemaal thuis.&rdquo;
            </p>
            <div className="mt-6 pt-6 border-t border-[#C08D6E]/30">
              <p className="text-sm font-semibold text-[#1A1A1A]">Sabrina</p>
              <p className="text-xs text-[#C08D6E] mt-0.5">Chalet Ann-Helena, Ursel</p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-base leading-relaxed text-[#1A1A1A]">
              &ldquo;Verblijven in de hottub terwijl je naar de
              sterren kijkt met het kampvuur — perfect.
              Een uitzonderlijke plek.&rdquo;
            </p>
            <div className="mt-6 pt-6 border-t border-[#C08D6E]/30">
              <p className="text-sm font-semibold text-[#1A1A1A]">Lucie</p>
              <p className="text-xs text-[#C08D6E] mt-0.5">The Cozy Relax Home, Beernem</p>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-[#C08D6E]/30 flex items-center gap-6 flex-wrap">
          <p className="text-sm text-[#1A1A1A]/60">Alle verblijven beoordeeld met</p>
          <div className="flex items-center gap-2">
            <span className="text-[#FEA05E] text-lg">★★★★★</span>
            <span className="text-sm font-semibold text-[#1A1A1A]">10 / 10</span>
            <span className="text-sm text-[#1A1A1A]/50">op Airbnb</span>
          </div>
        </div>

      </div>
    </section>
  )
}
