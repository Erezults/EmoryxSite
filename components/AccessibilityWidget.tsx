'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Accessibility,
  ALargeSmall,
  Contrast,
  Pause,
  RotateCcw,
  X,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type TextSize = 'base' | 'lg' | 'xl';

const STORAGE_KEY = 'emoryx-a11y-prefs';

type Prefs = {
  textSize: TextSize;
  highContrast: boolean;
  reduceMotion: boolean;
};

const DEFAULT_PREFS: Prefs = {
  textSize: 'base',
  highContrast: false,
  reduceMotion: false,
};

function applyPrefs(prefs: Prefs) {
  const html = document.documentElement;
  html.dataset.a11yText = prefs.textSize;
  html.dataset.a11yContrast = prefs.highContrast ? 'high' : '';
  html.dataset.a11yMotion = prefs.reduceMotion ? 'reduce' : '';
}

export function AccessibilityWidget() {
  const { t, dir } = useI18n();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULT_PREFS, ...JSON.parse(raw) };
        setPrefs(parsed);
        applyPrefs(parsed);
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    applyPrefs(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // storage unavailable (private mode, etc.) — preference just won't persist
    }
  }, [prefs]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const cycleTextSize = () => {
    const order: TextSize[] = ['base', 'lg', 'xl'];
    const next = order[(order.indexOf(prefs.textSize) + 1) % order.length];
    setPrefs((p) => ({ ...p, textSize: next }));
  };

  const reset = () => setPrefs(DEFAULT_PREFS);

  return (
    <div className="fixed bottom-5 right-5 z-[90]" dir={dir}>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={t('a11yWidgetTitle')}
          className="absolute bottom-16 right-0 w-72 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)] p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {t('a11yWidgetTitle')}
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('a11yClose')}
              className="rounded-md p-1 text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.06] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={cycleTextSize}
              className="w-full flex items-center gap-3 rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-soft)] hover:text-white hover:bg-white/[0.04] transition text-start"
            >
              <ALargeSmall className="w-4 h-4 shrink-0" />
              <span className="flex-1">{t('a11yTextSize')}</span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {prefs.textSize === 'base'
                  ? t('a11ySizeBase')
                  : prefs.textSize === 'lg'
                    ? t('a11ySizeLarge')
                    : t('a11ySizeXLarge')}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setPrefs((p) => ({ ...p, highContrast: !p.highContrast }))
              }
              aria-pressed={prefs.highContrast}
              className="w-full flex items-center gap-3 rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-soft)] hover:text-white hover:bg-white/[0.04] transition text-start"
            >
              <Contrast className="w-4 h-4 shrink-0" />
              <span className="flex-1">{t('a11yContrast')}</span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {prefs.highContrast ? t('a11yOn') : t('a11yOff')}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setPrefs((p) => ({ ...p, reduceMotion: !p.reduceMotion }))
              }
              aria-pressed={prefs.reduceMotion}
              className="w-full flex items-center gap-3 rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-soft)] hover:text-white hover:bg-white/[0.04] transition text-start"
            >
              <Pause className="w-4 h-4 shrink-0" />
              <span className="flex-1">{t('a11yStopAnimations')}</span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {prefs.reduceMotion ? t('a11yOn') : t('a11yOff')}
              </span>
            </button>

            <button
              type="button"
              onClick={reset}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-[var(--color-text-muted)] hover:text-white transition text-start"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>{t('a11yReset')}</span>
            </button>
          </div>

          <a
            href="/accessibility"
            className="mt-3 block text-center text-xs text-[var(--color-text-muted)] hover:text-white underline underline-offset-4 decoration-[var(--color-border-strong)]"
          >
            {t('navAccessibility')}
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t('a11yWidgetTitle')}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-brand-violet)] text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.7)] hover:scale-105 transition-transform"
      >
        <Accessibility className="w-6 h-6" />
      </button>
    </div>
  );
}
