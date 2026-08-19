"use client";

import { useState } from "react";
import Image from "next/image";

// Volle-breedte-foto binnen de linkerkolom op de pandpagina. Geen rounded,
// geen shadow. Als het bestand ontbreekt (404), verbergt de container
// zichzelf zodat er geen leeg vlak met alt-tekst blijft staan.
export function InlineFoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="mt-mw-6 relative w-full aspect-[3/2] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 60vw"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
