# BUILD_REPORT — TAHLES site (tahles.ai)

Date: 2026-09-28
Repo: https://github.com/asifyaakov-lgtm/tahles-site (branch `main`, initial commit `090368e`)

## What was built

A static [Astro](https://astro.build) site, Hebrew/RTL throughout (`dir="rtl" lang="he"`),
Heebo font from Google Fonts, dark theme with the requested purple→magenta gradient/glow
styling and wavy-line hero accents.

**Pages**
- `/` — hero + tagline, "who I am" block, "30 יום · 30 כלי AI" guide grid, email signup.
- `/guides` — grid of all published guide cards.
- `/guides/[slug]` — the guide template: hero + day badge, featured image slot, bold promise
  paragraph, collapsible auto-generated table of contents, Markdown body with styled
  components (numbered steps, copy-to-clipboard prompt box, download button, captioned
  screenshot, "מה זה לא עושה" limitations box), summary, WhatsApp next-step block, email
  signup, "אולי גם זה יעניין אותך?" related guides, plus a sticky desktop-only sidebar copy
  of the email signup.
- `/tools` — "טבלת כלי AI לעסקים קטנים", grouped by שיווק / מכירות / שירות לקוחות /
  הנהלת חשבונות / תפעול, 3 example rows per area, every row visibly tagged "דוגמה".
- `/privacy` — GDPR-oriented Hebrew draft for a Cyprus-based controller collecting
  name+email for a newsletter, with an on-page red "draft, not for publication" banner and
  every field that needs a real value marked `[לעדכן]`.
- `/404` — same visual style as the rest of the site.

**Content model**: each guide is one Markdown file in `src/content/guides/`, validated by a
Zod schema (`src/content/config.ts`). A custom rehype plugin
(`src/plugins/rehype-guide-components.mjs`) turns plain-Markdown conventions — a ` ```prompt `
fenced block, an image with a title, a lone link to `/downloads/...` — into the styled
components, so adding guide #2–30 is genuinely just "add a `.md` file," no HTML/MDX required.
Full authoring instructions: `HOW_TO_ADD_A_GUIDE.md`.

**Email signup**: `src/components/EmailSignup.astro`, fields name/email/segment
(בעל/ת עסק · שכיר/ה · פרילנסר/ית · אחר) + an unticked consent checkbox linking to `/privacy`.
Provider-agnostic — posts to `SITE.emailSignupAction` in `src/config/site.ts`. That value is
currently empty on purpose, so the site shows an explicit "נרשמים בקרוב" state instead of a
form that would silently drop submissions.

**SEO**: per-page `<title>`/description via `src/components/Seo.astro`, Open Graph + Twitter
Card tags, canonical URLs on `https://tahles.ai`, `sitemap.xml` (via `@astrojs/sitemap`,
verified in the build output), `robots.txt`.

**Sample content**: `src/content/guides/day-01-ai-customer-emails.md`, `sample: true` — a
complete 3-step guide (AI-drafted replies to customer emails) exercising every template
component end to end, including one real copy-paste prompt.

## What's placeholder — needs your input before launch

| Item | Where | What to do |
|---|---|---|
| WhatsApp group link | `src/config/site.ts` → `whatsappGroupUrl` | replace with the real invite link |
| Email provider (MailerLite) | `src/config/site.ts` → `emailSignupAction` | set the form POST URL once MailerLite is ready; see README.md's "חיבור טופס ההרשמה" section — field names may need adjusting to match what MailerLite expects |
| Tools table rows | `src/pages/tools.astro` → `AREAS` array | all 15 rows (3 × 5 areas) are example placeholders, clearly tagged "דוגמה" in the UI |
| Privacy policy | `src/pages/privacy.astro` | explicit DRAFT banner on the page itself; every `[לעדכן]` needs a real value (legal company name, Cyprus address, contact email, actual email-provider name); **must go to a lawyer before publishing**, per your own instruction |
| OG default image | `public/og-default.jpg` | programmatically generated placeholder (gradient + "TAHLES AI" text), not a designed asset |
| Favicon | `public/favicon.svg`, `public/favicon.png` | simple placeholder "T" mark, not the real logo |
| Sample guide's images/PDF | `public/images/guides/day-01-*.jpg`, `public/downloads/day-01-cheat-sheet.pdf` | all generated placeholders (gradient + "PLACEHOLDER" text / a one-page stub PDF) — replace before this specific guide goes live, or treat day-01 purely as a template reference and write guide content fresh |
| Guides 2–30 | — | only day 1 exists; add the rest per `HOW_TO_ADD_A_GUIDE.md` |
| Cloudflare Pages connection + custom domain | — | not something I have access to do — step-by-step instructions are in `README.md` |

## FAILURES / things that went wrong or needed a workaround

1. **`npm create astro@latest` failed outright** — the current `create-astro` CLI requires
   Node ≥22.12, and this server's global Node is 20.20.2. I deliberately did **not** upgrade
   the system Node to fix this, since that Node install is shared with the live DPF/WAF pm2
   processes (`sender.js`, `dashboard.js`, `downloader.js`, etc.) and an upgrade risked
   breaking running production infrastructure. Instead I hand-scaffolded the Astro project
   files directly and pinned `astro` to `^4.16.7`, which supports Node 20.3+.
2. **`@astrojs/sitemap` crashed the build** — the version that satisfied my original `^3.2.1`
   range resolved to `3.7.4`, which expects a newer Astro core hook not present in Astro 4.16
   (`Cannot read properties of undefined (reading 'reduce')` at `astro:build:done`). Fixed by
   pinning the exact version `3.2.1` in `package.json`. Confirmed `sitemap-index.xml` and
   `sitemap-0.xml` now generate correctly with all 5 public pages listed.
3. **Astro's built-in Shiki syntax highlighter silently broke the copy-to-clipboard prompt
   box** — it stripped the `language-prompt` class my rehype plugin relies on before the
   plugin ever ran (and logged a "language 'prompt' doesn't exist" warning). Fixed by setting
   `markdown.syntaxHighlight: false` in `astro.config.mjs` — the site has no other code blocks
   that need syntax coloring. Verified in the built HTML that the prompt box now renders with
   the correct header/copy-button/content structure and the exact prompt text in
   `data-prompt-text`.
4. **No visual/browser check was possible in this environment.** The Claude-in-Chrome
   extension is not connected in this session, and no headless browser (Chromium/Playwright/
   Puppeteer) is installed on this server. What I verified instead: `astro build` completes
   with 0 errors, `astro check` reports 0 type errors, all 6 routes return HTTP 200 against a
   local `astro dev` server (`/`, `/guides`, `/guides/day-01-...`, `/tools`, `/privacy`) and a
   nonexistent route correctly returns 404, and I directly inspected the generated HTML for
   the sample guide to confirm the table of contents, prompt box, screenshot captions,
   download button, and limitations box all rendered into the expected markup. **Nobody has
   looked at this site in an actual browser yet** — please open the Cloudflare Pages preview
   URL and eyeball it (especially on mobile) before pointing the real domain at it.
5. `npm install` reports 4 vulnerabilities (1 critical, 2 high, 1 moderate) in transitive
   build-tool dependencies. I did not run `npm audit fix --force` since that can apply
   breaking major-version bumps without review. These are dev/build-time only — the shipped
   site is static HTML/CSS plus one small inline `<script>` for the copy button — but worth a
   `npm audit` look before this becomes a long-lived repo.
6. **Cloudflare Pages connection and the tahles.ai custom-domain attachment were not done by
   me** — I have no Cloudflare account access. Full step-by-step instructions are in
   `README.md`; this is the one concrete action item still outstanding on your side to get the
   site actually live.
7. Node/npm dependency footprint: `package-lock.json` is committed (338+ packages under
   `node_modules/`, not committed, standard `.gitignore`'d). Cloudflare Pages will run its own
   `npm install` — I set the `Node version` instruction in README.md (`NODE_VERSION=20` or
   `22`) since Cloudflare's default build image version was not checked from here.
8. Google Drive upload of this report: see the line just below — I do not have a way to
   independently confirm the destination folder is the correct one for a non-DPF business
   (TAHLES has no prior Drive presence in this environment), so I used the same
   `_CLAUDE_BRIDGE` convention this session's other Drive access uses, under its own
   `tahles-site/` subfolder, rather than mixing it into DPF's own report stream.

## Google Drive upload

Uploaded to `gdrive_completed:_CLAUDE_BRIDGE/tahles-site/BUILD_REPORT.md` via the same `rclone`
remote already used for DPF's own status reports (this repo has no separate Drive account
configured for TAHLES yet, so I reused this one under its own subfolder rather than mixing it
into DPF's report stream). Verified with `rclone lsf` (file listed) and `rclone lsl` (byte size
matches the local file exactly, 8766 bytes at time of upload).

Link: https://drive.google.com/open?id=11AHc2AV6TLJN6YG310sqS2fYQ9_Bl3Vj
