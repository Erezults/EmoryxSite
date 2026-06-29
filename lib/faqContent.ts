// Full FAQ content for /faq — bilingual (en/he), grouped by category.
// Kept out of i18n.tsx (the flat UI dictionary) so long-form answers stay readable
// and editable in one place. Each answer is an array of short paragraphs.
//
// Accuracy note: this mirrors the SHIPPING behaviour of Emoryx's CloudKit-based
// real-time iCloud Sync (private, end-to-end encrypted) and the in-app delete flows.
// "iCloud Backup Password" == the vault password you set when enabling iCloud Sync.

export type FaqLocale = 'en' | 'he';

export type FaqItem = {
  q: Record<FaqLocale, string>;
  a: Record<FaqLocale, string[]>;
};

export type FaqCategory = {
  id: string;
  title: Record<FaqLocale, string>;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  // ───────────────────────── Basics & privacy ─────────────────────────
  {
    id: 'basics',
    title: { en: 'Basics & privacy', he: 'בסיס ופרטיות' },
    items: [
      {
        q: {
          en: 'What is Emoryx and where is my data stored?',
          he: 'מה זה Emoryx ואיפה המידע שלי נשמר?',
        },
        a: {
          en: [
            'Emoryx is a private vault for photos, videos and documents on iPhone, iPad and Mac. Everything is local-first: your files live on your device, encrypted with AES-GCM using a key derived from your password.',
            'iCloud Sync is optional. When you turn it on, an encrypted copy is kept in your own private iCloud so your devices stay in sync.',
          ],
          he: [
            'Emoryx הוא כספת פרטית לתמונות, סרטונים ומסמכים ב-iPhone, iPad ו-Mac. הכל מקומי-קודם: הקבצים שלך נמצאים על המכשיר, מוצפנים ב-AES-GCM עם מפתח שנגזר מהסיסמה שלך.',
            'סנכרון iCloud הוא אופציונלי. כשמפעילים אותו, עותק מוצפן נשמר ב-iCloud הפרטי שלך כדי שכל המכשירים יישארו מסונכרנים.',
          ],
        },
      },
      {
        q: {
          en: 'Can you — or Apple — see my files?',
          he: 'האם אתם — או Apple — יכולים לראות את הקבצים שלי?',
        },
        a: {
          en: [
            'No. Emoryx has no servers and no accounts. Your files are encrypted on your device before anything leaves it.',
            'Even with iCloud Sync on, iCloud only ever holds encrypted blocks. The key never leaves your device, so neither we nor Apple can read your content.',
          ],
          he: [
            'לא. ל-Emoryx אין שרתים ואין חשבונות. הקבצים שלך מוצפנים על המכשיר עוד לפני שמשהו יוצא ממנו.',
            'גם כשסנכרון iCloud דלוק, ב-iCloud נשמרים אך ורק בלוקים מוצפנים. המפתח לעולם לא עוזב את המכשיר שלך, ולכן לא אנחנו ולא Apple יכולים לקרוא את התוכן.',
          ],
        },
      },
      {
        q: {
          en: 'App password, folder password, iCloud Backup Password — what is the difference?',
          he: 'סיסמת אפליקציה, סיסמת תיקייה, וסיסמת iCloud Backup — מה ההבדל?',
        },
        a: {
          en: [
            'App password (+ optional Face ID) unlocks the app itself.',
            'Folder password is an extra lock on a specific folder.',
            'iCloud Backup Password (your "vault password") is the one that encrypts your iCloud Sync data. It is what a new device must enter to join your synced vault — keep it safe, it cannot be recovered.',
          ],
          he: [
            'סיסמת האפליקציה (+ Face ID אופציונלי) פותחת את האפליקציה עצמה.',
            'סיסמת תיקייה היא נעילה נוספת על תיקייה מסוימת.',
            'סיסמת iCloud Backup ("סיסמת הכספת") היא זו שמצפינה את נתוני הסנכרון ב-iCloud. זו הסיסמה שמכשיר חדש צריך להזין כדי להצטרף לכספת המסונכרנת — שמור עליה, אי אפשר לשחזר אותה.',
          ],
        },
      },
    ],
  },

  // ───────────────────────── Passwords & recovery ─────────────────────────
  {
    id: 'passwords',
    title: { en: 'Passwords & recovery', he: 'סיסמאות ושחזור' },
    items: [
      {
        q: {
          en: 'I forgot my app password — can I recover my data?',
          he: 'שכחתי את סיסמת האפליקציה — אפשר לשחזר את המידע?',
        },
        a: {
          en: [
            'No. The password is hashed one-way and your vault is encrypted with a key derived from it. Forgetting it means the vault cannot be opened — by you, by us, or by Apple. This is by design.',
            '"Forgot password → Wipe & Reset" deletes the vault so you can start over; it does not recover the old data.',
          ],
          he: [
            'לא. הסיסמה מגובבת בכיוון אחד והכספת מוצפנת במפתח שנגזר ממנה. שכחה שלה משמעה שהכספת לא ניתנת לפתיחה — על-ידך, על-ידינו, או על-ידי Apple. זה מתוכנן כך.',
            '"שכחתי סיסמה ← מחק ואפס" מוחק את הכספת כדי להתחיל מחדש; הוא לא משחזר את המידע הישן.',
          ],
        },
      },
      {
        q: {
          en: 'I forgot a folder password.',
          he: 'שכחתי סיסמה של תיקייה.',
        },
        a: {
          en: [
            'If App Face ID is enabled, a protected folder can be opened with Face ID. Otherwise the per-folder password is required and cannot be recovered — the folder’s contents stay locked.',
          ],
          he: [
            'אם Face ID לאפליקציה מופעל, ניתן לפתוח תיקייה מוגנת באמצעות Face ID. אחרת נדרשת סיסמת התיקייה ואי אפשר לשחזר אותה — תוכן התיקייה נשאר נעול.',
          ],
        },
      },
      {
        q: {
          en: 'I forgot my iCloud Backup Password — can I still restore?',
          he: 'שכחתי את סיסמת ה-iCloud Backup — אפשר עדיין לשחזר?',
        },
        a: {
          en: [
            'No. The iCloud Sync data is encrypted with this password and nothing else can decrypt it. Apple stores only the encrypted copy and cannot read it; we never receive it. There is no recovery mechanism.',
            'If you still have a device with the files on it, you can reset cloud sync from that device and set a new password.',
          ],
          he: [
            'לא. נתוני הסנכרון ב-iCloud מוצפנים עם הסיסמה הזו, ושום דבר אחר לא יכול לפענח אותם. Apple מאחסנת רק את העותק המוצפן ולא יכולה לקרוא אותו; אנחנו לעולם לא מקבלים אותו. אין מנגנון שחזור.',
            'אם עדיין יש לך מכשיר עם הקבצים, אפשר לאפס את סנכרון הענן מאותו מכשיר ולקבוע סיסמה חדשה.',
          ],
        },
      },
    ],
  },

  // ───────────────────────── iCloud Sync ─────────────────────────
  {
    id: 'sync',
    title: { en: 'iCloud Sync', he: 'סנכרון iCloud' },
    items: [
      {
        q: {
          en: 'What does iCloud Sync actually do?',
          he: 'מה סנכרון iCloud עושה בעצם?',
        },
        a: {
          en: [
            'It keeps an encrypted copy of your vault in your private iCloud and syncs changes between your devices in near real-time. Add a file on your iPhone and it appears on your Mac, and vice-versa.',
            'iCloud only ever holds encrypted data — it is a true end-to-end encrypted sync, not a readable backup.',
          ],
          he: [
            'הוא שומר עותק מוצפן של הכספת ב-iCloud הפרטי שלך ומסנכרן שינויים בין המכשירים כמעט בזמן אמת. מוסיפים קובץ באייפון — הוא מופיע במק, ולהפך.',
            'ב-iCloud נשמר תמיד מידע מוצפן בלבד — זהו סנכרון מוצפן מקצה-לקצה אמיתי, לא גיבוי קריא.',
          ],
        },
      },
      {
        q: {
          en: 'Do I need Premium for iCloud Sync?',
          he: 'צריך Premium בשביל סנכרון iCloud?',
        },
        a: {
          en: [
            'Yes — cross-device iCloud Sync is a Premium feature. Files already in iCloud stay there; upgrade to sync new ones.',
          ],
          he: [
            'כן — סנכרון iCloud בין מכשירים הוא תכונת Premium. קבצים שכבר ב-iCloud נשארים שם; שדרג כדי לסנכרן חדשים.',
          ],
        },
      },
      {
        q: {
          en: 'How do I set up sync on a second device (a new iPhone or a Mac)?',
          he: 'איך מגדירים סנכרון במכשיר שני (אייפון חדש או מק)?',
        },
        a: {
          en: [
            'Install Emoryx, sign in to the same iCloud account, then turn on iCloud Sync and enter your iCloud Backup Password. The device joins the existing vault and pulls everything down.',
            'Files appear as "In iCloud" placeholders first and download when you open them — so a large vault is usable within seconds.',
          ],
          he: [
            'התקן את Emoryx, התחבר לאותו חשבון iCloud, הדלק סנכרון iCloud והזן את סיסמת ה-iCloud Backup. המכשיר מצטרף לכספת הקיימת ומושך את הכל.',
            'הקבצים מופיעים תחילה כ"בענן" (placeholders) ויורדים כשפותחים אותם — כך שגם כספת גדולה שמישה תוך שניות.',
          ],
        },
      },
      {
        q: {
          en: 'Why does a file show "In iCloud" or look like a placeholder?',
          he: 'למה קובץ מסומן "בענן" או נראה כ-placeholder?',
        },
        a: {
          en: [
            'It means the file is in iCloud but its full data is not on this device yet. Tap it to download (hydrate) it. You can also pull everything down at once with "Download all".',
          ],
          he: [
            'זה אומר שהקובץ ב-iCloud אבל המידע המלא שלו עדיין לא במכשיר הזה. הקש עליו כדי להוריד אותו. אפשר גם להוריד הכל בבת אחת עם "הורד הכל".',
          ],
        },
      },
      {
        q: {
          en: 'I see "Different vault password" — what does it mean and how do I fix it?',
          he: 'מופיע "סיסמת כספת שונה" — מה זה ואיך מתקנים?',
        },
        a: {
          en: [
            'It means some items in iCloud were saved by another device using a different iCloud Backup Password, so this device can’t open them.',
            'Fix it by tapping "Enter vault password" and entering the password used on your other device — this device then joins and syncs. Alternatively, reset cloud sync to make this device the source of truth (this overwrites the cloud with this device’s data).',
          ],
          he: [
            'זה אומר שחלק מהפריטים ב-iCloud נשמרו על-ידי מכשיר אחר עם סיסמת iCloud Backup שונה, ולכן המכשיר הזה לא מצליח לפתוח אותם.',
            'לתיקון: הקש "הזן סיסמת כספת" והזן את הסיסמה ששימשה במכשיר השני — המכשיר הזה יצטרף ויסתנכרן. לחלופין, אפס את סנכרון הענן כדי שהמכשיר הזה יהפוך למקור האמת (פעולה זו דורסת את הענן עם הנתונים של המכשיר הזה).',
          ],
        },
      },
      {
        q: {
          en: 'What does "Re-sync now" / "Force resync" do?',
          he: 'מה עושה "סנכרן מחדש" / "כפה סנכרון"?',
        },
        a: {
          en: [
            'It re-uploads this device’s full set of folders and files to iCloud and makes every other device match it. Use it when a device has the correct, complete set and you want the cloud (and your other devices) to converge to it.',
            'Routine background sync never overwrites a newer change on another device — only a deliberate re-sync does.',
          ],
          he: [
            'הוא מעלה מחדש ל-iCloud את כל התיקיות והקבצים של המכשיר הזה וגורם לכל מכשיר אחר להתאים אליו. השתמש בזה כשלמכשיר יש את הסט הנכון והמלא ואתה רוצה שהענן (והמכשירים האחרים) יתיישרו אליו.',
            'סנכרון רקע שגרתי לעולם לא דורס שינוי חדש יותר במכשיר אחר — רק סנכרון-מחדש מכוון עושה זאת.',
          ],
        },
      },
    ],
  },

  // ───────────── Deleting the app & switching devices (the permutations) ─────────────
  {
    id: 'devices',
    title: { en: 'Deleting the app & switching devices', he: 'מחיקת האפליקציה ומעבר מכשירים' },
    items: [
      {
        q: {
          en: 'I deleted the app from my iPhone. Is my data gone?',
          he: 'מחקתי את האפליקציה מהאייפון. המידע אבד?',
        },
        a: {
          en: [
            'The local copy on that iPhone is erased by iOS. But if iCloud Sync was on, your encrypted data stays safe in your private iCloud.',
            'Reinstall, turn on iCloud Sync, enter your iCloud Backup Password — and everything comes back (files download as you open them).',
            'Anything that was never synced — device-only folders, or files still uploading — is lost with the device.',
          ],
          he: [
            'העותק המקומי באייפון הזה נמחק על-ידי iOS. אבל אם סנכרון iCloud היה דלוק, הנתונים המוצפנים שלך נשארים בטוחים ב-iCloud הפרטי שלך.',
            'התקן מחדש, הדלק סנכרון iCloud, הזן את סיסמת ה-iCloud Backup — והכל חוזר (הקבצים יורדים כשפותחים אותם).',
            'מה שמעולם לא סונכרן — תיקיות מקומיות-בלבד, או קבצים שעדיין בהעלאה — אבד יחד עם המכשיר.',
          ],
        },
      },
      {
        q: {
          en: 'I deleted the app on one device — what about files I already downloaded on my Mac?',
          he: 'מחקתי את האפליקציה במכשיר אחד — מה עם קבצים שכבר הורדתי למק?',
        },
        a: {
          en: [
            'Each device keeps its own copy. Deleting the app on your iPhone does not touch your Mac — your Mac files stay exactly as they are.',
          ],
          he: [
            'לכל מכשיר עותק משלו. מחיקת האפליקציה באייפון לא נוגעת במק — הקבצים במק נשארים בדיוק כפי שהם.',
          ],
        },
      },
      {
        q: {
          en: 'I replaced my iPhone (deleted it there) and set up my Mac — will my files come back?',
          he: 'החלפתי אייפון (מחקתי שם) והגדרתי את המק — הקבצים יחזרו?',
        },
        a: {
          en: [
            'Yes. iCloud survives the deletion. On the Mac, turn on iCloud Sync and enter the same iCloud Backup Password — it joins and pulls everything from iCloud. Files appear as "In iCloud" and download when opened.',
          ],
          he: [
            'כן. ה-iCloud שורד את המחיקה. במק, הדלק סנכרון iCloud והזן את אותה סיסמת iCloud Backup — הוא יצטרף וימשוך הכל מ-iCloud. הקבצים יופיעו כ"בענן" ויורדו בעת פתיחה.',
          ],
        },
      },
      {
        q: {
          en: 'And the other way around — deleted my Mac, installing on a new iPhone?',
          he: 'ולהיפך — מחקתי את המק, מתקין באייפון חדש?',
        },
        a: {
          en: [
            'Exactly the same. iCloud is the shared source of truth, so any new device joins by turning on iCloud Sync and entering your iCloud Backup Password. As long as at least one device had uploaded the content (or it is still in iCloud), it all returns.',
          ],
          he: [
            'בדיוק אותו דבר. ה-iCloud הוא מקור האמת המשותף, כך שכל מכשיר חדש מצטרף על-ידי הדלקת סנכרון iCloud והזנת סיסמת ה-iCloud Backup. כל עוד מכשיר אחד לפחות העלה את התוכן (או שהוא עדיין ב-iCloud) — הכל חוזר.',
          ],
        },
      },
      {
        q: {
          en: 'I deleted the app from ALL my devices — is my iCloud data wiped?',
          he: 'מחקתי את האפליקציה מכל המכשירים — נתוני ה-iCloud נמחקו?',
        },
        a: {
          en: [
            'No. Removing the app does not erase your iCloud data — your encrypted vault stays in your private iCloud indefinitely.',
            'It is safe but locked: reinstall on any device, sign in to the same iCloud account, turn on iCloud Sync and enter your iCloud Backup Password, and it all comes back.',
            'To actually erase it, use an in-app delete or delete the data from iOS Settings (see the next section).',
          ],
          he: [
            'לא. הסרת האפליקציה לא מוחקת את נתוני ה-iCloud — הכספת המוצפנת שלך נשארת ב-iCloud הפרטי שלך ללא הגבלת זמן.',
            'היא בטוחה אך נעולה: התקן מחדש בכל מכשיר, התחבר לאותו חשבון iCloud, הדלק סנכרון iCloud והזן את סיסמת ה-iCloud Backup — והכל חוזר.',
            'כדי באמת למחוק אותה, השתמש במחיקה מתוך האפליקציה או מחק את הנתונים דרך הגדרות iOS (ראה בקטע הבא).',
          ],
        },
      },
      {
        q: {
          en: 'Can I open my files without the app?',
          he: 'אפשר לפתוח את הקבצים בלי האפליקציה?',
        },
        a: {
          en: [
            'No. Your files are stored as encrypted blocks in your private iCloud — there is no web page or Files-app folder to browse them, and without your password nobody (not us, not Apple) can read them.',
            'The only way in is the Emoryx app plus your password. Outside the app you can only see how much iCloud storage it uses, and delete it.',
          ],
          he: [
            'לא. הקבצים שלך מאוחסנים כבלוקים מוצפנים ב-iCloud הפרטי שלך — אין דף אינטרנט או תיקייה ב-Files app לעיין בהם, ובלי הסיסמה שלך אף אחד (לא אנחנו ולא Apple) לא יכול לקרוא אותם.',
            'הדרך היחידה פנימה היא אפליקציית Emoryx יחד עם הסיסמה שלך. מחוץ לאפליקציה אפשר רק לראות כמה אחסון iCloud היא תופסת, ולמחוק אותה.',
          ],
        },
      },
    ],
  },

  // ───────────────────────── Managing & deleting iCloud data ─────────────────────────
  {
    id: 'clouddata',
    title: { en: 'Managing & deleting iCloud data', he: 'ניהול ומחיקת נתוני iCloud' },
    items: [
      {
        q: {
          en: 'How do I permanently delete everything from iCloud?',
          he: 'איך מוחקים לצמיתות את הכל מ-iCloud?',
        },
        a: {
          en: [
            'Inside the app, any of these clears the encrypted data from iCloud:',
            '• Settings → iCloud Sync → "Disable + delete backup".',
            '• Delete Account → "Delete from iCloud & all my devices".',
            '• Forgot password → Wipe & Reset.',
            'The "everywhere" options also signal your other signed-in devices to wipe their local copies too.',
          ],
          he: [
            'בתוך האפליקציה, כל אחת מהפעולות הבאות מנקה את הנתונים המוצפנים מ-iCloud:',
            '• הגדרות ← סנכרון iCloud ← "כבה + מחק גיבוי".',
            '• מחיקת חשבון ← "מחק מ-iCloud ומכל המכשירים שלי".',
            '• שכחתי סיסמה ← מחק ואפס.',
            'אפשרויות ה"מכל המקומות" גם מאותתות למכשירים האחרים המחוברים שלך למחוק את העותקים המקומיים שלהם.',
          ],
        },
      },
      {
        q: {
          en: '"Delete on this device only" vs "Delete from iCloud & all my devices" — what is the difference?',
          he: '"מחק במכשיר זה בלבד" מול "מחק מ-iCloud ומכל המכשירים" — מה ההבדל?',
        },
        a: {
          en: [
            '"This device only" erases the local copy here and leaves your iCloud data and your other devices untouched.',
            '"Delete from iCloud & all my devices" erases the cloud copy and signals every device on your account to wipe too.',
          ],
          he: [
            '"במכשיר זה בלבד" מוחק את העותק המקומי כאן ומשאיר את נתוני ה-iCloud והמכשירים האחרים שלך ללא שינוי.',
            '"מחק מ-iCloud ומכל המכשירים" מוחק את העותק בענן ומאותת לכל מכשיר בחשבון שלך למחוק גם.',
          ],
        },
      },
      {
        q: {
          en: 'What if I delete the data via iOS Settings → Apple ID → iCloud → Manage Account Storage → Emoryx → Delete Data?',
          he: 'מה אם אמחק את הנתונים דרך הגדרות iOS ← Apple ID ← iCloud ← ניהול אחסון חשבון ← Emoryx ← מחק נתונים?',
        },
        a: {
          en: [
            'That erases Emoryx’s data from iCloud, but it does NOT delete the copies already on your devices — they stay safe and are never auto-wiped.',
            'Your devices will not re-upload on their own, so your iCloud copy stays empty until you open Emoryx and tap "Re-sync now" on a device that still has your files. That refills iCloud and your other devices.',
            '⚠️ One exception: a file you had offloaded to save space (shown as "In iCloud", not downloaded) exists only in the cloud — deleting iCloud data removes its only copy. Download anything important first.',
          ],
          he: [
            'זה מוחק את נתוני Emoryx מ-iCloud, אבל הוא לא מוחק את העותקים שכבר נמצאים על המכשירים שלך — הם נשארים בטוחים ולעולם לא נמחקים אוטומטית.',
            'המכשירים שלך לא יעלו מחדש מעצמם, כך שהעותק ב-iCloud יישאר ריק עד שתפתח את Emoryx ותקיש "סנכרן מחדש" במכשיר שעדיין מחזיק את הקבצים. זה ימלא מחדש את ה-iCloud ואת המכשירים האחרים.',
            '⚠️ חריג אחד: קובץ שפינית כדי לחסוך מקום (מסומן "בענן", לא הורד) קיים רק בענן — מחיקת נתוני ה-iCloud מסירה את העותק היחיד שלו. הורד מראש כל דבר חשוב.',
          ],
        },
      },
      {
        q: {
          en: 'How much iCloud storage does Emoryx use? Does it count against my quota?',
          he: 'כמה אחסון iCloud Emoryx תופסת? האם זה נספר במכסה שלי?',
        },
        a: {
          en: [
            'Synced data is stored in Emoryx’s own private area of your iCloud and, like any app, counts toward your Apple iCloud storage. The metadata is tiny — the space is mostly your photos, videos and files.',
          ],
          he: [
            'הנתונים המסונכרנים נשמרים באזור הפרטי של Emoryx ב-iCloud שלך, וכמו כל אפליקציה — נספרים במכסת אחסון ה-iCloud של Apple. המטא-דאטה זעירה — המקום הוא בעיקר התמונות, הסרטונים והקבצים שלך.',
          ],
        },
      },
    ],
  },

  // ───────────────────────── Subscription & general ─────────────────────────
  {
    id: 'general',
    title: { en: 'Subscription & general', he: 'מנוי וכללי' },
    items: [
      {
        q: {
          en: 'Is there a Mac version?',
          he: 'יש גרסת מק?',
        },
        a: {
          en: [
            'Yes — Emoryx runs on Mac (Apple Silicon) as well as iPhone and iPad. A single purchase covers all of them, and iCloud Sync keeps them together.',
          ],
          he: [
            'כן — Emoryx רץ על מק (Apple Silicon) בנוסף ל-iPhone ול-iPad. רכישה אחת מכסה את כולם, וסנכרון iCloud מחבר ביניהם.',
          ],
        },
      },
      {
        q: {
          en: 'Can I share my Premium subscription with my family?',
          he: 'אפשר לחלוק את מנוי ה-Premium עם המשפחה?',
        },
        a: {
          en: [
            'Yes — Family Sharing is supported via Apple’s standard mechanism, for up to 6 family members. Each member’s vault content stays private to their own device.',
          ],
          he: [
            'כן — Family Sharing נתמך דרך המנגנון הסטנדרטי של Apple, עד 6 בני משפחה. תוכן הכספת של כל אחד נשאר פרטי במכשיר שלו.',
          ],
        },
      },
      {
        q: {
          en: 'How do I cancel my subscription?',
          he: 'איך מבטלים מנוי?',
        },
        a: {
          en: [
            'iOS Settings → Apple ID → Subscriptions → Emoryx Premium → Cancel. Or use the "Manage Subscription" link inside the app.',
          ],
          he: [
            'הגדרות iOS ← Apple ID ← Subscriptions ← Emoryx Premium ← בטל. או דרך "נהל מנוי" בתוך האפליקציה.',
          ],
        },
      },
      {
        q: {
          en: 'Can I get a refund?',
          he: 'אפשר לקבל החזר?',
        },
        a: {
          en: ['All refunds are handled by Apple at reportaproblem.apple.com.'],
          he: ['כל ההחזרים מטופלים על-ידי Apple בכתובת reportaproblem.apple.com.'],
        },
      },
      {
        q: {
          en: 'Why isn’t there an Android version?',
          he: 'למה אין גרסת אנדרואיד?',
        },
        a: {
          en: [
            'Emoryx relies on Apple-specific privacy primitives (Secure Enclave, end-to-end encrypted iCloud). An Android version would have a meaningfully different security model. Maybe later — no promises.',
          ],
          he: [
            'Emoryx מסתמך על מנגנוני פרטיות ייחודיים ל-Apple (Secure Enclave, iCloud מוצפן מקצה-לקצה). גרסת אנדרואיד תהיה עם מודל אבטחה שונה מהותית. אולי בעתיד — בלי הבטחות.',
          ],
        },
      },
      {
        q: {
          en: 'How do I contact support?',
          he: 'איך יוצרים קשר עם התמיכה?',
        },
        a: {
          en: [
            'Email emoryx.support@erezults.com. There is no call-center — just Erez, the developer who built Emoryx. Send a note, get a real reply.',
          ],
          he: [
            'שלח מייל ל-emoryx.support@erezults.com. אין מוקד — יש את ארז, המפתח שבנה את Emoryx. שלח הודעה, קבל תשובה אמיתית.',
          ],
        },
      },
    ],
  },
];
