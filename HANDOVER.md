# Handover — 2026-09-17 (manual illustrated for the desktop 0.11 features, and `font=note` documented; site still not live)

Session state and open items. Durable conventions — editing the manual,
the house style, the nginx gotcha — live in **CLAUDE.md**; the layout and
the deploy procedure live in **README.md**. Trust both. This file is
rewritten each session; keep it short and current.

## 0. Where things stand

- Branch `main`, working tree clean after this evening's commits (the
  illustration pass, the `font=note` section, this file). No git remote
  (§3.5).
- **The site is still not live.** `clew-app.com` and `clew-app.net`
  resolve to GoDaddy's parking addresses, not the droplet
  (144.126.236.254). Everything below is verified locally only.
- `make check-links` → clean (the two `../index.html` anchors it lists
  resolve at `/manual/` on the site). The 0.9.0 binaries are staged in
  `site/downloads/`.
- `VERSION` (Makefile) = 0.9.0 = the landing page = `nav.js`.

## 1. What landed this session

**Desktop screenshots for everything that shipped 09-01 → 09-17** (one
commit), all
taken with the app's smoke harness over a scratch copy of the demo vault
at 2560×1700 in the dark theme, each eyeballed before it went in
(`site/manual/images/`):

| Image | Chapter | Shows |
|---|---|---|
| `welcome-screen.png` | getting-started `#first-launch` | The welcome window: Open / Create / Explore the demo vault (cropped to its centre 1600×1000) |
| `welcome.jpg` (retaken, also `site/images/`) | introduction, getting-started, landing page | The Welcome note as it is now (the 08-24 shot showed an older vault tree) |
| `embed-frames.png` | links-and-embeds `#embed-frames` | The `quiet` and `bare` embeds; the fold is the iPad figure above it |
| `figures-latex.png` | diagrams `#latex` | Maxwell's equations from a ```latex fence, the plain TeX line under it |
| `fence-split.png` | diagrams `#show` | Source (```tikz both, TeX-highlighted) beside reading mode (code, then figure) |
| `wikilink-completion.png` | editing (Wikilinks) | `[[Guide/Link` matching Links and Embeds by folder |
| `palette-export.png` | export `#where` | The palette filtered to the five export commands |
| `plugins-settings.png` | plugins `#global` | Settings → This vault: three vault plugins and a `global` one, the Open global plugin folder button |
| `office-tab.png` (retaken) | office-documents | A .docx in Writer with the **Colibre** icons — the 09-01 shot showed Sifr, which Clew-app reverted (`9ef4375`) |
| `office-embed.png` | office-documents `#embeds` | A .docx embedded as a thumbnail |

**Text:** `theming.html#reach` gained the typeface paragraph (Avenir
Next in editor and preview, the humanist fallback tail, the
`--clew-editor-font` token) — the second half of the old open item 2;
the first half (leaving reading mode lands the editor where the reader
was) turned out to be in `reading-mode.html#toggling` already. The
landing page's Diagrams bullet now says the figures are typeset in the
page by a WebAssembly TeX with LaTeX and plain TeX alongside; the Vault
plugins card mentions installing once for every vault; the
"Everything else" card mentions office documents and note history.
`editing.html` lost a stray empty `<p>` before the wikilink example.

**`font=note` — figures in the note's own typeface** (Clew-app §2f,
committed there as 3339969; here as the second commit of the evening): `diagrams.html` gained
`#note-font` (what it does, which forms take it, what it costs and why
it is opt-in, the reload when a note gains its first such figure, the
hand-written fontspec route, where it stops), two reference rows
(`font=note`, `fonts=`), and a rewritten "fonts" bullet in the
what-is-in-the-box list; `publishing.html#figures` (new anchor) says such
figures bake as outlines; `theming.html`'s typeface paragraph links
across. Every claim was smoke-verified on the desktop — plain TeX
included, after the library fixed it that evening. **Not yet said
anywhere: whether the iPad has it** (its engine build is the library's
too; ask the Clew-iOS session before adding an "On iPad" sentence), and
that the feature is gated on an unreleased library build (the manual
describes the behaviour; the app refuses by name on a build without the
bundle, which the "Where it stops" callout covers).

**The screenshot kit is reusable:** `../Clew-app/smoke/manual/` holds
one scenario per image, and that repo's `smoke/README.md` has the table
(vault copy, `CLEW_USER_DATA`, the Word file recipe, what each frame
script waits for). A retake is one command; the office pair needs the
engine and a couple of minutes.

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

1. **Landing page iPad status updated 2026-09-17** (`site/index.html`,
   the Pencil feature's last paragraph, commit cef2e0f): "in beta on
   TestFlight", the figures and the 0.11 features named, the two
   desktop-only losses kept, and "ask for an invitation" on the site's
   mailto. **When the external TestFlight group exists, replace that
   sentence with the public link** (`testflight.apple.com/join/…`);
   until then the page promises the link "when the open beta starts",
   which is true.
2. `site/index.html` says the demo vault exports to "37 pages";
   `publishing.html` says "roughly forty". The manual is the later
   number.
3. `site/images/kanban.jpg` shows 3 of 4 columns (the horizontal-clip
   bug, documented honestly). Re-shoot if that bug is fixed.
4. **Neither this repo nor `../Clew-app` has a git remote.** ~50k words
   of manual exist on one machine, in git only. (`../Clew-iOS` does
   have one, on GitHub.)
5. The manual no longer appears in the app repo's `git status`, so
   nothing reminds anyone when it goes stale — both `CLAUDE.md` files
   say so. Every session since 09-02 kept the rule; keep keeping it.
6. Social previews cannot be verified against Facebook's or Twitter's
   debuggers until DNS resolves. The card (`make og-card`) must be
   re-rendered on a Mac — Avenir Next.
7. `reading-mode.png` and `editor-split.png` are from 08-24 and still
   accurate (the reading face was already Avenir Next by accident, as
   Clew-app `7775cb0` records); no retake needed.

## 4. Verification kit

- `make check-links` — every local href/src and anchor, plus the
  `og:url` check; exits non-zero on a real problem.
- `make check` — the `--delete` guard, run before any sync.
- `make dry-run` — exactly what would change on the server.
- `make serve` — `site/` over http at :8000 (`file://` hides path
  bugs); `kill $(lsof -t -iTCP:8000)` if a stale one is running.
- `make nginx-diff` — the droplet's drift from the copy here.
- Headless Chrome renders any page without Electron (recipe in
  CLAUDE.md) — add `--virtual-time-budget=8000`, or the screenshot can
  come back before the page has painted (a blank dark PNG, seen this
  session). iPad screenshots come from the Clew-iOS simulator
  (`xcrun simctl io <sim> screenshot`), driven by that repo's
  `-ClewSmokeJS` hook; `sips` crops from the CENTRE and ignores
  `--cropOffset` — a top-anchored crop needs a ten-line CoreGraphics
  script (`xcrun swift`).

## 5. Standing rules

- **Nothing outside `site/` is ever published.**
- **Keep the manual's image duplication** (`site/manual/images/`
  repeats files from `site/images/` so `manual/` works as its own web
  root; `check-links` enforces it). `welcome.jpg` was retaken into BOTH
  places this session, as it must be.
- The app is the arbiter of fact. Hotkeys come from
  `../Clew-app/src/renderer/commands/builtin.js`; iPad behaviour from
  `../Clew-iOS` (its `src/shim/ipc.js` is the channel-by-channel
  truth), and every "On iPad" sentence in the manual was measured in
  the simulator before it was written.
- Re-run `make og-tags` after adding a chapter; never hand-edit the
  generated block.
- Stage explicit paths; the working tree has carried another session's
  pending hunk before (two authors in one file — split the commits).
