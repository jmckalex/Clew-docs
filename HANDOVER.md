# Handover — 2026-09-17 (manual current for desktop 0.11 features and the iPad; site still not live)

Session state and open items. Durable conventions — editing the manual,
the house style, the nginx gotcha — live in **CLAUDE.md**; the layout and
the deploy procedure live in **README.md**. Trust both. This file is
rewritten each session; keep it short and current.

## 0. Where things stand

- Branch `main`, working tree clean, HEAD `6de0df8`. No git remote
  (§3.5).
- **The site is still not live.** `clew-app.com` and `clew-app.net`
  resolve to GoDaddy's parking addresses (13.248.243.5 / 76.223.105.230
  and 3.33.130.190 / 15.197.148.33 on 2026-09-17), not the droplet
  (144.126.236.254); an HTTPS fetch of the apex answers 200 with a page
  that is not ours. Everything below is verified locally only.
- `make check-links` → all local links resolve (the two `../index.html`
  anchors it lists resolve at `/manual/` on the site). The 0.9.0
  binaries ARE staged in `site/downloads/` now (dmg, exe, AppImage,
  deb), so the download links no longer 404 locally.
- `VERSION` (Makefile) = 0.9.0 = the landing page = `nav.js`. The
  old "v0.8.0 tag collision" question is settled.

## 1. What landed since the last handover (all committed here)

The Clew-app sessions of 2026-09-02 → 09-17 wrote the manual for each
desktop feature as it shipped: figures typeset in the page by a wasm
TeX (`92320d9`), no inline fields (`bb875b1`), fence highlighting +
the LaTeX and plain TeX fences + `show=` (`ea02cb7`), three Dataview
facts (`b5a65a9`), plain TeX on LuaTeX (`dc79747`), page numbers kept
(`80dad8b`, `47634d7`). Global plugins, foldable / quiet / bare
embeds, `|external` and `file://` links, the reading-view PDF and
Meta Bind `class()` are all in their chapters too.

**The iPad pass (`6de0df8`, from the Clew-iOS 0.11 sync session):**
"On iPad" callouts where the iPad does it differently — figures ship
in the app with no download (`diagrams.html#toolchain`); the global
plugin folder is Clew › Plugins in the Files app (`plugins.html`,
table row + callout + summary table); external links open Quick Look,
`file://` reaches only the open vault (`links-and-embeds.html
#external-apps`); two of the four export commands, share sheet instead
of a save dialog (`export.html#where`). Five iPad screenshots in
`site/manual/images/ipad-*.jpg` (1000 px wide, from the simulator; the
Files-app and Quick Look ones cropped to their top 640 px). Earlier
iPad callouts (getting-started, note-history, vaults-and-files,
settings-and-hotkeys, office-documents `#ipad`, attachments-and-files)
were already there from the 09-02 session. The Clew-iOS build with all
of this went to TestFlight on 2026-09-17 (its own `HANDOVER.md` has
the state).

## 2. Hosting — done except for DNS (unchanged)

Deploys to the owner's droplet (`ssh do` → 144.126.236.254, nginx +
certbot), house pattern in `~/Sites/digital_ocean/`. Nothing on the
droplet has been touched by any session. **The blocker is the two apex
A records at GoDaddy**, which need registrar access. Then, in order:
`make dns-check` (gate) → `make provision` → `make nginx-install` →
`make sync` → `make tls`. Decisions not to re-litigate: `.com` is
canonical and `.net` 301s to it; both `.net` names go on the
certificate; `tls` is gated on `dns-check` (Let's Encrypt's five failed
validations per hostname per hour); `make sync` uses `--delete` behind
the `check` guard; `--exclude='downloads/'` is what keeps `--delete`
from wiping 640 MB of binaries — do not "tidy" it.

## 3. Open items

1. **Landing page is stale about the iPad** (`site/index.html:551`):
   "Status: a working proof of concept … TestFlight are the next
   milestone." Internal TestFlight has been live since 2026-08-24 and
   the 0.11 build (figures, plugins, exports) shipped 2026-09-17. The
   wording of a public status line is the owner's; the feature list
   beside it predates note history, office thumbnails and figures.
2. **Two desktop 0.11 features have no manual sentence yet**: leaving
   reading mode lands the editor where the reader was (Clew-app
   `d417f9f`; `reading-mode.html` / `editing.html` say nothing about
   it), and Avenir Next as the reading face (`7775cb0`; no chapter
   names the typeface — `theming.html` would be the place, with the
   `--clew-editor-font` override it documents). The owner intends the
   app agent to do these.
3. `site/index.html:417` says the demo vault exports to "37 pages";
   `publishing.html:90` says "roughly forty". The manual is the later
   number.
4. `site/images/kanban.jpg` shows 3 of 4 columns (the horizontal-clip
   bug, documented honestly). Re-shoot if that bug is fixed.
5. **Neither this repo nor `../Clew-app` has a git remote.** ~50k words
   of manual exist on one machine, in git only. (`../Clew-iOS` does
   have one, on GitHub.)
6. The manual no longer appears in the app repo's `git status`, so
   nothing reminds anyone when it goes stale — both `CLAUDE.md` files
   say so. The 09-02 → 09-17 sessions kept the rule; keep keeping it.
7. Social previews cannot be verified against Facebook's or Twitter's
   debuggers until DNS resolves (they fetch the live URL). The card
   (`make og-card`) must be re-rendered on a Mac — Avenir Next.

## 4. Verification kit

- `make check-links` — every local href/src and anchor, plus the
  `og:url` check; exits non-zero on a real problem.
- `make check` — the `--delete` guard, run before any sync.
- `make dry-run` — exactly what would change on the server.
- `make serve` — `site/` over http at :8000 (`file://` hides path
  bugs). A `python3 -m http.server 8000 --directory site` from the
  09-17 session may still be running; `kill $(lsof -t -iTCP:8000)`.
- `make nginx-diff` — the droplet's drift from the copy here.
- Headless Chrome renders any page without Electron (recipe in
  CLAUDE.md). iPad screenshots come from the Clew-iOS simulator
  (`xcrun simctl io <sim> screenshot`), driven by that repo's
  `-ClewSmokeJS` hook; `sips` crops from the CENTRE and ignores
  `--cropOffset` — a top-anchored crop needs a ten-line CoreGraphics
  script (`xcrun swift`).

## 5. Standing rules

- **Nothing outside `site/` is ever published.**
- **Keep the manual's image duplication** (`site/manual/images/`
  repeats files from `site/images/` so `manual/` works as its own web
  root; `check-links` enforces it). New iPad images live only in
  `site/manual/images/`.
- The app is the arbiter of fact. Hotkeys come from
  `../Clew-app/src/renderer/commands/builtin.js`; iPad behaviour from
  `../Clew-iOS` (its `src/shim/ipc.js` is the channel-by-channel
  truth), and every "On iPad" sentence in the manual was measured in
  the simulator before it was written.
- Re-run `make og-tags` after adding a chapter; never hand-edit the
  generated block.
- Stage explicit paths; the working tree has carried another session's
  pending hunk before (two authors in one file — split the commits, as
  `47634d7` / `6de0df8` were).
