import { promises as fs } from 'node:fs';
import path from 'node:path';

// The app tour now uses pre-rendered, localized marketing tiles under
// public/tour/<locale>/ (see components/Tour.tsx). The only filesystem check
// still needed at build time is whether a preview video is present.
export async function hasPreviewVideo(): Promise<boolean> {
  try {
    await fs.access(path.join(process.cwd(), 'public', 'preview.mp4'));
    return true;
  } catch {
    return false;
  }
}
