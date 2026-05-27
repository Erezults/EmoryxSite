'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'en' | 'he';

type Dict = Record<string, string | string[] | Array<Record<string, string>>>;

const en: Dict = {
  // Nav
  navPrivacy: 'Privacy',
  navTerms: 'Terms',
  navSupport: 'Support',

  // Hero
  heroEyebrow: 'iOS · Private vault',
  heroTitleA: 'Your private vault.',
  heroTitleB: 'On your device.',
  heroSub:
    'Hide photos, videos, and documents behind Face ID. Local-first, end-to-end encrypted, optional iCloud backup.',
  heroCtaPrimary: 'Download on the App Store',
  heroCtaSecondary: 'How it works',

  // Features section
  featuresEyebrow: 'Built around four principles',
  featuresTitle: 'Designed to keep your data yours.',
  feat1Title: 'Encrypted by default',
  feat1Body:
    'AES-GCM encryption with a key derived from your password. Your data never leaves your device unless you say so.',
  feat2Title: 'iCloud Backup, optional',
  feat2Body:
    "End-to-end encrypted iCloud backup. Apple can't read your vault. Neither can we. Only your iCloud Backup Password decrypts it.",
  feat3Title: 'Lock Screen widget & Share Extension',
  feat3Body:
    'Capture straight from the Lock Screen. Share into Emoryx from any app on iOS — photos, files, links.',
  feat4Title: 'No tracking. No accounts. No servers.',
  feat4Body:
    "We don't operate servers. We don't have an accounts system. We can't see your data — even if we wanted to.",

  // Pricing
  pricingEyebrow: 'Simple pricing',
  pricingTitle: 'Free to start. Premium when you need more.',
  priceFreeTitle: 'Free',
  priceFreePrice: '$0',
  priceFreeUnit: 'forever',
  priceFreeBullet1: 'Up to 5 folders',
  priceFreeBullet2: 'Up to 100 files',
  priceFreeBullet3: 'Local-only storage',
  priceFreeBullet4: 'Face ID lock + per-folder password',
  priceFreeBullet5: 'Share Extension + Lock Screen widget',
  priceFreeCta: 'Start free',
  pricePremiumTitle: 'Premium',
  pricePremiumPrice: '$3.99',
  pricePremiumUnit: 'per month',
  pricePremiumNoteY: 'or $39.99/year — save 17%',
  pricePremiumNoteL: 'or $79.99 one-time, lifetime',
  pricePremiumBullet1: 'Unlimited folders & files',
  pricePremiumBullet2: 'End-to-end encrypted iCloud sync',
  pricePremiumBullet3: 'Bulk import, move, delete',
  pricePremiumBullet4: 'Family Sharing — up to 6 members',
  pricePremiumBullet5: '7-day free trial',
  pricePremiumCta: 'Try Premium free',
  pricePremiumBadge: '7-day free trial',
  pricingFooterNote:
    'Subscriptions auto-renew via Apple. Cancel anytime in iOS Settings. See Terms for details.',

  // Trust strip
  trust1: 'Made in Israel',
  trust2: 'iOS only',
  trust3: 'No accounts',
  trust4: 'No tracking',
  trust5: 'Open about privacy',

  // Closing band
  closingTitle: 'Some things shouldn’t live in the cloud.',
  closingSub: 'For everything else, there’s Emoryx.',
  closingCta: 'Download on the App Store',

  // Footer
  footerTagline: 'A local-first private vault for iOS.',
  footerLegal: '© 2026 Erez Cohen · All rights reserved.',
  footerMadeIn: 'Made in Tel Aviv, Israel',

  // Support page
  supportEyebrow: 'Support',
  supportTitle: 'Need help? We’re here.',
  supportSub:
    "We don't have a help desk. There's just Erez — the developer who built Emoryx. Send a note, get a real reply.",
  supportEmailCta: 'Email emoryx.support@erezults.com',
  supportFaqTitle: 'Frequently asked',
  faq1Q: 'I forgot my app password — can I recover my data?',
  faq1A:
    "No. The password is hashed with a one-way function and your vault is encrypted with a key derived from it. Forgetting the password means the vault cannot be opened — by you, by us, or by Apple. This is by design.",
  faq2Q: 'I forgot my iCloud Backup Password — can I restore?',
  faq2A:
    "No. The iCloud backup is encrypted with a separate password that only you know. Apple stores the encrypted blob but cannot read it; we never receive it. There is no recovery mechanism.",
  faq3Q: 'What happens when I delete the app?',
  faq3A:
    "iOS deletes the entire sandboxed storage. The next time you install, it's a fresh start — unless you had iCloud Backup enabled and remember your iCloud Backup Password, in which case you can restore.",
  faq4Q: 'Does Emoryx see my photos?',
  faq4A:
    "No. Emoryx has no servers and collects no data. Your photos never leave your device unless you enable iCloud Backup, in which case they go to your own iCloud account, encrypted, before upload.",
  faq5Q: 'Can I share my Premium subscription with my family?',
  faq5A:
    "Yes — Family Sharing is supported via Apple's standard mechanism. Up to 6 family members can share Premium access. Each family member's vault content remains private to their device.",
  faq6Q: 'How do I cancel my subscription?',
  faq6A:
    'iOS Settings → Apple ID → Subscriptions → Emoryx Premium → Cancel. Or use the "Manage Subscription" link inside the app.',
  faq7Q: 'Can I get a refund?',
  faq7A:
    'All refunds are handled by Apple at reportaproblem.apple.com.',
  faq8Q: 'Why isn’t there an Android version?',
  faq8A:
    'Emoryx relies on Apple-specific privacy primitives (Secure Enclave, end-to-end encrypted iCloud). An Android version would have a meaningfully different security model. Maybe later. No promises.',

  // Privacy / Terms page common
  legalLastUpdated: 'Last updated',
  legalBackHome: '← Back to home',
};

const he: Dict = {
  // Nav
  navPrivacy: 'פרטיות',
  navTerms: 'תנאים',
  navSupport: 'תמיכה',

  // Hero
  heroEyebrow: 'iOS · כספת פרטית',
  heroTitleA: 'הכספת הפרטית שלך.',
  heroTitleB: 'במכשיר שלך.',
  heroSub:
    'הסתר תמונות, סרטונים ומסמכים מאחורי Face ID. מקומי-קודם, מוצפן מקצה-לקצה, גיבוי iCloud אופציונלי.',
  heroCtaPrimary: 'הורד מה-App Store',
  heroCtaSecondary: 'איך זה עובד',

  // Features
  featuresEyebrow: 'בנוי סביב ארבעה עקרונות',
  featuresTitle: 'תוכנן לשמור את המידע שלך — שלך.',
  feat1Title: 'מוצפן כברירת מחדל',
  feat1Body:
    'הצפנת AES-GCM עם מפתח שנגזר מהסיסמה שלך. המידע שלך לא יוצא מהמכשיר אלא אם אתה אומר.',
  feat2Title: 'גיבוי iCloud, אופציונלי',
  feat2Body:
    'גיבוי iCloud מוצפן מקצה-לקצה. אפילו Apple לא יכולה לקרוא את הכספת שלך. וגם אנחנו לא. רק סיסמת הגיבוי שלך מפענחת.',
  feat3Title: 'Lock Screen widget ו-Share Extension',
  feat3Body:
    'צלם ישירות מ-Lock Screen. שתף לתוך Emoryx מכל אפליקציה ב-iOS — תמונות, קבצים, קישורים.',
  feat4Title: 'בלי tracking. בלי חשבונות. בלי שרתים.',
  feat4Body:
    'אנחנו לא מפעילים שרתים. אין לנו מערכת חשבונות. אנחנו לא יכולים לראות את המידע שלך — גם אם היינו רוצים.',

  // Pricing
  pricingEyebrow: 'תמחור פשוט',
  pricingTitle: 'התחל חינם. Premium כשתצטרך יותר.',
  priceFreeTitle: 'חינם',
  priceFreePrice: '₪0',
  priceFreeUnit: 'לתמיד',
  priceFreeBullet1: 'עד 5 תיקיות',
  priceFreeBullet2: 'עד 100 קבצים',
  priceFreeBullet3: 'אחסון מקומי בלבד',
  priceFreeBullet4: 'נעילה ב-Face ID + סיסמה לכל תיקייה',
  priceFreeBullet5: 'Share Extension + Lock Screen widget',
  priceFreeCta: 'התחל חינם',
  pricePremiumTitle: 'Premium',
  pricePremiumPrice: '₪14.90',
  pricePremiumUnit: 'לחודש',
  pricePremiumNoteY: 'או ₪149/שנה — חסוך 17%',
  pricePremiumNoteL: 'או ₪299 חד-פעמי, לכל החיים',
  pricePremiumBullet1: 'תיקיות וקבצים ללא הגבלה',
  pricePremiumBullet2: 'סנכרון iCloud מוצפן מקצה-לקצה',
  pricePremiumBullet3: 'ייבוא, העברה ומחיקה גורפים',
  pricePremiumBullet4: 'שיתוף משפחה — עד 6 חברים',
  pricePremiumBullet5: 'ניסיון חינם של 7 ימים',
  pricePremiumCta: 'נסה Premium בחינם',
  pricePremiumBadge: '7 ימי ניסיון חינם',
  pricingFooterNote:
    'מנויים מתחדשים אוטומטית דרך Apple. ניתן לבטל בכל עת ב-iOS Settings. ראה תנאים לפרטים.',

  // Trust
  trust1: 'תוצרת ישראל',
  trust2: 'iOS בלבד',
  trust3: 'בלי חשבונות',
  trust4: 'בלי tracking',
  trust5: 'גלוי לגבי פרטיות',

  // Closing
  closingTitle: 'יש דברים שלא צריכים לחיות בענן.',
  closingSub: 'לכל השאר, יש את Emoryx.',
  closingCta: 'הורד מה-App Store',

  // Footer
  footerTagline: 'כספת פרטית מקומית-קודם ל-iOS.',
  footerLegal: '© 2026 ארז כהן · כל הזכויות שמורות.',
  footerMadeIn: 'נעשה בתל אביב, ישראל',

  // Support
  supportEyebrow: 'תמיכה',
  supportTitle: 'צריך עזרה? אנחנו כאן.',
  supportSub:
    'אין לנו help desk. יש את ארז — המפתח שבנה את Emoryx. שלח הודעה, קבל תשובה אמיתית.',
  supportEmailCta: 'שלח מייל ל-emoryx.support@erezults.com',
  supportFaqTitle: 'שאלות נפוצות',
  faq1Q: 'שכחתי את סיסמת האפליקציה — אפשר לשחזר את המידע?',
  faq1A:
    'לא. הסיסמה מגובבת בפונקציה חד-כיוונית והכספת מוצפנת במפתח שנגזר ממנה. שכחת הסיסמה משמעה שהכספת לא ניתנת לפתיחה — על-ידך, על-ידינו, או על-ידי Apple. זה מתוכנן.',
  faq2Q: 'שכחתי את סיסמת ה-iCloud Backup — אפשר לשחזר?',
  faq2A:
    'לא. גיבוי ה-iCloud מוצפן עם סיסמה נפרדת שרק אתה יודע. Apple מאחסנת את ה-blob המוצפן אבל לא יכולה לקרוא אותו; אנחנו לעולם לא מקבלים אותו. אין מנגנון שחזור.',
  faq3Q: 'מה קורה כשמוחקים את האפליקציה?',
  faq3A:
    'iOS מוחק את כל ה-storage המבודד. בפעם הבאה שתתקין, זו התחלה חדשה — אלא אם הפעלת iCloud Backup וזוכר את סיסמת הגיבוי, ואז אפשר לשחזר.',
  faq4Q: 'האם Emoryx רואה את התמונות שלי?',
  faq4A:
    'לא. ל-Emoryx אין שרתים והוא לא אוסף מידע. התמונות שלך לעולם לא יוצאות מהמכשיר אלא אם אתה מפעיל iCloud Backup, ואז הן הולכות לחשבון ה-iCloud שלך, מוצפנות, לפני ההעלאה.',
  faq5Q: 'אפשר לחלוק את מנוי ה-Premium עם המשפחה?',
  faq5A:
    'כן — Family Sharing נתמך דרך המנגנון הסטנדרטי של Apple. עד 6 בני משפחה יכולים לחלוק גישת Premium. תוכן הכספת של כל בן משפחה נשאר פרטי במכשיר שלו.',
  faq6Q: 'איך מבטלים מנוי?',
  faq6A:
    'iOS Settings ← Apple ID ← Subscriptions ← Emoryx Premium ← Cancel. או דרך "Manage Subscription" באפליקציה.',
  faq7Q: 'אפשר לקבל החזר?',
  faq7A:
    'כל ההחזרים מטופלים על-ידי Apple ב-reportaproblem.apple.com.',
  faq8Q: 'למה אין גרסת אנדרואיד?',
  faq8A:
    'Emoryx מסתמך על primitives פרטיות ייחודיים ל-Apple (Secure Enclave, iCloud מוצפן מקצה-לקצה). גרסת אנדרואיד תהיה עם מודל אבטחה שונה משמעותית. אולי בעתיד. בלי הבטחות.',

  // Legal pages
  legalLastUpdated: 'עודכן לאחרונה',
  legalBackHome: 'חזרה לעמוד הבית →',
};

const dicts: Record<Locale, Dict> = { en, he };

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof typeof en) => string;
  dir: 'ltr' | 'rtl';
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'emoryx-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let initial: Locale | null = null;
    if (typeof window !== 'undefined') {
      const urlLang = new URLSearchParams(window.location.search).get('lang');
      if (urlLang === 'he' || urlLang === 'en') {
        initial = urlLang;
        localStorage.setItem(STORAGE_KEY, urlLang);
      } else {
        const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
        if (stored === 'en' || stored === 'he') initial = stored;
      }
    }
    if (initial) setLocaleState(initial);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === 'he' ? 'rtl' : 'ltr';
    html.dataset.locale = locale;
  }, [locale, hydrated]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (key: keyof typeof en): string => {
    const v = dicts[locale][key as string];
    if (Array.isArray(v)) return v.join(', ');
    return (v as string) ?? (en[key as string] as string) ?? String(key);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        dir: locale === 'he' ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
