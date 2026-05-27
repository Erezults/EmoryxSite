'use client';

import { useI18n } from '@/lib/i18n';

export function LanguageToggle({ compact }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();

  const opts: Array<{ code: 'en' | 'he'; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'HE' },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full border border-[var(--color-border)] bg-white/[0.03] backdrop-blur p-0.5 ${
        compact ? 'text-[11px]' : 'text-xs'
      } font-medium`}
      dir="ltr"
    >
      {opts.map((o) => {
        const active = locale === o.code;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setLocale(o.code)}
            aria-pressed={active}
            className={`relative px-3 py-1.5 rounded-full transition-colors ${
              active
                ? 'bg-white text-black'
                : 'text-[var(--color-text-muted)] hover:text-white'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
