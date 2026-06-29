'use client';

import { Mail } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { FaqAccordion } from './FaqAccordion';
import { faqCategories } from '@/lib/faqContent';

export function FaqPageContent() {
  const { t, locale } = useI18n();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <span
          className="halo"
          style={{
            width: 760,
            height: 760,
            top: -360,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.18,
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 pt-20 sm:pt-28 pb-10 text-center">
          <span className="eyebrow">
            <span className="dot" />
            <span>{t('faqPageEyebrow')}</span>
          </span>
          <h1 className="mt-8 font-display text-[clamp(2.9rem,6.2vw,5.2rem)] leading-[1.05] tracking-tight text-white">
            {t('faqPageTitle')}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-soft)] max-w-2xl mx-auto leading-relaxed">
            {t('faqPageSub')}
          </p>
        </div>
      </section>

      {/* Category jump links */}
      <section className="relative">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <nav className="flex flex-wrap gap-2 justify-center">
            {faqCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm sm:text-base text-[var(--color-text-soft)] hover:text-white hover:border-white/30 transition"
              >
                {cat.title[locale]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Categories */}
      <section className="relative pt-12 pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-16">
          {faqCategories.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-white mb-6">
                {cat.title[locale]}
              </h2>
              <FaqAccordion
                defaultOpen={null}
                items={cat.items.map((it) => ({
                  q: it.q[locale],
                  a: it.a[locale],
                }))}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Still need help */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/50 px-6 sm:px-10 py-10 text-center">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-white">
              {t('faqStillTitle')}
            </h2>
            <p className="mt-3 text-[var(--color-text-soft)] max-w-md mx-auto leading-relaxed">
              {t('faqStillBody')}
            </p>
            <a
              href="mailto:emoryx.support@erezults.com"
              className="appstore-sheen mt-8 inline-flex items-center gap-3 rounded-2xl bg-white text-black px-6 py-4 font-medium hover:scale-[1.02] transition-transform"
              dir="ltr"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm sm:text-base">{t('faqStillCta')}</span>
            </a>
            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
              <span dir="ltr" className="font-mono">
                emoryx.support@erezults.com
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
