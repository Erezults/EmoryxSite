'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import type { ScreenshotEntry } from '@/lib/screenshots';

type Props = {
  screenshots: ScreenshotEntry[];
  hasVideo: boolean;
};

export function Tour({ screenshots, hasVideo }: Props) {
  const { t, locale, dir } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  // If there are no screenshots and no video, render nothing
  if (screenshots.length === 0 && !hasVideo) return null;

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
  }, [screenshots.length]);

  const eyebrow = locale === 'he' ? 'סיור באפליקציה' : 'A look inside';
  const title =
    locale === 'he'
      ? 'נוסע במהירות. נשאר פרטי.'
      : 'Fast to use. Private by design.';
  const sub =
    locale === 'he'
      ? 'הסתכל איך זה עובד. כל פעולה — מקומית במכשיר שלך, מוצפנת כברירת מחדל.'
      : "Take a tour. Every action happens on-device, encrypted by default.";

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

      {/* screenshots carousel */}
      {screenshots.length > 0 && (
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
            className="flex items-end gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory px-[10vw] sm:px-[15vw] pb-4 scroll-smooth"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.18) transparent',
            }}
          >
            {screenshots.map((s, i) => (
              <figure
                key={s.src}
                className="snap-center shrink-0"
                style={{ width: 260 }}
              >
                <div className="phone-frame">
                  <div className="overflow-hidden rounded-[34px] bg-black aspect-[9/19.5] relative">
                    <Image
                      src={s.src}
                      alt={s.label[locale]}
                      fill
                      sizes="260px"
                      className="object-cover"
                      priority={i < 2}
                    />
                  </div>
                </div>
                <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  <span className="inline-flex items-center gap-2">
                    <span className="font-mono text-[var(--color-text-dim)]">
                      0{i + 1}
                    </span>
                    <span>{s.label[locale]}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* swipe hint (mobile) */}
          <p className="sm:hidden text-center text-[11px] mt-4 text-[var(--color-text-dim)] uppercase tracking-[0.18em]">
            {locale === 'he' ? 'החלק לצפייה ←' : 'Swipe to view →'}
          </p>
        </div>
      )}
    </section>
  );
}
