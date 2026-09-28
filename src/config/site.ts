export const SITE = {
  name: "תכל'ס AI",
  nameEn: 'TAHLES',
  domain: 'https://tahles.ai',
  tagline: 'עוזר לבעלי עסקים להישאר צעד אחד לפני כולם בעולם הבינה המלאכותית',
  description:
    "תכל'ס AI עוזר לבעלי עסקים קטנים ובינוניים בישראל להשתמש בבינה מלאכותית בפועל - בלי ז'רגון, בלי מנוי, בלי קאץ'. 30 מדריכים פרקטיים, אחד ליום.",
  whoIAm:
    'אני לא מסביר על AI - אני מראה מה בניתי. אני מפעיל עסקים אמיתיים שרצים על אוטומציה.',
  promiseLine: 'הכל בחינם, בלי מנוי, בלי קאץ׳.',

  // PLACEHOLDER — replace with the real WhatsApp group invite link before launch.
  whatsappGroupUrl: 'https://chat.whatsapp.com/REPLACE_ME_WHATSAPP_INVITE_LINK',

  // Provider-agnostic email signup. Leave empty to show the "בקרוב" (coming soon) state instead
  // of a form that would silently drop submissions. Point this at the real MailerLite form
  // action URL (or any POST endpoint that accepts name/email/segment/consent fields) when ready.
  emailSignupAction: '',

  social: {
    instagram: 'https://www.instagram.com/tahles.ai',
    youtube: 'https://www.youtube.com/@TahlesAI',
    tiktok: 'https://www.tiktok.com/@tachlesai',
    facebook: 'https://www.facebook.com/profile.php?id=61590626513101',
    linkedin: 'https://www.linkedin.com/in/asif-yaakov-9918683b4/',
  },
} as const;

export const SEGMENT_OPTIONS = [
  { value: 'business_owner', label: 'בעל/ת עסק' },
  { value: 'employee', label: 'שכיר/ה' },
  { value: 'freelancer', label: 'פרילנסר/ית' },
  { value: 'other', label: 'אחר' },
] as const;
