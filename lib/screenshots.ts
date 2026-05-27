import { promises as fs } from 'node:fs';
import path from 'node:path';

type ScreenshotMeta = {
  stem: string;
  label: { en: string; he: string };
};

// Canonical order + labels by filename stem (extension-agnostic).
const KNOWN: ScreenshotMeta[] = [
  { stem: 'lock',     label: { en: 'App lock',            he: 'נעילת אפליקציה' } },
  { stem: 'password', label: { en: 'Folder password',     he: 'סיסמת תיקייה' } },
  { stem: 'home',     label: { en: 'Home',                he: 'מסך בית' } },
  { stem: 'folder',   label: { en: 'Folder',              he: 'תיקייה' } },
  { stem: 'import',   label: { en: 'Import',              he: 'ייבוא' } },
  { stem: 'share',    label: { en: 'Share Extension',     he: 'Share Extension' } },
  { stem: 'widget',   label: { en: 'Lock Screen widget',  he: 'Lock Screen widget' } },
  { stem: 'settings', label: { en: 'Settings',            he: 'הגדרות' } },
  { stem: 'icloud',   label: { en: 'iCloud Backup',       he: 'iCloud Backup' } },
];

export type ScreenshotEntry = {
  src: string;
  label: { en: string; he: string };
};

const VALID_EXT = /\.(png|jpe?g|webp|avif)$/i;
const stemOf = (f: string) => f.replace(/\.[^.]+$/, '').toLowerCase();

export async function listScreenshots(): Promise<ScreenshotEntry[]> {
  const root = path.join(process.cwd(), 'public', 'screenshots');
  const out: ScreenshotEntry[] = [];

  let files: string[] = [];
  try {
    files = await fs.readdir(root);
  } catch {
    return out;
  }
  const images = files.filter((f) => VALID_EXT.test(f));
  const used = new Set<string>();

  // Known stems first, in canonical order — first matching file wins.
  for (const k of KNOWN) {
    const match = images.find((f) => stemOf(f) === k.stem && !used.has(f));
    if (match) {
      used.add(match);
      out.push({ src: `/screenshots/${match}`, label: k.label });
    }
  }

  // Any other images — appended in alpha order, label = filename stem.
  for (const f of images.sort()) {
    if (used.has(f)) continue;
    const stem = f.replace(/\.[^.]+$/, '');
    out.push({
      src: `/screenshots/${f}`,
      label: { en: stem, he: stem },
    });
  }

  return out;
}

export async function hasPreviewVideo(): Promise<boolean> {
  try {
    await fs.access(path.join(process.cwd(), 'public', 'preview.mp4'));
    return true;
  } catch {
    return false;
  }
}
