export function Reviews() {
  return (
    <section className="w-full bg-[#FAE4D6] py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-4">
              wat gasten zeggen
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[1.1] text-[#1A1A1A]">
              <span className="font-light">geen beloften.</span>
              <br />alleen ervaringen.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/50 shrink-0">
            <span className="text-[#FEA05E] text-base tracking-tight">★★★★★</span>
            <span className="font-semibold text-[#1A1A1A]">10 / 10</span>
            <span>· alle verblijven</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Review 1 */}
          <div className="bg-white rounded-2xl p-8 flex flex-col justify-between gap-8">
            <div>
              <span className="text-[#FEA05E] text-5xl font-serif leading-none select-none">&ldquo;</span>
              <p className="text-base leading-relaxed text-[#1A1A1A] mt-2">
                Een uiterst proper appartement, smaakvol
                en modern ingericht met alle oog op comfort.
                Prachtig uitzicht — niks op aan te merken.
                Zou zeker opnieuw huren.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-[#FAE4D6]">
              <div className="w-10 h-10 rounded-full bg-[#EDD5C0] flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-[#C08D6E]">S</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">Stephen</p>
                <p className="text-xs text-[#C08D6E]">The Sixteenth, Oostende</p>
              </div>
            </div>
          </div>

          {/* Review 2 — featured, donker */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 flex flex-col justify-between gap-8">
            <div>
              <span className="text-[#FEA05E] text-5xl font-serif leading-none select-none">&ldquo;</span>
              <p className="text-base leading-relaxed text-white mt-2">
                Kaarsen stonden ons op te wachten,
                het rook er heerlijk, het was verwarmd
                bij aankomst. De rust van deze plek is
                ongeëvenaard. We voelden ons helemaal thuis.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#C08D6E]/30 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-[#FEA05E]">Sa</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sabrina</p>
                <p className="text-xs text-[#C08D6E]">Chalet Ann-Helena, Ursel</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white rounded-2xl p-8 flex flex-col justify-between gap-8">
            <div>
              <span className="text-[#FEA05E] text-5xl font-serif leading-none select-none">&ldquo;</span>
              <p className="text-base leading-relaxed text-[#1A1A1A] mt-2">
                Verblijven in de hottub terwijl je naar
                de sterren kijkt met het kampvuur — perfect.
                Een uitzonderlijke plek.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-[#FAE4D6]">
              <div className="w-10 h-10 rounded-full bg-[#EDD5C0] flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-[#C08D6E]">L</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">Lucie</p>
                <p className="text-xs text-[#C08D6E]">The Cozy Relax Home, Beernem</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
