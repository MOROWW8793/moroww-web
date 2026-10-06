"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
            <p className="text-white/60 text-center text-audit uppercase mt-3">
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
