import fs from "node:fs";
import path from "node:path";

export type Photo = { src: string; alt: string };

const dir = path.join(process.cwd(), "public", "gallery");
const image = /\.(avif|gif|jpe?g|png|webp)$/i;

// Filenames run in camera-roll order, which would group the gallery by date.
// Shuffling here also decides which half lands in each strip.
function shuffle<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Reads public/gallery at build time — drop a file in and it shows up.
// The filename becomes the alt text, so name them descriptively.
export function getGallery(): Photo[] {
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return shuffle(files.filter((file) => image.test(file)))
    .map((file) => ({
      src: `/gallery/${file}`,
      alt: path.parse(file).name.replace(/[-_]+/g, " "),
    }));
}
