import type { CollectionEntry } from 'astro:content';

// A guide is "live" (listed on the site, indexed, in the sitemap) only once its publishDate
// has passed at build time. Before that it still builds at its URL — the DM bot sends that
// link the moment the video goes up — but it is unlisted and noindex.
// publishDate carries an explicit +03:00 offset (the posting slot), so plain Date.now() compares correctly.
export const isLive = (data: CollectionEntry<'guides'>['data']) =>
  !data.draft && data.publishDate.valueOf() <= Date.now();
