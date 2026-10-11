import fs from "node:fs";
import path from "node:path";
import { gallerySlots } from "@/data/caseStudies";

const EXTENSIONS = ["webp", "jpg", "jpeg", "png"];

export type GalleryImage = { src: string; title: string; caption: string };

// Reads public/5g-hotel at build/render time and keeps only the screenshots
// that actually exist, so the site never shows empty frames.
export function loadGallery(folder = "5g-hotel"): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", folder);
  const images: GalleryImage[] = [];

  for (const slot of gallerySlots) {
    for (const ext of EXTENSIONS) {
      if (fs.existsSync(path.join(dir, slot.file + "." + ext))) {
        images.push({
          src: "/" + folder + "/" + slot.file + "." + ext,
          title: slot.title,
          caption: slot.caption,
        });
        break;
      }
    }
  }
  return images;
}
