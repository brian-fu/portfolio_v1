"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import type { Photo } from "@/data/gallery";

// A tile is 220px wide plus the 20px gap, so tying the duration to the tile
// count keeps the tape moving at the same speed however many photos there are.
const SECONDS_PER_TILE = 8;

export default function Strip({
  photos,
  reverse,
  className,
}: {
  photos: Photo[];
  reverse?: boolean;
  className: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  // One cycle walks the tape by exactly one copy of the list, so a delay of
  // -k tiles opens on photo k. Done after mount, and as a style rather than
  // a reorder, so the markup stays server-rendered and nothing re-renders.
  useEffect(() => {
    const el = track.current;
    if (!el || photos.length === 0) return;
    const k = Math.floor(Math.random() * photos.length);
    el.style.animationDelay = `-${k * SECONDS_PER_TILE}s`;
  }, [photos.length]);

  // Photos are listed twice so the drift loop is seamless.
  const items = [...photos, ...photos];
  const style = { "--drift": `${photos.length * SECONDS_PER_TILE}s` } as CSSProperties;

  return (
    <div className={`strip fade ${className}`}>
      <div ref={track} className={reverse ? "track rev" : "track"} style={style}>
        {items.map((photo, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={i}
            className="ph"
            src={photo.src}
            alt={i < photos.length ? photo.alt : ""}
            aria-hidden={i >= photos.length}
          />
        ))}
      </div>
    </div>
  );
}
