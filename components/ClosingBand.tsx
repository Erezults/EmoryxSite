'use client';

import { useI18n } from '@/lib/i18n';
import { AppStoreBadge } from './AppStoreBadge';
import { EmoryxMark } from './EmoryxMark';

export function ClosingBand() {
  const { t } = useI18n();

  return (
    <section className="relative py-28 sm:py-40 border-t border-[var(--color-border)] overflow-hidden">
      {/* large center halo */}
      <span
        className="halo"
        style={{
          width: 980,
          height: 980,
          top: -380,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.28,
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <div className="flex justify-center">
          <EmoryxMark size={84} withHalo />
        </div>
        <h2 className="mt-10 font-display italic text-[clamp(2.4rem,5.4vw,4.8rem)] leading-[1.05] tracking-tight text-white">
          {t('closingTitle')}
        </h2>
        <p className="mt-5 text-lg text-[var(--color-text-soft)]">
          {t('closingSub')}
        </p>
        <div className="mt-10 flex justify-center">
          <AppStoreBadge variant="primary" />
        </div>
      </div>
    </section>
  );
}
