'use client';

import { useI18n } from '@/lib/i18n';

export function TrustStrip() {
  const { t } = useI18n();
  const items = [
    t('trust1'),
    t('trust2'),
    t('trust3'),
    t('trust4'),
    t('trust5'),
  ];

  const dup = [...items, ...items, ...items];

  return (
    <section className="relative py-14 border-t border-[var(--color-border)] overflow-hidden marquee">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 inset-x-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, transparent 8%, transparent 92%, var(--color-bg) 100%)',
        }}
      />
      <div className="marquee-track gap-12 sm:gap-16 px-6">
        {dup.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] text-white/90 whitespace-nowrap"
          >
            <span>{label}</span>
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-violet)]"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
