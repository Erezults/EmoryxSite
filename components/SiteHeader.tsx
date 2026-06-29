'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { EmoryxMark } from './EmoryxMark';
import { LanguageToggle } from './LanguageToggle';

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--color-bg)]/70 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <EmoryxMark size={28} />
          <span className="font-display text-xl tracking-tight text-white group-hover:text-white/90 transition">
            Emoryx
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink href="/faq">{t('navFaq')}</NavLink>
          <NavLink href="/privacy">{t('navPrivacy')}</NavLink>
          <NavLink href="/terms">{t('navTerms')}</NavLink>
          <NavLink href="/support">{t('navSupport')}</NavLink>
          <span className="mx-1 sm:mx-2 h-5 w-px bg-[var(--color-border)]" />
          <LanguageToggle compact />
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-2.5 sm:px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-white transition rounded-md hover:bg-white/[0.04]"
    >
      {children}
    </Link>
  );
}
