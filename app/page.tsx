import { Hero } from '@/components/Hero';
import { Tour } from '@/components/Tour';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { TrustStrip } from '@/components/TrustStrip';
import { ClosingBand } from '@/components/ClosingBand';
import { hasPreviewVideo } from '@/lib/screenshots';

export default async function HomePage() {
  const hasVideo = await hasPreviewVideo();
  return (
    <>
      <Hero />
      <Tour hasVideo={hasVideo} />
      <Features />
      <Pricing />
      <TrustStrip />
      <ClosingBand />
    </>
  );
}
