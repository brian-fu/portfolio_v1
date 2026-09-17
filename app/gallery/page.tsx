import type { Metadata } from "next";
import { getGallery } from "@/data/gallery";
import Strip from "./Strip";

export const metadata: Metadata = { title: "gallery" };

export default function GalleryPage() {
  const photos = getGallery();
  // The two strips split the set and run in opposite directions, so they read
  // as one long tape folded from the top row into the bottom one.
  const fold = Math.ceil(photos.length / 2);
  const top = photos.slice(0, fold);
  const bottom = photos.slice(fold);

  return (
    <main>
      <div className="ln line fade f1 gallery-title">
        <span className="hang" aria-hidden="true">
          &gt;
        </span>
        ls ~/gallery{" "}
        <span className="gallery-hint">
          {photos.length ? "(hover to pause)" : "(empty — add images to public/gallery)"}
        </span>
      </div>
      {top.length > 0 && <Strip photos={top} className="f2 strip-1" />}
      {bottom.length > 0 && <Strip photos={bottom} className="f3 strip-2" reverse />}
    </main>
  );
}
