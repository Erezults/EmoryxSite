'use client';

import { useI18n } from '@/lib/i18n';
import { EmoryxMark } from './EmoryxMark';
import { AppStoreBadge } from './AppStoreBadge';
import { ShieldCheck } from 'lucide-react';

export function Hero() {
  const { t, locale } = useI18n();

  return (
    <section className="relative overflow-hidden">
      {/* decorative haloes */}
      <span className="halo halo-a" />
      <span className="halo halo-b" />
      {/* grid backdrop fading top-down */}
      <div
        aria-hidden
        className="absolute inset-0 grid-bg"
        style={{
          maskImage:
            'linear-gradient(to bottom, black 0%, black 40%, transparent 95%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 40%, transparent 95%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          {/* eyebrow chip */}
          <span className="eyebrow reveal" style={{ animationDelay: '0ms' }}>
            <span className="dot" />
            <span dir="ltr">{t('heroEyebrow')}</span>
          </span>

          {/* logo mark */}
          <div
            className="mt-10 reveal"
            style={{ animationDelay: '90ms' }}
          >
            <EmoryxMark size={96} priority withHalo />
          </div>

          {/* headline */}
          <h1
            className="font-display mt-8 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.04] tracking-tight text-white max-w-4xl reveal"
            style={{ animationDelay: '180ms' }}
          >
            <span className="block">{t('heroTitleA')}</span>
            <span className="block italic gradient-text">
              {t('heroTitleB')}
            </span>
          </h1>

          {/* subhead */}
          <p
            className="mt-6 max-w-2xl text-base sm:text-lg text-[var(--color-text-soft)] leading-relaxed reveal"
            style={{ animationDelay: '260ms' }}
          >
            {t('heroSub')}
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 reveal"
            style={{ animationDelay: '340ms' }}
          >
            <AppStoreBadge variant="primary" href="#" />
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm text-white/85 hover:text-white border border-transparent hover:border-[var(--color-border)] transition"
            >
              <span>{t('heroCtaSecondary')}</span>
              <span aria-hidden className="rtl:rotate-180">↓</span>
            </a>
          </div>

          {/* assurance row */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--color-text-muted)] reveal"
            style={{ animationDelay: '420ms' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-brand-violet)]" />
              {locale === 'he'
                ? 'הצפנת AES-GCM'
                : 'AES-GCM encryption'}
            </span>
            <span aria-hidden className="opacity-50">·</span>
            <span>
              {locale === 'he'
                ? 'iOS 16 ומעלה'
                : 'iOS 16 and later'}
            </span>
            <span aria-hidden className="opacity-50">·</span>
            <span>
              {locale === 'he'
                ? 'גרסה 1.10 · בדרך ל-App Store'
                : 'v1.10 · coming to the App Store'}
            </span>
          </div>
        </div>

        {/* visual: large icon + meta panels */}
        <HeroShowcase />
      </div>

      <style jsx>{`
        .halo-a {
          width: 720px;
          height: 720px;
          top: -260px;
          inset-inline-start: -180px;
          opacity: 0.32;
        }
        .halo-b {
          width: 620px;
          height: 620px;
          top: 80px;
          inset-inline-end: -220px;
          opacity: 0.22;
        }
      `}</style>
    </section>
  );
}

function HeroShowcase() {
  const { locale } = useI18n();
  return (
    <div className="mt-20 sm:mt-28 relative">
      <div className="relative mx-auto max-w-3xl">
        {/* big glassy panel showing brand */}
        <div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 backdrop-blur p-6 sm:p-10 overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[120%] h-[260px] rounded-full blur-3xl opacity-50"
            style={{
              background:
                'radial-gradient(closest-side, #7C3AED50, transparent 70%)',
            }}
          />

          {/* status bar */}
          <div className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            <span dir="ltr">/ emoryx</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d39966]" />
              <span dir="ltr">vault locked</span>
            </span>
          </div>

          {/* center icon */}
          <div className="relative flex justify-center my-10">
            <EmoryxMark size={140} withHalo />
          </div>

          {/* mock stats row */}
          <div className="relative grid grid-cols-3 gap-3 sm:gap-6 text-center">
            <StatTile
              label={locale === 'he' ? 'תיקיות' : 'Folders'}
              value="12"
            />
            <StatTile
              label={locale === 'he' ? 'קבצים' : 'Files'}
              value="2,148"
            />
            <StatTile
              label={locale === 'he' ? 'הצפנה' : 'Encryption'}
              value="AES-GCM"
              mono
            />
          </div>
        </div>

        {/* tiny floating callouts */}
        <FloatingCallout
          className="hidden md:flex -left-10 top-20"
          dot="violet"
          text={locale === 'he' ? 'Face ID פעיל' : 'Face ID active'}
        />
        <FloatingCallout
          className="hidden md:flex -right-10 bottom-20"
          dot="cyan"
          text={
            locale === 'he'
              ? 'iCloud מסונכרן · מוצפן'
              : 'iCloud synced · encrypted'
          }
        />
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white/[0.02] px-3 py-4">
      <div
        className={`text-2xl sm:text-3xl text-white tracking-tight ${
          mono ? 'font-mono text-base sm:text-lg' : 'font-display'
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        {label}
      </div>
    </div>
  );
}

function FloatingCallout({
  className = '',
  dot,
  text,
}: {
  className?: string;
  dot: 'violet' | 'cyan';
  text: string;
}) {
  const dotColor =
    dot === 'violet'
      ? '#7C3AED'
      : '#38BDF8';
  return (
    <div
      className={`absolute ${className} items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)]/90 backdrop-blur shadow-2xl text-xs text-white/90`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: dotColor,
          boxShadow: `0 0 8px ${dotColor}99`,
        }}
      />
      {text}
    </div>
  );
}
