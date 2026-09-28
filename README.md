# tahles-site

האתר של **תכל'ס AI** (tahles.ai) - בנוי ב-[Astro](https://astro.build), פלט סטטי, בלי שרת.

## פיתוח מקומי

דורש Node.js 18.20.8+ / 20.3.0+ / 22+ (הקוד נבנה ונבדק על Node 20.20.2).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # בונה ל-dist/
npm run preview   # מריץ תצוגה מקדימה של ה-build
```

## מבנה

- `src/content/guides/*.md` - כל מדריך הוא קובץ Markdown אחד. ראו `HOW_TO_ADD_A_GUIDE.md`.
- `src/pages/` - הדפים (`/`, `/guides`, `/guides/[slug]`, `/tools`, `/privacy`, `404`).
- `src/components/` - רכיבי UI (כרטיס מדריך, טופס הרשמה, תוכן עניינים וכו').
- `src/plugins/rehype-guide-components.mjs` - הופך מוסכמות Markdown פשוטות (בלוק קוד `prompt`,
  תמונה עם title, קישור ל-`/downloads/...`) לרכיבים מעוצבים, בלי צורך ב-MDX או HTML בתוך המדריך.
- `src/config/site.ts` - קישורי רשתות חברתיות, קישור קבוצת הוואטסאפ, וה-`emailSignupAction`
  (כתובת ה-POST של ספק המייל - ריק כרגע, ראו למטה).

## חיבור טופס ההרשמה לספק מייל (MailerLite וכו')

הטופס בנוי provider-agnostic. כרגע `emailSignupAction` ב-`src/config/site.ts` ריק, ולכן
האתר מציג מצב "נרשמים בקרוב" במקום טופס - כדי שלא ייווצר מצב שבו משתמשים ממלאים טופס
וההרשמה נעלמת בשקט.

כשה-MailerLite (או כל ספק אחר) מוכן:

1. קבלו את כתובת ה-POST (form action URL) של טופס ה-embed מהספק.
2. עדכנו את `emailSignupAction` ב-`src/config/site.ts` לכתובת הזו.
3. ודאו ששמות השדות (`name`, `email`, `segment`, `consent`) תואמים למה שהספק מצפה לקבל -
   ייתכן שיהיה צורך לשנות את שמות ה-`name` attributes בתוך `src/components/EmailSignup.astro`
   כדי שיתאימו בדיוק לשדות שהספק דורש (חלק מהספקים דורשים שמות שדה ספציפיים).
4. `git push` - Cloudflare Pages יבנה מחדש אוטומטית.

## חיבור הריפו ל-Cloudflare Pages (חד-פעמי)

1. היכנסו ל-[dash.cloudflare.com](https://dash.cloudflare.com) לחשבון שבו הדומיין `tahles.ai`
   כבר רשום.
2. בתפריט הצד: **Workers & Pages** → **Create application** → טאב **Pages** →
   **Connect to Git**.
3. בחרו את חשבון ה-GitHub המחובר, ואז את הריפו `tahles-site`. אם GitHub עדיין לא מחובר
   ל-Cloudflare, תתבקשו להתקין את אפליקציית GitHub של Cloudflare (מבקשים הרשאה לריפו
   הספציפי הזה, לא לכל החשבון).
4. הגדרות הבנייה (Build settings):
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (ברירת מחדל)
   - **Node version**: הוסיפו משתנה סביבה `NODE_VERSION` עם הערך `20` (או `22`) בהגדרות
     Environment Variables של הפרויקט ב-Cloudflare Pages, כדי לוודא גרסת Node תואמת.
5. לחצו **Save and Deploy**. ה-deploy הראשון ייקח כדקה-שתיים; בסיומו תקבלו כתובת זמנית
   בסגנון `tahles-site.pages.dev` שאפשר לבדוק בה שהכל עובד.

**מכאן והלאה**: כל `git push` ל-branch `main` מפעיל build ו-deploy אוטומטיים. Pull Requests
מקבלים preview deployment עם כתובת ייחודית משלהם - שימושי לבדוק שינוי לפני מיזוג.

## חיבור הדומיין tahles.ai

הדומיין כבר רשום באותו חשבון Cloudflare, אז זה חיבור פנימי (לא צריך לגעת ב-Registrar/DNS
חיצוני):

1. בתוך פרויקט ה-Pages שיצרתם: **Custom domains** → **Set up a custom domain**.
2. הקלידו `tahles.ai` ולחצו **Continue** → **Activate domain**. Cloudflare יוסיף אוטומטית
   רשומת DNS (בדרך כלל CNAME/עזר פנימי) כי הדומיין כבר בניהולו - אין צורך להעתיק ערכים
   ידנית.
3. חוזרים על אותו תהליך עבור `www.tahles.ai` אם רוצים גם את גרסת ה-www (מומלץ להגדיר
   הפניה אוטומטית מ-www ל-domain הראשי, או להפך - לפי ההעדפה).
4. ה-SSL (HTTPS) מונפק אוטומטית על ידי Cloudflare תוך מספר דקות. אפשר לעקוב אחרי הסטטוס
   באותו עמוד **Custom domains**.
5. ברגע שהסטטוס עובר ל-**Active**, `https://tahles.ai` מציג את האתר.

### הערה לגבי `site` ב-`astro.config.mjs`

הקובץ כבר מוגדר עם `site: 'https://tahles.ai'` (נדרש עבור sitemap.xml וה-canonical URLs) -
אין צורך לשנות שום דבר כשמחברים את הדומיין.

## SEO

- כל דף בונה `<title>`/`<meta description>`/Open Graph/Twitter Card דרך
  `src/components/Seo.astro`.
- `sitemap.xml` נוצר אוטומטית בזמן ה-build על ידי `@astrojs/sitemap` (הקישור הוא
  `/sitemap-index.xml`, כפי שמצוין גם ב-`public/robots.txt`).
- `public/og-default.jpg` היא תמונת Open Graph כללית (placeholder) - מומלץ להחליף בעיצוב
  מותג אמיתי, וכן להוסיף תמונת OG ייעודית (`featuredImage`) לכל מדריך.
