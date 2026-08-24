# Handover — 2026-08-24 (repo created, domain chosen, social cards)

Session state and open items. Durable conventions — editing the manual,
the house style, the nginx gotcha — live in **CLAUDE.md**; the layout and
the deploy procedure live in **README.md**. Trust both. This file is
rewritten each session; keep it short and current.

## 0. Where things stand

- Branch `main`, **3 commits**, working tree clean. This repo was created
  from scratch this session.
- **The site is not live.** Everything is built and verified locally;
  it is blocked on one DNS change (§2).
- `make check` → 70 files. `make check-links` → 4 known problems, all of
  them the missing download binaries (§3.1), which is expected on a
  machine that has not run `make stage-downloads`.

## 1. Where this came from

The website and manual were `docs/site/` inside `../Clew-app` until this
session. They moved because they document *Clew*, not the desktop
implementation — `../Clew-iOS` has equal claim — and because the manual's
7 MB of screenshots were still untracked, so the next commit in that repo
would have written them into its history permanently.

Moved verbatim: 70 files, byte-verified, taking the *working-tree* copy of
`index.html` (which carried unpushed favicon/hero/download work) rather
than HEAD's. `site/` keeps the exact shape `docs/site/` had, so no link
needed editing.

**The one code coupling back to the app repo:**
`../Clew-app/scripts/make-icon.js` writes `icon.svg`, `favicon.svg` and
`icon-256.png` into `site/images/` from the same source as the app icon,
so the site's mark cannot drift. It finds this repo as a sibling and skips
the step silently if it is absent.

## 2. Hosting — done except for DNS

Deploys to the same droplet as the owner's other sites (`ssh do` →
144.126.236.254, Ubuntu 24.04, nginx 1.24, certbot), following the house
pattern in `~/Sites/digital_ocean/`. **Nothing on the droplet has been
touched** — all inspection was read-only.

**The blocker: `clew-app.com` and `clew-app.net` are registered with
GoDaddy and still resolve to its parking IPs.** Repointing the two apex A
records at 144.126.236.254 needs registrar access and is the only step
that cannot be done from here. `www` is already a CNAME to the apex on
both, so it follows.

Then, in order:

```
make dns-check      # gate; refuses to go on until all four names agree
make provision
make nginx-install  # runs nginx -t, reloads only if it passes
make sync
make tls            # certbot, all four names at once
```

Design decisions worth not re-litigating:

- **`.com` is canonical, `.net` 301s to it.** Two registered domains
  serving identical content would otherwise be indexed as two sites.
- **Both `.net` names are on the certificate** even though they only
  redirect: a browser in HTTPS-first mode tries `https://clew-app.net`
  before `http://`, and an uncertificated name fails there rather than
  redirecting. This matches the `opensocietyasanenemy.info` cert on the
  same droplet, which covers all six of its names.
- **`tls` is gated on `dns-check`** because a failed certbot run counts
  against Let's Encrypt's limit of 5 failed validations per hostname per
  hour — guessing at readiness costs the next few attempts too.
- **`make sync` uses `--delete`** (a directory sync, unlike the explicit
  `FILES` lists of the other sites — 70 files, and a hand-kept list would
  be wrong the first time a chapter is added). `check` therefore refuses
  to sync unless the landing page, the manual index, and ≥50 files are
  present. Do not weaken that guard.
- **`--exclude='downloads/'` is load-bearing**, not tidiness: rsync does
  not delete excluded paths, so that one line is what stops `--delete`
  from wiping 640 MB of binaries on every ordinary deploy.

## 3. Open items

1. **The four `downloads/…` links 404 and always have** — the directory
   never existed. `make stage-downloads` (copies from `../Clew-app/out/`,
   ~640 MB) then `make sync-downloads` fixes it. Not run this session:
   the release version is still undecided (§3.2), so staging 0.8.0 would
   stage a build that may never ship.
2. **`VERSION` in the Makefile must match the landing page**, which says
   `0.8.0` in nine places (download hrefs, visible filenames, the licence
   paragraph, the footer). Neither is derived from the other. **This is
   blocked on a decision in `../Clew-app`**: its `v0.8.0` tag collides
   with an older commit, and 0.9.0 is the likely answer. When that lands,
   both the page and `VERSION` change together.
3. **The landing page says the demo vault exports to "37 pages"**
   (`site/index.html:417`); the manual says "roughly forty"
   (`site/manual/publishing.html:90`). The manual is the later number.
   Carried over from the app repo's bug list — now this repo's problem.
4. `site/images/kanban.jpg` shows 3 of 4 columns because a kanban wider
   than the note column silently clips (a real, open app bug, documented
   honestly in the manual). If that bug is fixed, re-shoot the image.
5. **Neither this repo nor `../Clew-app` has a git remote.** The manual is
   ~50k words that exist on one machine; it is at least in git now, which
   it was not before, but there is no off-machine copy.
6. The manual documents split behaviour, citations, panels, the note API,
   plugins and every settings key. **It no longer appears in the app
   repo's `git status`, so nothing will remind anyone when it goes
   stale.** This is the standing risk of the split; both `CLAUDE.md` files
   say so.

## 4. Social previews (new this session)

Every page has the full Open Graph + Twitter set and a `rel="canonical"`
(the apex, www, and `.net` all reach the same content).

- The card is `site/images/clew-og-card.jpg`, 1200×630, 103 KB, generated
  from `og/clew-og.html` by `make og-card` — HTML rather than a drawing so
  it cannot drift from the landing page's palette, type and tagline.
  Headless Chrome at 2× + `sips`, both already on the machine; no
  puppeteer, no `node_modules`.
- **Re-render on a Mac only.** It uses Avenir Next, the face the landing
  page asks for first, and falls back silently anywhere else.
- The manual's tags are **generated** by `make og-tags`, derived from each
  page's own `<title>` and description. Chapters are written by copying an
  existing page, so hand-written tags would ride along with the copy and
  the new chapter would claim the old one's title at the old one's URL —
  invisible until someone shares the link. `make check-links` fails any
  page whose `og:url` disagrees with its filename.
- None of this is verifiable against Facebook's or Twitter's debuggers
  until DNS resolves — they fetch the live URL.

## 5. Verification kit

- `make check-links` — 582 local links, every anchor, plus the `og:url`
  check. Exits non-zero. The manual's internal cross-references were all
  sound when last run; the only failures are the download binaries.
- `make check` — the `--delete` guard, run automatically before any sync.
- `make dry-run` — exactly what would change on the server.
- `make serve` — serves `site/` over http at :8000, which is how it will
  actually be served (`file://` hides path bugs).
- `make nginx-diff` — how far the droplet's config has drifted from the
  copy here (certbot rewrites it in place, by design).
- Headless Chrome renders any page for a visual check without Electron;
  the recipe is in CLAUDE.md.

## 6. Standing rules

- **Nothing outside `site/` is ever published.** That is the entire reason
  for the extra directory level.
- **Keep the manual's image duplication.** `site/manual/images/` repeats
  ten files from `site/images/` so the manual still works when `manual/`
  is served as its own web root. `check-links` enforces it.
- The app is the arbiter of fact, not the manual. Hotkeys come from
  `../Clew-app/src/renderer/commands/builtin.js` and nowhere else.
- Re-run `make og-tags` after adding a chapter; never hand-edit the
  generated block.
