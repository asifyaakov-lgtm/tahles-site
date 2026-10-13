# TAHLES site launch update — 2026-10-13

## What changed
1. **Positioning**: "30 יום · 30 כלי AI" removed everywhere (home, guides index, EmailSignup defaults, site.ts description, schema comments, HOW_TO doc). New tagline, secondary line, whoIAm, ongoing-library line per brief; promiseLine kept. TikTok/Facebook URLs updated; Asif@tahles.ai in footer.
2. **Guide model**: `day` optional/uncapped; new optional `codeWord`, `category` (לקוחות/שיווק/ניהול/עדכונים, defined once in site.ts). Plain slugs (sample renamed `day-01-ai-customer-emails` -> `ai-customer-emails`). Sorted by publishDate desc. Category badge on cards + guide hero; JS filter chips on /guides (hidden without JS, only categories with published guides). GuideCard, RelatedGuides logic (same category first), guide template, HOW_TO_ADD_A_GUIDE.md updated.
3. **Sample**: `draft: true` (file kept as template). Empty state on / and /guides with social links.
4. **Hidden pages**: /tools and /privacy removed from nav/footer and sitemap (filter in astro.config), `<meta name="robots" content="noindex">` on both; files kept. "נרשמים בקרוב" box replaced by "עקבו אחריי" social block (EmailSignup falls back to it while `emailSignupAction` is empty).
5. **Guide page**: open, hero, promise, collapsible TOC, numbered steps, prompt boxes, limitations box, summary, follow block, related. Article JSON-LD, og:type=article, og:image falls back to og-default.jpg. Internal links verified: 0 broken hrefs across dist.
6. **Quality**: Playwright/Chromium screenshots of /, /guides, sample guide (temporarily un-drafted) at 390px and 1280px: no horizontal overflow, no layout breakage. `npm audit fix` (non-breaking) applied: 17 -> 15 vulnerabilities. `npm run build` and `astro check` pass (0 errors; 1 pre-existing hint).

## Auto-decided
- Removed the placeholder WhatsApp link/CTA (and `whatsappGroupUrl`) — it pointed at `REPLACE_ME`; the follow block replaces it.
- Removed the guide-page sidebar signup (single-column 820px layout) to avoid duplicate follow blocks.
- Removed the duplicate "## סיכום" from the sample body (template renders frontmatter `summary`).
- Robots meta changed to exactly `noindex` (was `noindex, nofollow`) for all noindex pages incl. 404.
- Homepage shows the 6 newest guides; sample guide kept `sample` badge logic.
- Author in JSON-LD: "אסיף יעקב"; dateModified = publishDate.
- Header "בית" active-state now prefix-matches (guide pages highlight "מדריכים").
- Kept `day-01-*` image/PDF asset filenames (renaming adds risk, no benefit).
- Left /privacy and /tools links out of the form consent text only when a provider exists (form still links /privacy; fix before connecting a provider).

## FAILURES
- 15 remaining `npm audit` vulnerabilities (incl. 1 critical, via astro/sharp/js-yaml chain) need `--force` (breaking major upgrades) — intentionally not applied.
- Screenshots not committed (kept in scratchpad).
