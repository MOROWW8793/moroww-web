"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  fotos: string[];
  naam: string;
}

// Twee foto's naast elkaar, 50/50, 8px gutter, hoogte 62vh op ≥lg,
// gestapeld op smaller schermen. Geen afgeronde hoeken, geen schaduw.
// Rechtsonder in de tweede foto: rechthoek-knop 2px radius die de lightbox
// opent op index 0. De lightbox houdt alle foto's beschikbaar.
export function WoningGalerij({ fotos, naam }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const open = (i: number) => setLightbox(i);
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
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, fotos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
    }
  };

  const heeftTweede = fotos.length > 1;

  return (
    <>
      {/* Twee foto's naast elkaar (of één op smal scherm). 8px gutter. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[50vh] md:h-[62vh]">
        <button
          className="relative w-full h-full cursor-zoom-in overflow-hidden"
          onClick={() => open(0)}
          aria-label={`bekijk ${naam} — foto 1`}
        >
          <Image
            src={fotos[0]}
            alt={naam}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </button>

        {heeftTweede && (
          <div className="relative w-full h-full">
            <button
              className="relative w-full h-full cursor-zoom-in overflow-hidden block"
              onClick={() => open(1)}
              aria-label={`bekijk ${naam} — foto 2`}
            >
              <Image
                src={fotos[1]}
                alt={`${naam} foto 2`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </button>
            <button
              onClick={() => open(0)}
              className="absolute bottom-4 right-4 bg-white text-moroww-dark text-audit uppercase font-semibold px-4 py-2 rounded-[2px] hover:bg-moroww-blush transition-colors"
            >
              bekijk alle {fotos.length} foto&apos;s
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={close}
            aria-label="sluit galerij"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="vorige foto"
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="max-w-6xl max-h-[85vh] mx-16 relative"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos[lightbox]}
              alt={`${naam} ${lightbox + 1}`}
              style={{ maxWidth: "100%", maxHeight: "85vh", objectFit: "contain" }}
            />
            <p className="text-white/60 text-center text-audit uppercase mt-3">
              {lightbox + 1} / {fotos.length}
            </p>
          </div>

          <button
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="volgende foto"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
