'use client';

import { useI18n } from '@/lib/i18n';
import { Check } from 'lucide-react';
import { APP_STORE_URL } from '@/lib/appStore';

export function Pricing() {
  const { t } = useI18n();

  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-36 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span className="dot" />
            <span>{t('pricingEyebrow')}</span>
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] tracking-tight text-white">
            {t('pricingTitle')}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <PlanCard
            title={t('priceFreeTitle')}
            price={t('priceFreePrice')}
            unit={t('priceFreeUnit')}
            bullets={[
              t('priceFreeBullet1'),
              t('priceFreeBullet2'),
              t('priceFreeBullet3'),
              t('priceFreeBullet4'),
              t('priceFreeBullet5'),
            ]}
            cta={t('priceFreeCta')}
          />
          <PlanCard
            title={t('pricePremiumTitle')}
            price={t('pricePremiumPrice')}
            unit={t('pricePremiumUnit')}
            badge={t('pricePremiumBadge')}
            note={`${t('pricePremiumNoteY')} · ${t('pricePremiumNoteL')}`}
            bullets={[
              t('pricePremiumBullet1'),
              t('pricePremiumBullet2'),
              t('pricePremiumBullet3'),
              t('pricePremiumBullet4'),
              t('pricePremiumBullet5'),
            ]}
            cta={t('pricePremiumCta')}
            featured
          />
        </div>

        <p className="mt-8 text-center text-xs text-[var(--color-text-muted)] max-w-2xl mx-auto">
          {t('pricingFooterNote')}
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  title,
  price,
  unit,
  bullets,
  cta,
  badge,
  note,
  featured,
}: {
  title: string;
  price: string;
  unit: string;
  bullets: string[];
  cta: string;
  badge?: string;
  note?: string;
  featured?: boolean;
}) {
  const ctaHref = APP_STORE_URL;
  return (
    <div
      className={[
        'relative rounded-3xl p-8 sm:p-10',
        featured
          ? 'bg-gradient-to-br from-[#1a0f2e] via-[#0F0F14] to-[#0a0f1e] border border-[#7C3AED]/30'
          : 'bg-[var(--color-bg-elev)] border border-[var(--color-border)]',
      ].join(' ')}
    >
      {featured && (
        <>
          {/* glowing top edge */}
          <div
            aria-hidden
            className="absolute inset-x-12 -top-px h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, #7C3AED, #2563EB, transparent)',
            }}
          />
          {/* corner glow */}
          <div
            aria-hidden
            className="absolute -top-24 -end-24 w-72 h-72 rounded-full blur-3xl opacity-40"
            style={{
              background:
                'radial-gradient(closest-side, #7C3AED70, transparent 70%)',
            }}
          />
        </>
      )}

      <div className="relative flex items-start justify-between">
        <h3
          className={`font-display text-2xl sm:text-3xl tracking-tight ${
            featured ? 'text-white' : 'text-white'
          }`}
        >
          {title}
        </h3>
        {badge && (
          <span className="text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border border-[#7C3AED]/40 text-[#C4B5FD] bg-[#7C3AED]/10">
            {badge}
          </span>
        )}
      </div>

      <div className="relative mt-6 flex items-end gap-2">
        <span className="font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-none text-white tracking-tight">
          {price}
        </span>
        <span className="pb-2 text-sm text-[var(--color-text-muted)]">
          / {unit}
        </span>
      </div>

      {note && (
        <p className="relative mt-2 text-xs text-[var(--color-text-muted)]">
          {note}
        </p>
      )}

      <ul className="relative mt-8 space-y-3">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[0.95rem] text-[var(--color-text-soft)]"
          >
            <span
              className={`mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                featured
                  ? 'bg-[#7C3AED] text-white'
                  : 'bg-white/[0.06] text-white'
              }`}
            >
              <Check className="w-3 h-3" strokeWidth={3} />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'relative mt-10 inline-flex items-center justify-center w-full rounded-2xl py-3.5 text-sm font-semibold transition',
          featured
            ? 'bg-white text-black hover:bg-white/90'
            : 'border border-[var(--color-border-strong)] text-white hover:bg-white/[0.04]',
        ].join(' ')}
      >
        {cta}
      </a>
    </div>
  );
}
