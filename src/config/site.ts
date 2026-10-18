export const SITE = {
  name: "תכל'ס AI",
  nameEn: 'TAHLES',
  domain: 'https://tahles.ai',
  tagline: 'AI לא יחליף את העסק שלך. עסק שמשתמש ב-AI כן.',
  // The tagline as a headline is always shown as exactly these two lines (never re-flowed).
  taglineLines: ['AI לא יחליף את העסק שלך.', 'עסק שמשתמש ב-AI כן.'],
  secondaryLine: 'פחות רעש. יותר תוצאות.',
  ongoingLine: 'כל יום כלי אחד שלוקח את העסק שלך צעד קדימה, עם מדריך חינם',
  description:
    "תכל'ס AI: כל יום כלי אחד שלוקח את העסק שלך צעד קדימה, עם מדריך חינם. AI פרקטי לבעלי עסקים בישראל - בלי ז'רגון, בלי מנוי, בלי קאץ'.",
  whoIAm:
    'אני אסיף יעקב, בעל עסקים אונליין שמשתמש ב-AI כל יום. אני נותן לבעלי עסקים את הידע כדי לא להישאר מאחור ולקחת את העסק צעד אחד קדימה, בשפה פשוטה ובלי רקע טכני.',
  promiseLine: 'הכל בחינם, בלי מנוי, בלי קאץ׳.',

  contactEmail: 'Asif@tahles.ai',

  // Photo shown next to the "who I am" text. Path under /public; leave empty to hide the photo.
  photo: '/images/asif.jpg',
  photoAlt: "אסיף יעקב, תכל'ס AI",

  // Dedicated business WhatsApp number (international format, digits only). Every consult CTA
  // on the site opens a wa.me chat to this number with a pre-filled message (see whatsappUrl()).
  whatsappNumber: '972547737333',
  // Consult CTA. Any URL (mailto:, https://wa.me/..., a booking page). Empty = button hidden.
  consultUrl: 'https://wa.me/972547737333?text=' + encodeURIComponent('היי אסיף, אשמח לייעוץ חינם איך לקחת את העסק שלי צעד אחד קדימה עם AI'),
  consultLabel: 'ייעוץ חינם: איך לוקחים את העסק שלך צעד אחד קדימה בעולם ה-AI',

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

// WhatsApp deep link with a pre-filled message. Pass the guide title so Asif knows which
// guide the person was reading when they reached out.
export function whatsappUrl(context?: string): string {
  const text = context
    ? `היי אסיף, קראתי את המדריך "${context}" ויש לי שאלה`
    : 'היי אסיף, אשמח לייעוץ חינם איך לקחת את העסק שלי צעד אחד קדימה עם AI';
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
