'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';

type Props = {
  hasVideo: boolean;
};

// Pre-rendered marketing tiles (device frame + gradient + caption baked in),
// localized per language. Files live in public/tour/<locale>/<stem>.webp.
// Each locale shows its own complete set — captions are already in the right language.
const TILES: Record<'en' | 'he', string[]> = {
  en: ['01-vault-home', '02-lock-pin', '03-folder-detail', '04-new-folder', '06-media-viewer', '08-share', '09-widget'],
  he: ['02-lock-pin', '03-folder-detail', '04-new-folder', '05-import', '07-settings', '09-widget'],
};

export function Tour({ hasVideo }: Props) {
  const { locale, dir } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const tiles = TILES[locale] ?? TILES.en;

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = Math.abs(el.scrollLeft);
    setShowLeftFade(x > 4);
    setShowRightFade(x < max - 4);
  };

  useEffect(() => {
    onScroll();
  }, [tiles.length]);

  const eyebrow = locale === 'he' ? 'סיור באפליקציה' : 'A look inside';
  const title =
    locale === 'he'
      ? 'מהיר לתפעול. פרטי בתכנון.'
      : 'Fast to use. Private by design.';
  const sub =
    locale === 'he'
      ? 'הסתכל איך זה עובד. כל פעולה — מקומית במכשיר שלך, מוצפנת כברירת מחדל.'
      : 'Take a tour. Every action happens on-device, encrypted by default.';

  return (
    <section
      id="tour"
      className="relative py-24 sm:py-32 border-t border-[var(--color-border)] overflow-hidden"
    >
      {/* faint background halo */}
      <span
        className="halo"
        aria-hidden
        style={{
          width: 900,
          height: 900,
          top: -380,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.18,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span className="dot" />
            <span>{eyebrow}</span>
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-soft)] leading-relaxed max-w-xl">
            {sub}
          </p>
        </div>
      </div>

      {/* video block */}
      {hasVideo && (
        <div className="relative mx-auto max-w-6xl mt-14 sm:mt-16 px-5 sm:px-8">
          <div className="phone-frame mx-auto" style={{ width: 320 }}>
            <div className="overflow-hidden rounded-[34px] bg-black aspect-[9/19.5]">
              <video
                src="/preview.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                aria-label={locale === 'he' ? 'תצוגה מקדימה של האפליקציה' : 'App preview'}
              />
            </div>
          </div>
        </div>
      )}

      {/* marketing tiles gallery (pre-framed, localized) */}
      <div className="relative mt-14 sm:mt-20">
        {/* edge fades */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 start-0 w-20 sm:w-32 z-10 transition-opacity duration-300 ${
            showLeftFade ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              dir === 'rtl'
                ? 'linear-gradient(270deg, var(--color-bg) 0%, transparent 100%)'
                : 'linear-gradient(90deg, var(--color-bg) 0%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 end-0 w-20 sm:w-32 z-10 transition-opacity duration-300 ${
            showRightFade ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              dir === 'rtl'
                ? 'linear-gradient(90deg, var(--color-bg) 0%, transparent 100%)'
                : 'linear-gradient(270deg, var(--color-bg) 0%, transparent 100%)',
          }}
        />

        <div
          ref={trackRef}
          onScroll={onScroll}
          dir="ltr"
          className="flex items-stretch gap-5 sm:gap-7 overflow-x-auto snap-x snap-mandatory px-[8vw] sm:px-[14vw] pb-4 scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.18) transparent',
          }}
        >
          {tiles.map((stem, i) => (
            <div
              key={stem}
              className="snap-center shrink-0 relative w-[248px] sm:w-[300px] aspect-[1320/2868] rounded-[26px] overflow-hidden border border-[var(--color-border)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={`/tour/${locale}/${stem}.webp`}
                alt={
                  locale === 'he'
                    ? `צילום מסך של Emoryx ${i + 1}`
                    : `Emoryx app screenshot ${i + 1}`
                }
                fill
                sizes="(min-width: 640px) 300px, 248px"
                className="object-cover"
                priority={i < 2}
              />
            </div>
          ))}
        </div>

        {/* swipe hint (mobile) */}
        <p className="sm:hidden text-center text-[11px] mt-4 text-[var(--color-text-dim)] uppercase tracking-[0.18em]">
          {locale === 'he' ? '← החלק לצפייה' : 'Swipe to view →'}
        </p>
      </div>
    </section>
  );
}
