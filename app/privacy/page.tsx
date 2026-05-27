import type { Metadata } from 'next';
import { loadDoc } from '@/lib/content';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "How Emoryx handles your data. Spoiler: it doesn't. The app is local-first, end-to-end encrypted, with no servers.",
};

export default async function PrivacyPage() {
  const [en, he] = await Promise.all([
    loadDoc('privacy', 'en'),
    loadDoc('privacy', 'he'),
  ]);
  return <LegalPage en={en} he={he} />;
}
