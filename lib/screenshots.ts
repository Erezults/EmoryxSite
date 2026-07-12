import { promises as fs } from 'node:fs';
import path from 'node:path';

// The app tour uses pre-rendered, localized marketing tiles under
// public/tour/<locale>/ (see components/Tour.tsx).

export type TourTile = { stem: string; src: string };
export type TourTiles = Record<'en' | 'he', TourTile[]>;

async function listTileStems(locale: string): Promise<string[]> {
  try {
    const files = await fs.readdir(path.join(process.cwd(), 'public', 'tour', locale));
    return files.filter((f) => f.endsWith('.webp')).map((f) => f.replace(/\.webp$/, ''));
  } catch {
    return [];
  }
}

// Both locales show the same ordered set of screens (the union of what exists
// on disk). Each tile prefers its own locale's file and falls back to the
// other locale's, so a not-yet-localized screen still appears — drop the
// missing .webp into public/tour/<locale>/ and it's picked up automatically.
export async function getTourTiles(): Promise<TourTiles> {
  const [en, he] = await Promise.all([listTileStems('en'), listTileStems('he')]);
  const enSet = new Set(en);
  const heSet = new Set(he);
  const stems = [...new Set([...en, ...he])].sort();
  return {
    en: stems.map((stem) => ({ stem, src: `/tour/${enSet.has(stem) ? 'en' : 'he'}/${stem}.webp` })),
    he: stems.map((stem) => ({ stem, src: `/tour/${heSet.has(stem) ? 'he' : 'en'}/${stem}.webp` })),
  };
}

// Build-time check for the optional preview video.
export async function hasPreviewVideo(): Promise<boolean> {
  try {
    await fs.access(path.join(process.cwd(), 'public', 'preview.mp4'));
    return true;
  } catch {
    return false;
  }
}
