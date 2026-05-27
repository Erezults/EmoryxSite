import { Hero } from '@/components/Hero';
import { Tour } from '@/components/Tour';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { TrustStrip } from '@/components/TrustStrip';
import { ClosingBand } from '@/components/ClosingBand';
import { listScreenshots, hasPreviewVideo } from '@/lib/screenshots';

export default async function HomePage() {
  const [screenshots, hasVideo] = await Promise.all([
    listScreenshots(),
    hasPreviewVideo(),
  ]);
  return (
    <>
      <Hero />
      <Tour screenshots={screenshots} hasVideo={hasVideo} />
      <Features />
      <Pricing />
      <TrustStrip />
      <ClosingBand />
    </>
  );
}
