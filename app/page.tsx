import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { TrustStrip } from '@/components/TrustStrip';
import { ClosingBand } from '@/components/ClosingBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <TrustStrip />
      <ClosingBand />
    </>
  );
}
