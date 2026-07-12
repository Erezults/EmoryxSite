import { Hero } from '@/components/Hero';
import { Tour } from '@/components/Tour';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { TrustStrip } from '@/components/TrustStrip';
import { ClosingBand } from '@/components/ClosingBand';
import { hasPreviewVideo, getTourTiles } from '@/lib/screenshots';

export default async function HomePage() {
  const [hasVideo, tourTiles] = await Promise.all([hasPreviewVideo(), getTourTiles()]);
  return (
    <>
      <Hero />
      <Tour hasVideo={hasVideo} tiles={tourTiles} />
      <Features />
      <Pricing />
      <TrustStrip />
      <ClosingBand />
    </>
  );
}
