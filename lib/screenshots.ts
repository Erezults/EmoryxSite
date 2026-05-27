import { promises as fs } from 'node:fs';
import path from 'node:path';

type ScreenshotMeta = {
  file: string;
  label: { en: string; he: string };
};

const KNOWN: ScreenshotMeta[] = [
  { file: 'lock.png',     label: { en: 'Lock screen',         he: 'מסך נעילה' } },
  { file: 'home.png',     label: { en: 'Home',                he: 'מסך בית' } },
  { file: 'folder.png',   label: { en: 'Folder',              he: 'תיקייה' } },
  { file: 'share.png',    label: { en: 'Share Extension',     he: 'Share Extension' } },
  { file: 'widget.png',   label: { en: 'Lock Screen widget',  he: 'Lock Screen widget' } },
  { file: 'settings.png', label: { en: 'Settings',            he: 'הגדרות' } },
  { file: 'import.png',   label: { en: 'Import',              he: 'ייבוא' } },
  { file: 'icloud.png',   label: { en: 'iCloud Backup',       he: 'iCloud Backup' } },
];

export type ScreenshotEntry = {
  src: string;
  label: { en: string; he: string };
};

export async function listScreenshots(): Promise<ScreenshotEntry[]> {
  const root = path.join(process.cwd(), 'public', 'screenshots');
  const out: ScreenshotEntry[] = [];

  let files: string[] = [];
  try {
    files = await fs.readdir(root);
  } catch {
    return out;
  }

  // Known files in canonical order
  for (const k of KNOWN) {
    if (files.includes(k.file)) {
      out.push({ src: `/screenshots/${k.file}`, label: k.label });
    }
  }

  // Any other PNG/JPG/WebP files found, appended in alpha order
  const seen = new Set(out.map((e) => path.basename(e.src)));
  const extras = files
    .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f) && !seen.has(f))
    .sort();
  for (const f of extras) {
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
