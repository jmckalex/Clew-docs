# Handover — 2026-10-01 (site LIVE, serving 0.12.0; `main` ahead of `origin`, unpushed)

Session state and open items. Durable conventions — editing the manual,
the house style, the nginx gotcha — live in **CLAUDE.md**; the layout and
the deploy procedure in **README.md**. Trust both. This file is
rewritten each session; keep it short and current. **This repository is
public**: nothing tracked may hold credentials, login accounts or key
names.

## 0. Resume here

- **Nothing is in flight.** Wait for Clew-boss's next docs notice. The
  manual reflects Clew-app up to **`0f797eb`** — the base hash.
- **Live:** clew-app.com serves **0.12.0** (Clew-app `9268aa3`), pages and
  downloads, deployed 2026-10-01 on the owner's direct go and verified:
  0.12.0 everywhere, the five files 200 at their exact sizes, no 0.11.1
  left in the prose. Everything committed on `main` is deployed
  (`make dry-run` clean).
- **GitHub:** `origin` = https://github.com/jmckalex/Clew-docs (public,
  homepage clew-app.com), `main` only. `main` is **ahead of `origin`,
  unpushed** — pushing needs the owner's explicit OK (§1).
- **Next release** (not scheduled; do not bump the site until Clew-boss
  says a release is done): grep the manual for `0.12.0` — every hit is
  the version or a marker to turn into plain prose. Markers so far, nineteen
  in eight files: `vaults-and-files.html#windows` "(Not in 0.12.0.)"
  (the Window menu, `5119d93`); `navigation.html` sentence and table row
  for ⌘1–⌘9 (`a3bb88c`); two rows in
  `settings-and-hotkeys.html#default-hotkeys`; the citation chip
  (`f17c531`) in `citations.html#library` and `live-edit.html`; Open in
  Default App (`1b98e07`) — `vaults-and-files.html` right-click sentence
  and Reference row, and two in `links-and-embeds.html#external-apps`;
  a `.bib` edit reaching reading mode (`a1d8de0`) and `\fullcite` in live
  edit (`f504e57`), both in `citations.html`; live-edit callouts drawn
  as reading mode (`95750a5`) in `live-edit.html#lines`; a literal
  directive's bracket (`914c3f8`) and the slim mode bar (`b0fe140`) in
  `live-edit.html`, and the mode buttons in
  `settings-and-hotkeys.html#editor-toolbar`; the slash rule and bare
  links (`0f797eb`) in `dialect.html` and `editing.html`. Then the version in its
  places (Makefile `VERSION`, `site/index.html` lead, cards and footer,
  `manual/index.html`, `nav.js`, `getting-started.html`, the README
  example), and the downloads. Prepare it on a branch in its own
  worktree so `main` stays deployable — that is how 0.12.0 was done.

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
1. **`nav.js` is served with a 7-day cache** (pages are `no-cache`), so
   a new chapter or a release's version badge reaches a returning
   visitor's sidebar up to a week late. Fix: a `manual/nav.js` location
   in the nginx config (mind the `add_header` gotcha) or a `?v=` on every
   page's `<script>`.
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
8. **Vault trust** (`vaults-and-files.html#trust`): covers engine note
   code only; the full vault-trust design (Clew-app
   `docs/dev/frame-bridge.md` §4) will change it.

Tidy-ups:
9. CLAUDE.md is stale in two places: the version appears in more than
   two files (list in §0), and `check-links` reports FIVE `downloads/…`
   links when the binaries are not staged.
10. `callouts.html` and `excalidraw.html` have no Reference table,
   against CLAUDE.md's "no exceptions".
11. `math.jpg` (landing page and math chapter) shows the Note callout's
    title in GitHub's blue (#4493f8); since `95750a5` it is #5b8def. Too
    slight to retake alone — fold it into the next retake of that image.
12. **Source-mode screenshots lack the slim mode bar** shown since
    `b0fe140` (cosmetic): `editor-split.png`, `editor-editing.png`,
    `wikilink-completion.png`, `live-preview-pane.png`, `fence-split.png`.
    Retake when one is retaken for another reason.
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
- **Screenshots**: a scratch copy of the vault (`rsync -a --exclude
  .clew/cache --exclude .clew/history`, then delete
  `.clew/workspace.json`), fresh user data, 2560×1700 dark. Wait for
  `vaultStore.vault?.sessionId`, set the sidebars, open with
  `openNote(path, { defaultMode: 'reading' })` AND
  `setTabMode(tab.id, 'reading')`, sleep ~7 s. `kanban-board.png` is
  Clew-app's `smoke/manual/kanban-board.js`; the landing `kanban.jpg` is
  the same with the explorer open and the right sidebar closed, scaled to
  1400 wide; `tabbing.png` is the demo vault's `Guide/Tabbing.md` scrolled
  to "Indenting, and stepping back".
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
- Stage explicit paths; split a file's hunks by topic when two changes
  share it (`git update-index --cacheinfo` with a hand-built blob).
