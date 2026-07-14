import type { Metadata } from 'next';
import { loadDoc } from '@/lib/content';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'How Emoryx meets Israeli Standard 5568 (WCAG 2.1 AA) accessibility requirements, and how to reach our accessibility coordinator.',
};

export default async function AccessibilityPage() {
  const [en, he] = await Promise.all([
    loadDoc('accessibility', 'en'),
    loadDoc('accessibility', 'he'),
  ]);
  return <LegalPage en={en} he={he} />;
}
