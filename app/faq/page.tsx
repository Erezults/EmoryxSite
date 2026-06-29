import type { Metadata } from 'next';
import { FaqPageContent } from '@/components/FaqPageContent';
import { faqCategories } from '@/lib/faqContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'How Emoryx stores your files, how end-to-end encrypted iCloud Sync works across iPhone, iPad and Mac, and exactly what happens when you delete the app or your iCloud data.',
  alternates: { canonical: '/faq' },
};

// FAQPage structured data (English) for rich results in search.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap((cat) =>
    cat.items.map((it) => ({
      '@type': 'Question',
      name: it.q.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a.en.join(' '),
      },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqPageContent />
    </>
  );
}
