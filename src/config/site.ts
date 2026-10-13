export const SITE = {
  name: "תכל'ס AI",
  nameEn: 'TAHLES',
  domain: 'https://tahles.ai',
  tagline: 'AI לא יחליף את העסק שלך. עסק שמשתמש ב-AI כן.',
  secondaryLine: 'פחות רעש. יותר תוצאות.',
  ongoingLine: 'כל יום כלי אחד שלוקח את העסק שלך צעד קדימה, עם מדריך חינם',
  description:
    "תכל'ס AI: כל יום כלי אחד שלוקח את העסק שלך צעד קדימה, עם מדריך חינם. AI פרקטי לבעלי עסקים בישראל - בלי ז'רגון, בלי מנוי, בלי קאץ'.",
  whoIAm:
    'אני אסיף יעקב, בעל עסקים אונליין שמשתמש ב-AI כל יום. אני נותן לבעלי עסקים את הידע כדי לא להישאר מאחור ולקחת את העסק צעד אחד קדימה, בשפה פשוטה ובלי רקע טכני.',
  promiseLine: 'הכל בחינם, בלי מנוי, בלי קאץ׳.',

  contactEmail: 'Asif@tahles.ai',

  // Provider-agnostic email signup. Leave empty to show the "עקבו אחריי" social block instead
  // of a form that would silently drop submissions. Point this at the real MailerLite form
  // action URL (or any POST endpoint that accepts name/email/segment/consent fields) when ready.
  emailSignupAction: '',

  social: {
    instagram: 'https://www.instagram.com/tahles.ai',
    youtube: 'https://www.youtube.com/@TahlesAI',
    tiktok: 'https://www.tiktok.com/@tahles.ai',
    facebook: 'https://www.facebook.com/TahlesAI',
    linkedin: 'https://www.linkedin.com/in/asif-yaakov-9918683b4/',
  },
} as const;

export const SEGMENT_OPTIONS = [
  { value: 'business_owner', label: 'בעל/ת עסק' },
  { value: 'employee', label: 'שכיר/ה' },
  { value: 'freelancer', label: 'פרילנסר/ית' },
  { value: 'other', label: 'אחר' },
] as const;

// Guide categories (frontmatter `category`). Single source of truth for the schema and filter chips.
export const GUIDE_CATEGORIES = ['לקוחות', 'שיווק', 'ניהול', 'עדכונים'] as const;
