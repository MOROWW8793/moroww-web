"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  fotos: string[];
  naam: string;
}

export function WoningGalerij({ fotos, naam }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i! > 0 ? i! - 1 : fotos.length - 1));
  const next = () => setLightbox((i) => (i! < fotos.length - 1 ? i! + 1 : 0));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev < fotos.length - 1 ? prev + 1 : prev));
      } else {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    }
  };

  const grid = fotos.slice(1, 5);

  return (
    <>
      {/* ── Galerij ── */}
      <div className="flex flex-col md:flex-row gap-2 md:h-[480px]">

        {/* Hoofdfoto (mobiel: swipeable, desktop: 60%) */}
        <div
          className="relative w-full md:w-[60%] h-64 md:h-full overflow-hidden rounded-2xl md:rounded-l-2xl md:rounded-r-none cursor-zoom-in"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => open(activeIndex)}
        >
          <Image
            src={fotos[activeIndex]}
            alt={naam}
            fill
            className="object-cover transition-opacity duration-200"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          {/* Foto teller — alleen mobiel */}
          <div className="absolute bottom-3 right-3 md:hidden bg-black/50 text-white text-xs rounded-full px-3 py-1">
            {activeIndex + 1} / {fotos.length}
          </div>
        </div>

        {/* Grid 2x2 rechts — alleen desktop (40%) */}
        {grid.length > 0 && (
          <div className="hidden md:grid grid-cols-2 gap-2 w-[40%] h-full">
            {grid.map((foto, i) => (
              <button
                key={i}
                className={`relative overflow-hidden cursor-zoom-in ${
                  i === 0 ? "rounded-tr-2xl" : i === 1 ? "" : i === 2 ? "" : "rounded-br-2xl"
                }`}
                onClick={() => open(i + 1)}
              >
                <Image
                  src={foto}
                  alt={`${naam} foto ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
                {i === 3 && fotos.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      +{fotos.length - 5} foto&apos;s
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {fotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 mt-2">
          {fotos.map((foto, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); open(i); }}
              className={`relative flex-shrink-0 w-24 h-16 md:w-16 md:h-16 snap-start overflow-hidden rounded-lg transition-all ${
                activeIndex === i
                  ? "ring-2 ring-[#FEA05E] opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={foto}
                alt={`${naam} ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={close}
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={32} />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos[lightbox]}
              alt={`${naam} ${lightbox + 1}`}
              style={{ maxWidth: "100%", maxHeight: "85vh", objectFit: "contain" }}
            />
            <p className="text-white/50 text-center text-sm mt-2">
              {lightbox + 1} / {fotos.length}
            </p>
          </div>

          <button
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
