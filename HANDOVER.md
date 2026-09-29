# Handover — 2026-09-29 (the site is LIVE at https://clew-app.com, serving 0.11.1; tree clean; no remote)

Session state and open items. Durable conventions — editing the manual,
the house style, the nginx gotcha — live in **CLAUDE.md**; the layout and
the deploy procedure live in **README.md**. Trust both. This file is
rewritten each session; keep it short and current.

## 0. Where things stand

- Branch `main`, clean, **no git remote** (nothing to push). The manual
  reflects Clew-app up to **`12b1734`** — the base hash for the next
  docs notice. Everything committed is live (`make dry-run` clean).
- **Live:** `clew-app.com`, `clew-app.net` and both `www` names resolve
  to `jmck-web` (139.59.191.156). One Let's Encrypt certificate covers
  all four, expires 2026-12-28, renewed by `certbot.timer`. http → https
  everywhere; both `.net` names 301 to `clew-app.com` with the path
  kept.
- **What the droplet serves: 0.11.1**, published 09-29 at the owner's
  direct go — `make sync-downloads` (the five 0.11.1 files, ~1 GB; the
  0.9.0 files stay, since that target has no `--delete`), then `make
  sync` of `86385b2`. Verified live: the landing page is byte-identical
  to the committed one (0.11.1, "Untested", no universal image), all
  five files answer 200 at their committed sizes, the "In 0.11.1"
  callout and the `preventDefault` line are on the manual pages, https
  and the redirects hold, and `make dry-run` has nothing left to send.
  Release order next time too: downloads first, then pages, so no link
  404s in between.
- `VERSION` (Makefile) = landing page = manual index = `nav.js` =
  getting-started = **0.11.1**. `make check-links` clean.

## 1. What landed this session

| Commit | What |
|---|---|
| `3b4f396` | The owner's retarget from `do` to `jmck-web`, committed on their behalf |
| `84de0b1` | diagrams: a ```tikz body that begins with `\begin{tikzcd}`, `\begin{circuitikz}`, `\chemfig` or `\schemestart` is not nested in a second picture (mp-tikz-wasm 0.3.0, Clew-app `368bfd7`); circuitikz, chemfig, tikz-3dplot in the toolchain list |
| `298761c` | canvas: an engaged node draws no handles or anchor dots, and its ring shows on coloured nodes (`45dffd7`); an edge from it costs a click outside — the owner keeps that trade |
| `504715e` | panels: the shell is a login shell on macOS, an interactive one on Linux (`5516844`) |
| `47ffe0b` | canvas + note-api: Esc goes to the innermost owner first, then leaves an engaged note card (`7a0cb6f`, **after** 0.11.1) — with an "In 0.11.1" callout saying it does nothing in that release; scripts that answer Esc call `preventDefault` |
| `0f80272` | Release 0.11.1: two signed Mac images (arm64, x64) in place of the universal one, the version everywhere, `stage-downloads` for both; Windows/Linux tagged "Untested" (owner's decision) |

After the release, each deployed manual-only under the delegation (§3),
each smoke-measured on the Clew-app commit it documents:

| Commit | What |
|---|---|
| `f4392f4` | attachments: annotations written at once when the viewer goes (`1956d89`); "In 0.11.1" caution — an edit in those seconds is lost |
| `61e66a6` | live-edit: the toolbar wraps onto a second row before anything goes into … (`c386829`) |
| `64aa6a7` | editing: a wheel over the live preview pane scrolls the note (`83532b2`) |
| `b2b84f0` | live-edit: a frame resolves citations under the host note's header (`707ed87`) |
| `a3716ae` | citations: a note's `Bibliography` REPLACES the vault's, one `.bib` per note (from the engine's config-manager) |
| `ba88a08` + `d215c8d` | attachments: with a pen, a finger pans a PDF while a drawing tool is armed (`12b1734`). `ba88a08` was committed here directly by the Clew-app session; reviewed, kept, moved and dated in `d215c8d` |

Post-0.11.1 behaviour is marked in the prose: a Caution callout titled
"In 0.11.1" where the release loses work or breaks a promise (Esc,
annotations), a parenthesis where it merely behaves differently (toolbar,
preview-pane scroll, frame citations, pen).

Every behavioural claim was smoke-measured against Clew-app's source
over a scratch vault. **A timing lesson from this session:** a smoke
watcher that polls up to 8 s for a condition can log the effect of a
LATER queued input — `esc.js` blamed Esc for a deselection that the
next click on empty canvas caused. Log only after the input that
matters, or check the queue's own timings.

## 2. Hosting — live

- `ssh jmck-web`, web root
  `/var/www/clew-app.com` (`web:web`), nginx 1.24. The droplet also
  serves jmckalex.org and fishhooksoftware.com.
- **TLS was not issued with `make tls`.** Its `dns-check` gate reads the
  local resolver, and the LSE resolver held the parked records for hours
  after GoDaddy changed; Cloudflare's and Google's DNS-over-HTTPS already
  answered the droplet. Certbot ran on the droplet directly, at the
  owner's word: `certbot --nginx --non-interactive --redirect -d … ×4`
  (`make tls` uses `ssh -t` and prompts, which a Claude shell cannot
  answer). Claude Code's auto-mode classifier refused that command once
  on a relayed approval and allowed it on the owner's direct request.
- Certbot rewrote `/etc/nginx/sites-available/clew-app.com` (443 blocks,
  redirects). The copy here stays at port 80 by design; `make
  nginx-diff` shows the drift.
- Decisions not to re-litigate: `.com` is canonical, `.net` 301s to it;
  all four names on the certificate; `make sync` uses `--delete` behind
  the `check` guard; `--exclude='downloads/'` keeps `--delete` off the
  binaries — do not "tidy" it.

## 3. Coordination

A coordinating session, **Clew-boss** (in `~/Source/Clew`), sends docs
notices for Clew-app and Clew-iOS changes as commit ranges, and keeps
`~/Source/Clew/SYNC-LEDGER.md`. **The owner's standing rule: report
every finished task to Clew-boss** — what was done, commit hashes,
whether anything was committed / pushed / deployed, anything touching
the app or iOS; tasks the owner gives directly included. **Delegation
(the owner confirmed it directly, 2026-09-29):** Clew-boss may approve
manual-only deploys (`make sync` of manual text — check `make dry-run`
lists only manual pages), small low-risk fixes, and the order of work.
Anything that touches downloads or the version, and design questions,
stay with the owner.

## 4. Open items

1. **At the next release, remove both "In 0.11.1" callouts** —
   `canvas.html#interaction-model` (the Esc fix, `7a0cb6f`) and
   `attachments-and-files.html#annotating` (annotations flushed when the
   viewer goes, `1956d89`) — turn the four "(In 0.11.1 …)" / "(On the
   desktop this arrives after 0.11.1 …)" parentheses into plain
   statements (live-edit ×2, editing, attachments), and bump the
   version.
2. **CLAUDE.md is out of date in two places:** the version appears in
   five files, not two (Makefile, `site/index.html`,
   `site/manual/index.html`, `nav.js`, `getting-started.html`); and
   `check-links` reports FIVE `downloads/…` links when the binaries are
   not staged, not four.
3. `www.clew-app.com` serves the site (200) rather than 301 to the
   apex — as the nginx config was written; `og:url` is canonical to the
   apex. The owner's call whether to redirect it.
4. The landing page's iPad download card says "not yet released" while
   the section above says "in beta on TestFlight". When the external
   TestFlight group exists, put the public link in both places.
5. The unserved August copy on `do` (`/var/www/clew-app.com`) can be
   deleted.
6. Social previews can now be checked in Facebook's and Twitter's
   debuggers. The card (`make og-card`) must be re-rendered on a Mac —
   Avenir Next.
7. **Offered, not written** (waiting on the owner): `\[ \begin{align*}
   … \end{align*} \]` renders in the preview but is an error in real
   LaTeX, so a note that looks right can fail a LaTeX export; `\Box`
   wants `amssymb` on that route.
8. `site/index.html` says the demo vault exports to "37 pages";
   `publishing.html` says "roughly forty". The manual is the later
   number.
9. `site/images/kanban.jpg` shows 3 of 4 columns (the horizontal-clip
   bug, documented honestly). Re-shoot if that bug is fixed.
10. **No git remote** for this repo — ~50k words of manual on one
    machine. (Clew-app and Clew-iOS have theirs.)

## 5. Verification kit

- `make check-links` — every local href/src and anchor, plus the
  `og:url` check; exits non-zero on a real problem.
- `make check` — the `--delete` guard, run before any sync.
- `make dry-run` — exactly what would change on the server.
- `make serve` — `site/` over http at :8000 (`file://` hides path
  bugs); `kill $(lsof -t -iTCP:8000)` if a stale one is running.
- `make nginx-diff` — the droplet's drift from the copy here.
- Live checks from a network whose resolver lags: `curl --resolve
  host:443:139.59.191.156` (in zsh, pass the flags as an array), or
  DNS-over-HTTPS (`https://dns.google/resolve?name=…&type=A`) — plain
  `dig @1.1.1.1` times out from the LSE network.
- Headless Chrome renders any page without Electron (recipe in
  CLAUDE.md) — add `--virtual-time-budget=8000`, or the screenshot can
  come back before the page has painted.
- The app's smoke harness (`../Clew-app/CLAUDE.md`, `smoke/README.md`)
  now runs invisibly; `CLEW_SMOKE_VISIBLE=1` to watch. Always pass
  `CLEW_SMOKE_VAULT` and a scratch `CLEW_USER_DATA`. iPad screenshots
  come from the Clew-iOS simulator, driven by that repo's
  `-ClewSmokeJS` hook.

## 6. Standing rules

- **Nothing outside `site/` is ever published.**
- **Keep the manual's image duplication** (`site/manual/images/`
  repeats files from `site/images/` so `manual/` works as its own web
  root; `check-links` enforces it).
- The app is the arbiter of fact. Hotkeys come from
  `../Clew-app/src/renderer/commands/builtin.js`; iPad behaviour from
  `../Clew-iOS`, and every "On iPad" sentence was measured in the
  simulator before it was written.
- Re-run `make og-tags` after adding a chapter; never hand-edit the
  generated block.
- Stage explicit paths, and split a file's hunks by topic when two
  changes share it (`git update-index --cacheinfo` with a hand-built
  blob does it without touching the working tree).
