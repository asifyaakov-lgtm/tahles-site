import { defineCollection, z } from 'astro:content';
import { GUIDE_CATEGORIES } from '../config/site';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    // Guide title, phrased as a question or a promise.
    title: z.string(),
    // Optional running number, only for internal ordering notes. Not shown and not part of the URL.
    day: z.number().int().min(1).optional(),
    // The comment keyword of the matching video (e.g. the word viewers comment to get the guide).
    codeWord: z.string().optional(),
    // Topic badge + filter chip on /guides.
    category: z.enum(GUIDE_CATEGORIES).optional(),
    // One-line hook shown on guide cards (home + /guides grid).
    promise: z.string(),
    // Used for <meta description> and the guide-card subtitle if longer copy is needed.
    description: z.string(),
    // Path under /public, e.g. "/images/guides/day-01-hero.jpg". Optional — falls back to a
    // default gradient hero if not set.
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    // 9:16 video cover shown in the guide hero next to the title (the video's thumbnail).
    cover: z.string().optional(),
    publishDate: z.date(),
    // Short closing paragraph rendered in the template's own "סיכום" section, after the body.
    summary: z.string(),
    // Draft guides are excluded from /guides, the homepage list, and are not built as pages.
    draft: z.boolean().default(false),
    // Marks the one example guide shipped with the template — shown with a "guide לדוגמה" badge.
    sample: z.boolean().default(false),
    // Slugs of other guides to show in "אולי גם זה יעניין אותך?". Falls back to the newest
    // published guides (same category first) if omitted.
    relatedGuides: z.array(z.string()).optional(),
  }),
});

export const collections = { guides };
