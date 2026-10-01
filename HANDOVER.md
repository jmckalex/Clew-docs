# Handover — 2026-10-01 (site LIVE, serving 0.12.0; tree clean; remote: github.com/jmckalex/Clew-docs)

**Release 0.12.0 is LIVE** (deployed 2026-10-01 on the owner's direct go:
`make sync-downloads`, then `make sync`; verified — landing 0.12.0 ×12 and
no 0.11.1, the five files 200 at their exact sizes, no 0.11.1 left in the
manual's prose, the sidebar badge v0.12.0, dry-run clean). Returning
visitors may see the old v0.11.1 badge for up to a week: `nav.js` is
cached 7 days (§4 item 10). How it got there: Clew-boss
said "release done" (Clew-app `9268aa3`; files verified in `out/`); the
`release-0.12.0` commits (the 20 markers removed, the version in every
place, the landing page — kanban.jpg with 4 columns, tabbing, PDFs, the
padlock) were rebased onto the scrubbed `main` and fast-forwarded in, and
`make stage-downloads` copied the five 0.12.0 files (byte-identical to
`out/`); `make check-links` is clean.

**The repo is on GitHub**: `origin` = https://github.com/jmckalex/Clew-docs
(public; homepage clew-app.com), `main` only — `release-0.12.0` and
`feat/live-edit` stay local. Before the first push the history was
rewritten at the owner's direct choice ("scrub, then push"): every
`Claude-Session:` trailer removed from the messages, and HANDOVER's
root/key-file aside removed from every version. The pre-scrub `main` is
the local branch `backup/pre-scrub` (and `refs/original/`); never push
either. **Pushing needs the owner's explicit OK, relayed by Clew-boss or
given directly.** Do not put credentials, login accounts or key names in
tracked files — this repository is public.

**Resume here.** Nothing else is in flight. Wait for Clew-boss's next docs
notice (base hash `5119d93`). 0.12.0 is released and live; the next
release starts its markers afresh (§4 item 1) and is not scheduled — do
not bump the site until Clew-boss says a release is done. Standing rules for working with Clew-boss (report every
finished task; what it may approve) are in this project's memory and in
§3. Session scratch (`/private/tmp/…/scratchpad`) does not survive the
reboot: the screenshot recipes that mattered are in §5.

Session state and open items. Durable conventions — editing the manual,
the house style, the nginx gotcha — live in **CLAUDE.md**; the layout and
the deploy procedure live in **README.md**. Trust both. This file is
rewritten each session; keep it short and current.

## 0. Where things stand

- Branch `main`, clean, remote `origin` on GitHub (public). The manual
  reflects Clew-app up to **`5119d93`** (0.12.0 = Clew-app `9268aa3`, live) — the base hash for the next
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
| `566ebff` | canvas: a PDF in a canvas embedded in a note opens in the full viewer, annotations saved (`71180c6`); the portal miniature and a note's own `<iframe src="x.pdf">` still use Chromium's plugin — not described, the owner's open question |
| `c94e302` | kanban: a wide board widens to the pane, one wider than the pane scrolls with a visible bar (`a65395c`); `kanban-board.png` retaken — all four columns (scenario in the session scratchpad, offered to Clew-app for `smoke/manual/`) |
| `91dcd53` | maps: the measuring tool measures — two Shift-clicks, a third starts over, Esc clears (`693c4fe`); it NEVER completed a measurement before, so an "In 0.11.1" Caution says it does not work there |
| `a62bed2` | **New chapter `tabbing.html`** (Writing, after Callouts): LaTeX's tabbing, fence and `@begin` forms (`cd8c311`). Nav, manual index card, dialect see-also, live-edit frame list, export caution. A Caution: single-note HTML/LaTeX exports do not carry it (measured by running the export worker). Every example rendered in the app, none overprinting. `tabbing.png` from the demo vault |
| `52e2b98` | export: a Clew fence (query, mermaid, kanban, dataview, tabbing…) stops a PDF-via-LaTeX compile — `minted` gets a language Pygments does not know. A Troubleshooting entry, pointed at from the export caution and the tabbing caution. **When the jmarkdown unknown-lexer fallback lands, rewrite all three** |
| `02478f7` | canvas: a PDF in a portal is a cached first-page picture (`bf5d212`) — phase 1 of 4 of retiring Chromium's PDF plugin (`docs/dev/pdf-unification.md` in Clew-app). Next: a note's own `<iframe src="x.pdf">` in the standard viewer; web PDFs fetched and opened read-only; then the plugin goes — expect a notice for each |
| `f245e91` | attachments: a note's own `<iframe>`/`<embed>`/`<object>` at a vault PDF opens in Clew's viewer, `#page=N` and size kept (`b9f21c6`, phase 2). Web PDFs (phase 3) not described yet. Pending, no manual line until it ships: the "Run note code" engine switch's interim trust guard |
| `5428131` | **Vault trust** (`e8d32e6`, the interim guard): `vaults-and-files.html#trust`, the settings trust row + corrected Caution + `vault-trust.json` reference row, export's untrusted exception. SCOPE: engine note code ONLY — plugins, dataviewjs, Note API, vault scripts and inline scripts are not gated; the full vault-trust design (Clew-app `docs/dev/frame-bridge.md` §4) will change this section when it lands. "In 0.11.1" Caution: no guard |
| `7da5082` | panels + settings: Powerline/Nerd Font prompt symbols draw, Unicode 11 widths fix the cursor after `$`, new `shellFont` setting (`06f5e70`) |
| `c7deb5d` | vaults-and-files: every new file Clew writes appears in the explorer at once, watcher or not (`5077207`) |
| `accad6f` | vaults-and-files: each window gets a share of the watch budget (6,000 / 1,000 / 500); the example message now says 6,000 (`b9e5416`) |
| `1c87568` | properties: Meta Bind `locked` argument, a padlock for one edit (`ac6e9cc`) |
| `3b94070` | properties: Enter saves a text/number widget, a textArea saves on leaving; line breaks stored `"one\ntwo"`, double-quoted escapes read as YAML's (`e80e583`). "In 0.11.1" Caution: a textArea newline left the block unwritable |
| `15c9be3` | attachments: web PDFs a note embeds open read-only, fetched by Clew and cached on the device; Save a copy / Open in browser / Reload; no cookies; private addresses refused (PDF phase 3: `ffb7290`, `8bab972`, `03c06f3`) |
| `01eda7f` | attachments: a vault PDF a note's script adds after render also reaches the viewer; an unrecognised web PDF stays in the browser's own viewer (PDF phase 4: `b5325cc`, `29fa2ae`) |

Post-0.11.1 behaviour is marked in the prose: a Caution callout titled
"In 0.11.1" where the release loses work or breaks a promise (Esc,
annotations, map measuring), a parenthesis where it merely behaves differently (toolbar,
preview-pane scroll, frame citations, pen, scene PDFs, kanban width, the tabbing chapter's lead).

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

1. **At the next release** (after 0.12.0): grep the manual for
   `0.12.0` — every hit is either the version or a release marker to turn
   into a plain statement. Markers so far: `vaults-and-files.html#windows`
   "(Not in 0.12.0.)" (the Window menu, Clew-app `5119d93`). Then the
   version in its five places plus the README, the downloads, and the
   landing page (still owed: a live-edit section — a design question with
   the owner). The 0.12.0 release did this for twenty 0.11.1 markers:
   prepare it on a branch in its own worktree so `main` stays deployable.
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
9. `site/images/kanban.jpg` (the LANDING page's, 1400×929) still shows
   3 of 4 columns. The bug is fixed in `a65395c`, after 0.11.1; the
   manual's own `kanban-board.png` is retaken. Re-shooting the landing
   image is not a manual-only deploy, and shows behaviour 0.11.1 lacks —
   the owner's call, likely at the next release. Likewise the landing
   page's Maps bullet lists "distance measuring", which 0.11.1 does not
   deliver (`693c4fe`) — true again from the next release.
10. **`nav.js` is served with a 7-day cache** (`max-age=604800`; pages
    are `no-cache`). A chapter added to the nav — Tabbing, 09-30 — or the
    version badge changed at a release reaches a returning visitor's
    sidebar up to a week late. Fix is the owner's call: a location for
    `manual/nav.js` in the nginx config (mind the `add_header` gotcha) or
    a `?v=` on every page's `<script>`.
11. `callouts.html` (and `excalidraw.html`) have no Reference table,
    against CLAUDE.md's "no exceptions".
12. The repository is now public on GitHub (2026-10-01); what is
    tracked is published, including HANDOVER and the commit messages.

## 5. Verification kit

- **Screenshot recipes from this session** (their scripts lived in
  `/tmp`): every one runs over a scratch copy of the vault
  (`rsync -a --exclude .clew/cache --exclude .clew/history`, then delete
  `.clew/workspace.json`), a fresh `CLEW_USER_DATA`, 2560×1700 dark. The
  scenario waits for `vaultStore.vault?.sessionId`, closes both sidebars
  (`workspaceStore.setSidebar('left'|'right', { open: false })`), opens
  the note with `openNote(path, { defaultMode: 'reading' })` AND calls
  `setTabMode(tab.id, 'reading')` — `defaultMode` alone opened the demo
  vault's Tabbing note in SOURCE mode — then sleeps ~7 s.
  `kanban-board.png` is now Clew-app's `smoke/manual/kanban-board.js`
  (vault folder named `study-vault` so the title bar says so);
  `tabbing.png` is `Guide/Tabbing.md` with a frame script
  (`CLEW_SMOKE_FRAME_MATCH=vault/`) that scrolls the `h2` "Indenting, and
  stepping back" to the top, minus 24 px.
- **Checking a new chapter's examples**: extract every `<pre><code>` of
  the page, `html.unescape` them into one note, render it in reading
  mode, and have a frame script report per block `tb-laid` and any
  horizontally overlapping pieces in a row — how the tabbing chapter was
  proved to hold no overprinting example.

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
