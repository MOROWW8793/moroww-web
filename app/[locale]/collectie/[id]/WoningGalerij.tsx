"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Labels {
  sluit: string;
  vorige: string;
  volgende: string;
  /** Met {n} als plaatshouder voor het fotonummer. */
  foto: string;
}

interface Galerij {
  fotos: string[];
  altFor: (i: number) => string;
  labels: Labels;
  open: (i: number) => void;
}

const GalerijContext = createContext<Galerij | null>(null);

const useGalerij = () => useContext(GalerijContext)!;

// De pandpagina toont foto's op meerdere plekken (hero, rondleiding,
// beeldband). Eén provider houdt de lightbox, zodat elke foto op de pagina
// dezelfde galerij opent op de juiste index.
export function GalerijProvider({
  fotos,
  naam,
  alts,
  labels,
  children,
}: {
  fotos: string[];
  naam: string;
  /** Alt-tekst per foto, parallel aan `fotos`. Ontbrekende indexen vallen terug op `naam`. */
  alts?: string[];
  labels: Labels;
  children: ReactNode;
}) {
  const altFor = (i: number) => alts?.[i] || naam;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef(0);

  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i! > 0 ? i! - 1 : fotos.length - 1));
  const next = () => setLightbox((i) => (i! < fotos.length - 1 ? i! + 1 : 0));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, fotos.length]);

  return (
    <GalerijContext.Provider value={{ fotos, altFor, labels, open: setLightbox }}>
      {children}

      {lightbox !== null && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center" onClick={close}>
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={close}
            aria-label={labels.sluit}
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label={labels.vorige}
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="max-w-6xl max-h-[85vh] mx-16 relative"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) (diff > 0 ? next : prev)();
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos[lightbox]}
              alt={altFor(lightbox)}
              style={{ maxWidth: "100%", maxHeight: "85vh", objectFit: "contain" }}
            />
            <p className="text-white/60 text-center text-audit mt-3">
              {lightbox + 1} / {fotos.length}
            </p>
          </div>

          <button
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label={labels.volgende}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </GalerijContext.Provider>
  );
}

// Eén foto uit de galerij als klikbaar vlak. De parent bepaalt de maat.
export function FotoKnop({
  index,
  sizes,
  priority,
  className = "",
}: {
  index: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const { fotos, altFor, labels, open } = useGalerij();
  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={labels.foto.replace("{n}", String(index + 1))}
      className={`group relative block overflow-hidden cursor-zoom-in ${className}`}
    >
      <Image
        src={fotos[index]}
        alt={altFor(index)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </button>
  );
}

export function AlleFotosKnop({ label, className }: { label: string; className: string }) {
  const { open } = useGalerij();
  return (
    <button type="button" onClick={() => open(0)} className={className}>
      {label}
    </button>
  );
}

const GLAS =
  "bg-white/[0.12] backdrop-blur-xl backdrop-saturate-150 border border-white/25 text-white";

function useRustig() {
  const [rustig, setRustig] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRustig(mq.matches);
    const f = (e: MediaQueryListEvent) => setRustig(e.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return rustig;
}

// Hero als diavoorstelling. Draait alleen zolang niemand erboven hangt of
// erin focust, en nooit bij minder-beweging; de knop pauzeert voorgoed.
// children is de server-gerenderde kop die over de beelden ligt.
export function HeroDiashow({
  indices,
  labels,
  children,
}: {
  indices: number[];
  labels: { pauzeer: string; speel: string; dia: string; alle: string };
  children: ReactNode;
}) {
  const { fotos, altFor, open, labels: gl } = useGalerij();
  const rustig = useRustig();
  const [actief, setActief] = useState(0);
  const [gepauzeerd, setGepauzeerd] = useState(false);
  const [erboven, setErboven] = useState(false);

  useEffect(() => {
    if (gepauzeerd || erboven || rustig || indices.length < 2) return;
    const t = setTimeout(() => setActief((a) => (a + 1) % indices.length), 6500);
    return () => clearTimeout(t);
  }, [actief, gepauzeerd, erboven, rustig, indices.length]);

  return (
    <section
      className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-moroww-dark"
      onMouseEnter={() => setErboven(true)}
      onMouseLeave={() => setErboven(false)}
      onFocus={() => setErboven(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setErboven(false); }}
    >
      {indices.map((i, n) => (
        <button
          key={i}
          type="button"
          onClick={() => open(i)}
          tabIndex={n === actief ? 0 : -1}
          aria-hidden={n !== actief}
          aria-label={gl.foto.replace("{n}", String(i + 1))}
          className={`absolute inset-0 cursor-zoom-in transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none ${n === actief ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <Image
            src={fotos[i]}
            alt={altFor(i)}
            fill
            sizes="100vw"
            priority={n === 0}
            className={`object-cover transition-transform duration-[8000ms] ease-out motion-reduce:transition-none ${n === actief && !rustig ? "scale-[1.06]" : "scale-100"}`}
          />
        </button>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/70" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 md:px-12 pb-mw-4 md:pb-mw-5">
        {children}
        <div className="mt-mw-6 md:mt-mw-8 flex items-center justify-between gap-mw-4 text-white/85">
          <p className="hidden sm:block text-audit max-w-[60ch] truncate" aria-live="polite">
            {altFor(indices[actief])}
          </p>
          <div className="pointer-events-auto flex items-center gap-2 ml-auto">
            {indices.length > 1 && indices.map((i, n) => (
              <button
                key={i}
                type="button"
                onClick={() => { setActief(n); setGepauzeerd(true); }}
                aria-label={`${labels.dia} ${n + 1}`}
                aria-current={n === actief}
                className="p-2 -m-1"
              >
                <span className={`block h-[3px] w-5 sm:w-8 origin-left bg-white transition-[transform,opacity] duration-300 motion-reduce:transition-none ${n === actief ? "scale-x-100 opacity-100" : "scale-x-50 opacity-45"}`} />
              </button>
            ))}
            {indices.length > 1 && (
              <button
                type="button"
                onClick={() => setGepauzeerd((g) => !g)}
                aria-pressed={gepauzeerd}
                aria-label={gepauzeerd ? labels.speel : labels.pauzeer}
                className="ml-1 inline-flex h-11 w-11 -my-3 items-center justify-center rounded-full hover:bg-white/15 transition-colors"
              >
                {gepauzeerd ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => open(0)}
              className={`${GLAS} ml-2 whitespace-nowrap rounded-full px-4 py-2 text-audit hover:bg-white/25 transition-colors`}
            >
              {labels.alle}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Doorlopende fotostrook met snap. De pijlen liggen als glas over de beelden.
export function FotoCarrousel({ indices }: { indices: number[] }) {
  const { labels } = useGalerij();
  const spoor = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);

  const schuif = (richting: 1 | -1) => {
    const el = spoor.current;
    if (el) el.scrollBy({ left: richting * el.clientWidth * 0.75, behavior: "smooth" });
  };
  const opScroll = () => {
    const el = spoor.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPos(max > 0 ? Math.round((el.scrollLeft / max) * (indices.length - 1)) : 0);
  };

  const pijl = `${GLAS} pointer-events-auto hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-white/30 transition-colors disabled:opacity-0`;

  return (
    <div className="relative">
      <div
        ref={spoor}
        onScroll={opScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 md:px-12 scroll-px-6 md:scroll-px-12 lg:px-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:scroll-px-[max(3rem,calc((100vw-80rem)/2+3rem))]"
      >
        {indices.map((i, n) => (
          <FotoKnop
            key={i}
            index={i}
            sizes="(max-width: 768px) 85vw, 50vw"
            className={`snap-start shrink-0 rounded-2xl h-[58vh] md:h-[70vh] max-w-[85vw] ${n % 3 === 0 ? "aspect-[4/5]" : "aspect-[3/2]"}`}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 inset-x-0 mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        <button type="button" onClick={() => schuif(-1)} disabled={pos === 0} aria-label={labels.vorige} className={pijl}>
          <ChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => schuif(1)} disabled={pos === indices.length - 1} aria-label={labels.volgende} className={pijl}>
          <ChevronRight size={22} />
        </button>
      </div>
      <p className="mx-auto max-w-7xl px-6 md:px-12 mt-mw-3 text-audit text-moroww-ink-2 tabular-nums" aria-hidden>
        {String(pos + 1).padStart(2, "0")} / {String(indices.length).padStart(2, "0")}
      </p>
    </div>
  );
}
