import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    // Guide title, phrased as a question or a promise.
    title: z.string(),
    // 1..30 — which day of the "30 יום · 30 כלי AI" series this is.
    day: z.number().int().min(1).max(30),
    // One-line hook shown on guide cards (home + /guides grid).
    promise: z.string(),
    // Used for <meta description> and the guide-card subtitle if longer copy is needed.
    description: z.string(),
    // Path under /public, e.g. "/images/guides/day-01-hero.jpg". Optional — falls back to a
    // default gradient hero if not set.
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    publishDate: z.date(),
    // Short closing paragraph rendered in the template's own "סיכום" section, after the body.
    summary: z.string(),
    // Draft guides are excluded from /guides, the homepage list, and are not built as pages.
    draft: z.boolean().default(false),
    // Marks the one example guide shipped with the template — shown with a "guide לדוגמה" badge.
    sample: z.boolean().default(false),
    // Slugs of other guides to show in "אולי גם זה יעניין אותך?". Falls back to the next 3
    // published guides by day number if omitted.
    relatedGuides: z.array(z.string()).optional(),
  }),
});

export const collections = { guides };
