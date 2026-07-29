"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  fotos: string[];
  naam: string;
}

// Hero + 5 tegels zichtbaar. De rest zit achter 'bekijk alle X foto's'
// in een full-screen modal die pas laadt bij openen.
export function WoningGalerij({ fotos, naam }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i! > 0 ? i! - 1 : fotos.length - 1));
  const next = () => setLightbox((i) => (i! < fotos.length - 1 ? i! + 1 : 0));

  // Sluit lightbox met Escape; pijltjes navigeren tussen foto's.
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

  // Grid rechts: 5 tegels (index 1..5). Als er minder foto's zijn, minder tegels.
  const rightTiles = fotos.slice(1, 6);
  const restCount = Math.max(0, fotos.length - 6);

  return (
    <>
      {/* ── Galerij (hero + 5 tegels) ── */}
      <div className="relative">
        {/* Desktop: 3-col × 3-row grid, hero span 2×2, 5 tegels rechts en onder */}
        <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-2 h-[560px]">
          {/* Hero */}
          <button
            className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl cursor-zoom-in group"
            onClick={() => open(0)}
            aria-label={`bekijk ${naam} — foto 1`}
          >
            <Image
              src={fotos[0]}
              alt={naam}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </button>

          {/* 5 tegels */}
          {rightTiles.map((foto, i) => (
            <button
              key={i}
              className="relative overflow-hidden rounded-2xl cursor-zoom-in group"
              onClick={() => open(i + 1)}
              aria-label={`bekijk ${naam} — foto ${i + 2}`}
            >
              <Image
                src={foto}
                alt={`${naam} foto ${i + 2}`}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 22vw"
              />
            </button>
          ))}
        </div>

        {/* Mobiel: alleen hero (swipeable) */}
        <div
          className="md:hidden relative w-full h-64 overflow-hidden rounded-2xl cursor-zoom-in"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => open(0)}
        >
          <Image
            src={fotos[0]}
            alt={naam}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs rounded-full px-3 py-1">
            1 / {fotos.length}
          </div>
        </div>

        {/* 'bekijk alle X foto's' knop — rechtsonder op desktop, onder hero op mobiel */}
        {fotos.length > 1 && (
          <button
            onClick={() => open(0)}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white text-moroww-black text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            {restCount > 0
              ? `bekijk alle ${fotos.length} foto's`
              : `bekijk galerij`}
          </button>
        )}
      </div>

      {/* ── Lightbox (rendert pas bij openen — foto's laden lazy) ── */}
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
            <p className="text-white/60 text-center text-sm mt-3">
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
