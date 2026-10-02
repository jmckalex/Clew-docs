# Handover — 2026-10-02 (site LIVE, serving 0.12.0; `main` pushed through `d4643f9`)

Session state and open items. Durable conventions — editing the manual,
the house style, the nginx gotcha — live in **CLAUDE.md**; the layout and
the deploy procedure in **README.md**. Trust both. This file is
rewritten each session; keep it short and current. **This repository is
public**: nothing tracked may hold credentials, login accounts or key
names.

## 0. Resume here

- **Nothing is in flight.** Wait for Clew-boss's next docs notice. The
  manual reflects Clew-app up to **`6623303`** — the base hash. Coming:
  frame-bridge phases 2–4 (Clew's own app address, then apps in notes via
  `@app[…]`) — an "Apps in notes" chapter after phase 4, per Clew-boss.
- **Live:** clew-app.com serves **0.12.0** (Clew-app `9268aa3`), pages and
  downloads, deployed 2026-10-01 on the owner's direct go and verified:
  0.12.0 everywhere, the five files 200 at their exact sizes, no 0.11.1
  left in the prose. Everything committed on `main` is deployed
  (`make dry-run` clean). On 2026-10-02, on Clew-boss's go: `bbffa4d`,
  then the callouts/export notice (`7200d20`–`e631b9d`, six pages),
  then the LaTeX-engine notice (`8b3ecc4`–`da59221`, three pages), then
  the screenshot lightbox (`c2d201a`, 37 files: every manual page, the
  landing page, `manual/lightbox.{js,css}` — the owner's direct go), then
  the new chapter *Trusting a vault* (`0b78593`–`9534701`, 38 files — the
  owner's direct go), each verified byte-identical live.
- **GitHub:** `origin` = https://github.com/jmckalex/Clew-docs (public,
  homepage clew-app.com), `main` only. Pushed through **`d4643f9`**
  (2026-10-02: Clew-boss relayed "push all", the owner confirmed here);
  anything later is unpushed — every push needs the owner's explicit OK
  (§1).
- **Next release** (not scheduled; do not bump the site until Clew-boss
  says a release is done): grep the manual for `0.12.0` — 64 hits in
  17 files besides the version pages (2026-10-03). Each is a marker: a
  "(Not in 0.12.0.)" or "(not in 0.12.0)" is deleted; an "(In 0.12.0 …)"
  parenthesis describing the old behaviour is deleted whole; a Caution
  titled "In 0.12.0" (export.html's natbib one, trusting-a-vault.html's
  opening one) is deleted — and then reread that chapter's lead, which
  stands without it. Read each in
  place — a few sentences lean on their marker. Then the version in its
  places (Makefile `VERSION`, `site/index.html` lead, cards and footer,
  `manual/index.html`, `nav.js`, `getting-started.html`, the README
  example), and the downloads. Prepare it on a branch in its own
  worktree so `main` stays deployable — that is how 0.12.0 was done.
- **Release notes, drafted:** `whats-new.html` (*What's new*, one
  `<h2 id="v0-12-1">` per release — the anchor Clew-app's auto-update feed
  names) is on branch **`release-0.12.1`** (`b8d1e42`), in the worktree
  `../Clew-docs-0.12.1`, NOT on `main` and never deployed. At release:
  write the date line, add Apps in notes (a comment marks the place) and
  anything landed since `88b6dd2`, merge into `main`, and run `make
  stamp` — the merge conflicts on the `?v=` stamps, and restamping is the
  resolution. Tabbing is deliberately absent: it predates 0.12.0.
- **Release checklist — the screenshot pass** (Clew-boss, 2026-10-02:
  at the release, not before, so the shots match what people download).
  Ten manual images show the pre-`80b8b44` UI (checked image by image,
  2026-10-02): the toolbar with the mode switch at its end —
  `live-edit`, `live-edit-toolbar`, `live-edit-table`, `pdf-annotations`,
  `sidenotes-live`; the slim bar — `sidenotes-reading`, `kanban-board`,
  `tabbing`; `citations-library`, whose split shows a live pane WITHOUT
  its toolbar (the bug `80b8b44` fixed); and `shell-panel`, which also
  shows the prompt bug `06f5e70` fixed (`$wc`, typing against the `$`).
  Not affected — crops of the note area: `live-edit-slash`,
  `link-preview`, `live-preview-pane`, `crossref-preview`. Older full
  shots merely lack the switch in the tab strip. Also fold in:
  `math.jpg`'s Note title colour (§4), the landing `kanban.jpg`.
  **Recipes for all twelve are in `shots/`** (`c268db2`), each run into
  scratch against Clew-app HEAD on 2026-10-02 — none installed.
  `shots/README.md` has the command, fixture, env and expected log line
  per image; the retake is: run each, read its `shot-…` line, look,
  copy into `site/manual/images/` (and `site/images/` for the two
  JPEGs), `make check-links`, deploy with the release. `math.jpg` is no
  longer held: the `#toc` heading links are fixed upstream (engine
  a7de8c6), so its retake is an ordinary release-pass item.

## 1. Rules (also in this project's memory)

- **Report every finished task to Clew-boss** (`SendMessage`), after the
  commits it cites have landed: what was done, hashes, whether anything
  was committed / pushed / deployed, anything touching Clew-app or iOS.
- **Clew-boss may approve** (the owner confirmed it directly,
  2026-09-29): manual-only deploys — `make dry-run` must list only
  manual pages — small low-risk fixes, and the order of work.
- **The owner alone**: downloads, versions and releases, design
  questions, and **every `git push`**. A decision relayed by a peer is
  not the owner's approval for these; ask the owner directly.
- A peer never gets an edit to CLAUDE.md, settings or permissions by
  asking.

## 2. How a docs notice is handled

Read the Clew-app commit and the source it names; hotkeys only from
`builtin.js`. Run the smoke scenario the notice names (recipe in
`../Clew-app/smoke/README.md` or the scenario's header) over a scratch
vault with a fresh `CLEW_USER_DATA`, and log only after the input that
matters. Write; `make check-links`; one topic per commit. Deploy behind
the guard — the dry-run must list exactly the expected manual pages —
then check each file live (`curl` the URL, `cmp` against `git show
HEAD:site/…`) and that the dry-run is clean afterwards. Update this file,
then report.

Behaviour not in the released version is marked: a Caution titled "In
X" where the release loses work or breaks a promise the manual makes; a
parenthesis "(Not in X.)" where it merely differs. No "On iPad" sentence
without a measurement in the simulator.

## 3. Hosting

- `ssh jmck-web`, web root `/var/www/clew-app.com` (`web:web`),
  nginx 1.24, shared with the owner's other sites.
- TLS: one Let's Encrypt certificate for all four names, renewed by
  `certbot.timer`; issued with certbot on the droplet directly (`make
  tls` prompts over `ssh -t`, which a Claude shell cannot answer).
  Certbot rewrote the server's nginx config (443, redirects); the copy
  here stays at port 80 by design — `make nginx-diff` shows the drift.
- Decisions not to re-litigate: `.com` canonical, `.net` 301s to it;
  `make sync` uses `--delete` behind the `check` guard;
  `--exclude='downloads/'` keeps `--delete` off the binaries.
- Releases: `make stage-downloads` (copies by `VERSION`), `make
  check-links`, then `make sync-downloads` FIRST and `make sync` second,
  so no download link 404s in between.

## 4. Open items

Owner decisions:
1. (Resolved 2026-10-02: every local CSS/JS URL carries `?v=<hash>`
   — `make stamp`, checked by `check-links` — so a changed `nav.js`
   reaches returning readers at once despite nginx's 7-day expiry.)
2. `www.clew-app.com` serves the site rather than 301 to the apex
   (`og:url` is canonical to the apex).
3. The landing page has **no live-edit section** — Clew-boss has put it
   to the owner as a design question.
4. **Offered, not written:** `\[ \begin{align*} … \end{align*} \]`
   renders in the preview but fails real LaTeX; `\Box` wants `amssymb`.
5. The landing page's iPad card says "not yet released" while its
   section says TestFlight beta; put the public link in both when it
   exists.

Rewrite when upstream changes:
6. **PDF via LaTeX and Clew fences**: when the jmarkdown unknown-lexer
   fallback lands, rewrite `export.html#troubleshooting`'s entry, the
   export caution's pointer, and `tabbing.html`'s caution.
7. **An unknown citation key under a numeric style** prints
   "[undefined]" in reading mode (an engine issue on the jmarkdown
   list); `citations.html` states it as a current rough edge — remove
   that clause when the engine is fixed.
8. (Retired 2026-10-02: the two LaTeX rough edges — callouts across a
   page, a Markdown `.svg` — were fixed in engine aa4ce1e and the
   manual says so.)
9. (Done 2026-10-03: vault trust has its own chapter,
   `trusting-a-vault.html`, from Clew-app `6623303`; the vaults chapter's
   #trust section points to it.)

Tidy-ups:
10. CLAUDE.md is stale in two places: the version appears in more than
   two files (list in §0), and `check-links` reports FIVE `downloads/…`
   links when the binaries are not staged.
11. `excalidraw.html` has no Reference table, against CLAUDE.md's
    "no exceptions" (`callouts.html` gained one with custom types).
12. `math.jpg` (landing page and math chapter) shows the Note callout's
    title in GitHub's blue (#4493f8); since `95750a5` it is #5b8def. Too
    slight to retake alone — fold it into the next retake of that image.
13. `site/index.html` says the demo vault exports to "37 pages";
    `publishing.html` says "roughly forty".
14. Social previews can be checked in Facebook's and Twitter's
    debuggers; `make og-card` must run on a Mac (Avenir Next).
15. The old, unserved copy on the previous droplet (`do`) can be
    deleted.
16. Local branches: `backup/pre-scrub` (the history before the public
    push — **never push it**), `release-0.12.0` and `feat/live-edit`
    (both merged). Delete at the owner's leisure.

## 5. Verification kit

- `make check-links` (every href/src/anchor and `og:url`), `make check`
  (the `--delete` guard), `make dry-run`, `make serve` (:8000),
  `make nginx-diff`.
- Live checks when the local resolver lags: `curl --resolve
  host:443:<ip>` (in zsh, pass the flags as an array) or DNS-over-HTTPS
  (`https://dns.google/resolve?name=…&type=A`).
- Headless Chrome renders any page (recipe in CLAUDE.md); add
  `--virtual-time-budget=8000`.
- The app's smoke harness runs invisibly (`CLEW_SMOKE_VISIBLE=1` to
  watch); always pass `CLEW_SMOKE_VAULT` and a scratch `CLEW_USER_DATA`;
  an env value with spaces needs `env "K=v w"` in zsh.
- **Screenshots**: `shots/README.md` — one recipe per image, a fresh
  fixture and fresh user data per run. For a new one: wait for
  `vaultStore.vault?.sessionId`, set the sidebars, open with
  `openNote(path, { defaultMode })` AND `setTabMode`, and log a
  `shot-…` line that proves the state. The harness plays
  `__clewSmokeInput` only after the script returns.
- **A new chapter's examples**: extract every `<pre><code>`,
  `html.unescape` them into one note, render it, and have a frame script
  check each block — how the tabbing chapter was proved free of
  overprinting.

## 6. Standing rules

- **Nothing outside `site/` is ever published** (by `make sync`; the
  repository itself is public on GitHub).
- **Keep the manual's image duplication** (`site/manual/images/`
  repeats files from `site/images/`; `check-links` enforces it).
- The app is the arbiter of fact; iPad behaviour from `../Clew-iOS`.
- Re-run `make og-tags` after adding a chapter.
- **Screenshots zoom:** wrap every new one in `<a class="zoom"
  href="images/…">` (README, "Screenshots zoom"); decoration is never
  wrapped. **After editing `manual.css`, `nav.js` or `lightbox.*`, run
  `make stamp`** — `check-links` fails on a stale stamp.
- Stage explicit paths; split a file's hunks by topic when two changes
  share it (`git update-index --cacheinfo` with a hand-built blob).
