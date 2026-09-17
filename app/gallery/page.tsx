/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { gallery } from "@/data/site";

export const metadata: Metadata = { title: "gallery" };

function Strip({ reverse, className }: { reverse?: boolean; className: string }) {
  // Photos are listed twice so the drift loop is seamless.
  const items = [...gallery, ...gallery];
  return (
    <div className={`strip fade ${className}`}>
      <div className={reverse ? "track rev" : "track"}>
        {items.map((photo, i) =>
          photo.src ? (
            <img key={i} className="ph" src={photo.src} alt={i < gallery.length ? photo.alt : ""} />
          ) : (
            <div key={i} className="ph" role="img" aria-label={photo.alt} aria-hidden={i >= gallery.length} />
          ),
        )}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <main>
      <div className="ln line fade f1 gallery-title">
        <span className="hang" aria-hidden="true">
          &gt;
        </span>
        ls ~/gallery <span className="gallery-hint">(hover to pause)</span>
      </div>
      <Strip className="f2 strip-1" />
      <Strip className="f3 strip-2" reverse />
    </main>
  );
}
