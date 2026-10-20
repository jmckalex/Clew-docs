# Handover — 2026-10-20 (site LIVE, serving 0.12.0; the seven held branches PUBLISHED 2026-10-15 and pushed; the next five — `held-inline`, `held-titlepage`, `held-liveblocks`, `held-listkeys`, `held-latexstyle` — PUBLISHED 2026-10-20 and pushed; held: `held-tasktoggle`, `held-latextitle`, `held-0120-audit`, `held-nextitem` — the PDF Title item waits for Clew-app's push of `a9284a9`)

Session state and open items. Durable conventions — editing the manual,
the house style, the nginx gotcha — live in **CLAUDE.md**; the layout and
the deploy procedure in **README.md**. Trust both. This file is
rewritten each session; keep it short and current. **This repository is
public**: nothing tracked may hold credentials, login accounts or key
names.

## 0. Resume here

- **Live 2026-10-15 on the owner's yes ("Yes to 2 and 3, push them",
  relayed by Clew-boss, whose session address is now
  `uds:/tmp/cc-socks/49277.sock` after a disruption):** all seven held
  branches merged into main with `--no-ff` — `held-cache` `a362245`,
  `held-figengine` `90d653c`, `held-proof` `1b7aca3`, `held-inserts`
  `3dd9c10`, `held-convert` `2b977f9`, `held-pdfsize` `507d821`,
  `held-postscript` `fc7f39d` (no conflicts; stamp and og-tags
  unchanged; check-links clean). Deployed only after Clew-boss confirmed,
  and I checked by `ls-remote`, Clew-app origin/main `f0aeaa4` (every
  documented hash, `0520b2c` included, an ancestor) and Clew-iOS
  origin/main `c0f2a20` (`52cd16a`, `137932f`, `9b0b67e` ancestors).
  `make dry-run`: manual only, 40 files (the new chapter, `nav.js`, 38
  pages), no deletions; after `make sync` each is 200 and byte-identical
  (sha256). Pushed main `cd1c65a..1599589`, fast-forward, after a
  credentials scan (hits: PDF-password prose only). The HELD entries
  below are history now; their worktrees are removed and their branches
  deleted (`git branch -d`, all merged; Clew-boss approved).
  release-0.12.1 untouched. Clew-boss VERIFIED (origin/main `2925a97`,
  six pages sha256-identical live). Clew-iOS origin/main: `07810a8`.
- **HELD: `held-inline` `bf362de`** (worktree `../Clew-docs-inline`,
  from main `2925a97`): Clew-app `1406ffc` (on origin in `f0aeaa4`;
  Clew-iOS `07810a8` vendors it) — an image within a line is drawn in
  place, two side by side, after text, mid-sentence, at a link's size;
  a note, a PDF or any other file there is still a `!` and a link.
  links-and-embeds' Caution (it said every mid-line `![[…]]` was a `!`
  and a link) and attachments-and-files' Media embed row. Measured on
  the `0520b2c` scratch build (which carries `1406ffc`) and on `9268aa3`:
  0.12.0 makes a mid-line image a `!` and a link too, unless it ends the
  line, when it is drawn below the text as a block (`$SC/inl/`).
  ACCEPTED by Clew-boss; HOLD — Clew-boss is asking the owner (the
  earlier yes covered only the seven branches), and relays the word.
- **HELD (2026-10-19, Clew-boss's request; Clew-boss is now
  `uds:/tmp/cc-socks/1993.sock`): three drafts for Clew-app's UNPUSHED
  local main `1dc5c81`**, each from main `2925a97` in its own worktree;
  publishing waits for the app's push and the owner's word. Measured on
  scratch builds of `1dc5c81` and `9268aa3` (`$SC/tp/`).
  - `held-titlepage` `d8ad312` (`../Clew-docs-titlepage`): dialect
    `#title-page` and a Reference row — `e4667a9`'s reading-view sizes.
  - `held-liveblocks` `96102b6` (`../Clew-docs-liveblocks`): live-edit
    `#lines` — the title block (`p#title-page`), quotes in reading view's
    grey, a quote in a list item under its text; `:today`'s chip.
  - `held-listkeys` `dd2465c` (`../Clew-docs-listkeys`): editing
    `#lists` (new), live-edit `#list-paragraphs` and Reference, the
    hotkey table — `a7baa98`. **BLOCKED on the app:** on `1dc5c81`
    itself Enter on an item's first line still starts a new item
    (lang-markdown's own keymap, Prec.high, runs before `listEnter`); the
    Enter text was measured with `markdown({ addKeymap: false })` in the
    scratch copy. Re-measure on the app's fix.
  All four held branches merge pairwise clean. Clew-boss VERIFIED all
  three: `held-titlepage` and `held-liveblocks` ACCEPTED and HELD (the
  "Lines" placement, the extras and the empty-item wording kept);
  `held-listkeys` re-measured on Clew-app's fix `dc2ed22` (local main,
  not pushed): first-line Enter stays in the item; the empty-item
  sentence corrected (Enter twice, once in a loose list) — now
  `ae1e892`. Clew-boss VERIFIED: all three ACCEPTED and HELD
  (`d8ad312`, `96102b6`, `ae1e892`); Clew-boss is asking the owner.
  Publishing needs `dc2ed22` on Clew-app origin and the owner's word.
- **HELD (2026-10-19, Clew-boss's request): `held-latexstyle` `ac721a9`**
  (`../Clew-docs-latexstyle`, from main `2925a97`) for Clew-app's
  UNPUSHED local main `963b2bd` (`3bfc0b6` Clew's LaTeX export style +
  the old-TeX guard): export `#latex-style` (new h3 under
  `#config-cascade`), mentions in `#one-source`, the cascade sentence and
  `#latex-engine`, a Troubleshooting entry, a Reference row; settings
  page dt `latexExportStyle` and the app-global keys row. Measured
  through the app on scratch `963b2bd` (`$SC/tp/applx2`, `run2.sh`,
  `lx-*.js`, HOME of its own; 0.12.0 on `app012`): the setting is in
  Settings → APPEARANCE (no Export section — the guide says Export); a
  note header's `Lang` does not move the paper or hyphenation (only a
  config's `Lang` or the locale); a header's `Class options: 11pt`
  prints on Letter. Not drafted, by Clew-boss's word: the title block.
  Publishing needs `963b2bd` on Clew-app origin and the owner's word.
  Clew-boss: HELD, NOT yet accepted — a header's `Lang` and `LaTeX
  engine` being ignored went back to Clew-app as regressions (with the
  Settings → Appearance location and Export.md's hyphenation words);
  "11pt alone → Letter" is Clew-app's call. Keep the settings dt/dd.
  Re-measure on Clew-app's fixing commit (Clew-boss sends the hash) and
  re-word the header/`Lang` passages (`#latex-style` ¶1–2) to match.
  DONE: re-measured on Clew-app `41f8713` (local main, 10 over origin
  `f0aeaa4`, not pushed; `$SC/tp/applx3`, `lx3-*.js`, `bk2-scenario.js`)
  — now `bcb48bc`: the header's `Lang` → babel hyphenation and the
  region's paper; a header's `LaTeX engine: pdflatex` → no style; `11pt`
  alone → the region's paper (Letter still if a `Geometry` is set too —
  said in one clause). Publishing needs `41f8713` on Clew-app origin.
  Clew-boss VERIFIED: ACCEPTED and HELD (the Geometry clause kept).
- **Live 2026-10-20 on the owner's word ("Yes, please publish the
  docs.", relayed by Clew-boss):** the five held branches merged into
  main with `--no-ff` — `held-inline` `614b588`, `held-titlepage`
  `d174486`, `held-liveblocks` `244b20d`, `held-listkeys` `cab3e73`,
  `held-latexstyle` `e7961d8` (no conflicts; the two auto-merged pages,
  live-edit and settings-and-hotkeys, keep every added line; stamp and
  og-tags unchanged; check-links clean). `make sync` sent exactly seven
  pages — attachments-and-files, dialect, editing, export,
  links-and-embeds, live-edit, settings-and-hotkeys — each 200 and
  sha256-identical live. Credentials scan clean; main pushed
  fast-forward to `1357bba`; Clew-boss VERIFIED it. Housekeeping done on
  Clew-boss's approval: the five worktrees removed and the branches
  deleted (`git branch -d`); only `release-0.12.1` remains.
- **HELD, drafted 2026-10-20 on Clew-boss's notice:** `held-tasktoggle`
  `e4f0a51` (worktree `../Clew-docs-tasktoggle`, from `1357bba`) — ⌘L
  as Obsidian's Toggle checkbox status (Clew-app `8408d73`, `0ada21d`,
  on origin): editing.html #lists (own paragraph) and its Reference row,
  live-edit.html's and settings-and-hotkeys.html's ⌘L rows. Measured by
  real ⌘L, live and source, on `$SC/tp/applx4` (`0ada21d`;
  `tl-scenario.js`, `tl-source.js`): every case as Clew-boss gave it,
  plus `1)` kept, indentation kept, `*strong*` at a line start is text,
  a bare `-` → `- [ ] `, a selection ending at a line's start leaves
  that line. Clew-boss REVIEWED it; one wording fix (each example its
  "becomes") → `ad50f6b`. HOLD: Clew-boss will ask the owner to publish
  it together with the iPad Next item text (after the iOS sync) and a
  LaTeX title-page change Clew-app is building (notice to follow), or
  sooner if the owner says.
- **HELD, drafted 2026-10-20 on Clew-boss's notice:** `held-latextitle`
  `3ba2836` (`961253c` + a 0.12.0 correction; worktree
  `../Clew-docs-latextitle`, from `1357bba`) — the
  title block as LaTeX's own title (Clew-app `0038ec3`, `5c6caae`,
  LOCAL, not pushed: publishing needs both on origin). export.html new
  `#latex-title` h3 after `#latex-style`, the one-source LaTeX bullet,
  a Reference fact row; dialect.html #title-page one sentence; books.html
  #master's prelude bullet. Measured on `$SC/tp/applx5` (`5c6caae`;
  `tt-scenario.js`, `tt-few.js`, `tt-begin.js`, `tt-book.js`, book
  vaults `bkv-tta`, `bkv-ttb`) and 0.12.0 (`app012v`, its own engine
  `82b21fd`: a LaTeX export writes the block as `<div class="title">`
  HTML, printed in the PDF; a header Title prints today's date). The `%`
  URL fix is not mentioned (export.html lists no known limits). Merges
  clean with `held-tasktoggle`. Publish together with it and the iPad
  Next item. `0038ec3` and `5c6caae` are ON ORIGIN now (Clew-app
  origin/main `0e773c3`, ls-remote 2026-10-20). **+ `9640259`
  (Clew-boss's GO, 2026-10-20):** a title block's title is the PDF's
  Title where the header names none (Clew-app `a9284a9`, jmarkdown
  `ba83371`, LOCAL — publishing needs it on origin): export.html
  #latex-title a new paragraph, the maketitle-false clause, the 0.12.0
  parenthesis, the Reference row; dialect.html #title-page and books.html
  #master one clause each. Measured on `$SC/tp/appatv` (`a9284a9`, own
  vendor; `pt-scenario.js`, `pt-markup.js`, `pt-lower.js`, `pt-book.js`
  over `bkv-tta`/`ttb`/`ptc`/`ptd`/`pte`; pdfinfo) and 0.12.0
  (`pt012.js`: only a header Title names the PDF). A lowercase `title:`
  header names nothing, in a note or a book master.
- **SCRATCH-BUILD TRAP (Clew-boss, 2026-10-20):** Clew-app's
  `node_modules/jmarkdown` is a symlink to `../vendor/jmarkdown`, so a
  scratch build that links `node_modules` whole runs the LIVE Clew-app
  tree's engine. Every older-build ENGINE measurement before today used
  whatever vendor Clew-app had then (app-side claims are fine). Build with
  a per-build `node_modules` link farm, `jmarkdown` pointing at the
  build's own vendor (memory: scratch-builds-own-engine). Open question
  put to Clew-boss: audit the live manual's engine-side "(in 0.12.0 …)"
  claims (184 mentions of 0.12.0, most app-side) on a correct 0.12.0
  build? Spot-checked so far: dialect.html's "In 0.12.0 all five are
  plain body text" (reading mode) holds. The figure engine has the same
  trap: a dev run reads `CLEW_MPTIKZ_DIR`, else the LIVE
  `~/Source/mp-tikz-wasm/dist`; pin an old build's with the release its
  `src/shared/mptikz-manifest.json` names (0.12.0: v0.3.0, sha256
  `4a3a61b3…`, in `$SC/dl/mptikz030`).
- **HELD, the 0.12.0 audit (Clew-boss approved 2026-10-20):**
  `held-0120-audit` `a351ee7` (worktree `../Clew-docs-0120audit`, from
  `1357bba`). The 184 "0.12.0" mentions sorted; every engine-side one
  re-measured on `app012v` (engine `82b21fd`) with mp-tikz-wasm 0.3.0
  (`aud-x.js`, `aud-r.js` + `aud-frame.js`, `aud-u2.js`, `run3.sh`;
  vault files in `$SC/tp/aud/`). Wrong, fixed: a Clew fence does not stop
  0.12.0's compile — `<MINTED>` in the PDF, no warning (export.html ×2,
  tabbing.html); an untitled `ad-` fence is headed by its type's title,
  not unheaded (callouts.html ×2); 0.12.0 already numbered a footnote's
  label (math-and-theorems.html). Added: a bare address's `%` in 0.12.0's
  LaTeX (dialect.html, the page on 0.12.0's URL handling). Everything
  else engine-side held. Merges clean with `held-tasktoggle`,
  `held-latextitle` and `held-nextitem`. Clew-boss ACCEPTED it; all three held for the
  combined publish (after Clew-app's push of `0038ec3`/`5c6caae` and the
  iOS sync for the Next item text).
- **CURRENT-BUILD findings, with Clew-app as small fixes (don't draft;
  Clew-boss sends a notice if the manual must change):** (1) a
  note whose first line starts `word(s):` ("Note: …", "Visit https://…")
  exports EMPTY (HTML, LaTeX, PDF), 0.12.0 and 5c6caae alike: the
  engine's bare-key header runs to a `---` that never comes; Clew sets
  `Header style: fenced` for the preview (render-service.js) but not for
  exports. (2) A note citing only the vault-wide bibliography, with no
  `Resolve citations` of its own, exports HTML with `\cite{…}`
  unresolved (export.js passes the file, not resolution), against
  citations.html's "HTML, LaTeX and PDF exports use the same files".
  Release-notes candidates (0.12.0 faults): the `%` URL; a Clew fence as
  `<MINTED>`. Clew-app `cdde7df` (on origin) fixes both (1) and (2);
  `afbf933` makes an HTML export cite in the vault's style. No notice
  from Clew-boss yet; nothing drafted.
- **`%` FINDINGS (reported to Clew-boss 2026-10-20, don't draft):** the
  engine never escapes `%` in LaTeX. A body title block with `%` makes
  PDF via LaTeX FAIL on `a9284a9` ("File ended while scanning use of
  \kvsetkeys": `pdftitle={Up 50% Today}`), where `5c6caae` made the PDF
  with "Up 50" (a regression from the PDF Title). A header Title with `%`
  fails the same way on 0.12.0, `5c6caae` and `a9284a9`. Prose "It rose
  by 50% today." prints "It rose by 50" in every LaTeX PDF; HTML keeps it
  in a note with no header, but in a note with a header HTML also cuts
  at the `%` (`<!-- Markdown source commented out -->`). `pt-pct.js`,
  `pt-pcthtml.js`.
- **HELD, drafted 2026-10-20 on Clew-boss's notice (Clew-iOS origin/main
  `b1443f4`, the sync to Clew-app `0ada21d`):** `held-nextitem`
  `097f45b` (worktree `../Clew-docs-nextitem`, from `held-tasktoggle`
  `ad50f6b`, so it carries ⌘L too). `29c51bc`: editing.html #lists ends
  with an On iPad callout — the list keys the same with a hardware
  keyboard, Return as Enter, the toolbar's **Next list item** (Clew-app
  `7eae0d0`: Lists group after Task list, ⌘Enter's command, greyed out
  outside a list, never on a Mac), "checked only in the simulator, not
  yet on a device" (Clew-boss's ask) — its Reference row; live-edit.html's
  toolbar paragraph and Reference row. `097f45b`: settings' On iPad
  callout names the three Appearance rows the iPad lacks (LaTeX engine,
  the LaTeX export style — dropped at `b1443f4` — and the exports'
  figure engine; Clew-iOS scripts/build.js, tests/no-latex-ui.test.js);
  "everything else is the same" had been wrong since earlier syncs. From
  Clew-iOS's simulator record (UPSTREAM-0ADA21D-PLAN.md). The manual's
  iPad shots show no editor toolbar; none taken.
- **(Done 2026-10-20, above.) ALL FIVE HELD BRANCHES now wait ONLY for the owner's publish word**
  (2026-10-19): `held-inline` `bf362de`, `held-titlepage` `d8ad312`,
  `held-liveblocks` `96102b6`, `held-listkeys` `ae1e892`,
  `held-latexstyle` `bcb48bc`. Clew-app origin/main is `41f8713` (pushed
  on the owner's word; `ls-remote` checked: `1406ffc`, `dc2ed22`,
  `41f8713` all ancestors). Clew-boss sends the GO: merge all five
  (`--no-ff`), check-links, stamp, og-tags, dry-run, `make sync`,
  byte-check, credentials scan, push main (fast-forward), and report the
  live pages so Clew-boss can byte-check them.
- **OWNER DIRECTIVE (2026-10-11, via Clew-boss): the colon-directive
  work first.** Done on the docs side: phases 1 and 2 drafted and
  verified (`held-inserts`, `held-convert`). Clew-boss then lifts the
  freeze and restarts the parked work in the agreed order — Clew-iOS,
  jmarkdown's figure-engine queue, Clew-app step C, then Docs fourth.
  Until Clew-boss comes back to Docs, every held branch stays as it is:
  no deploys, no new drafting. (2026-10-15: Clew-boss asked for two new
  held items, `held-pdfsize` and `held-figengine`, below; both accepted.
  Every held branch deploys with Clew-app's push, on the owner's word,
  which Clew-boss has asked for. Then the owner decided Q4 — a restricted
  vault refuses PDF via LaTeX — and `held-figengine` `90d653c` and
  `held-proof` `1b7aca3` say it as Clew-app `0520b2c` does, measured,
  below; both ACCEPTED. Clew-boss puts publishing to the owner together
  with the push of `0520b2c`: on the owner's yes, deploy only after
  Clew-boss confirms `0520b2c` is on origin/main.)
- **Published 2026-10-15 (was HELD): `held-inserts` `3dd9c10`** (worktree `../Clew-docs-inserts`,
  from main): colon retirement phase 1, against Clew-app `97d7f0d`
  (`42d6930`, `acd9c27`, `bbde7fc`, `97d7f0d`; local). editing#formatting
  (the Format menu writes `@begin(name)` … `@end(name)`, `@today`, the
  generic `@begin(<name>)`; Insert environment… the numbered
  `@begin(theorem)`) and live-edit (game, Mathematica, markdown-demo
  framed in either spelling; `@begin(HTML)` marked HTML only), with 0.12.0
  markers. Colon examples elsewhere stay until phase 3; no screenshots
  yet. Not documented, nothing to change: `42d6930` reads
  `@begin(<figure>)`/`@begin(.lemma)` as numbered (the manual never
  mentions the sigils). Deploys after Clew-app's push, on the owner's
  word. Merges cleanly with the three frozen branches. Verified by
  Clew-boss. Next: phase 2's pages ("Convert this vault") when Clew-app
  builds it.
- **Published 2026-10-15 (was HELD): `held-convert` `2b977f9`** (worktree `../Clew-docs-convert`,
  from `held-inserts` `3dd9c10`, so it carries phase 1 too): colon
  retirement phase 2, against Clew-app `0aebcf8` (local; `65ef069`,
  `fcc7faf`, `ae6787e`). New chapter `converting-colon-directives.html`
  after the dialect (nav.js, the contents card, og-tags, every page
  restamped for nav.js): File → Convert Colon Directives… / Undo Colon
  Conversion… (palette too), the dry run, the five groups, the default
  button, the output changes, notes that load directives and Convert
  anyway, the safeguards, Undo; "(Not in 0.12.0.)"; nothing on the iPad
  (no measurement) or on when the colon forms stop working ("still work
  today"). Pointers from dialect#blocks (+ see-also), editing#formatting,
  math-and-theorems#what-numbers, trusting-a-vault#restricted. Measured
  on a scratch build (`$SC/convert/`: make-fixture.mjs, sheet-, editor-,
  envs-, latex-scenario.js). Merges cleanly with main and the three
  frozen branches. `03ea0cf` VERIFIED by Clew-boss (placement approved);
  `2b977f9` adds its one requested sentence (a TeX block's LaTeX: line
  break, same paragraph, `\par` for a new one; measured), VERIFIED by
  Clew-boss too; the freeze has lifted (Docs fourth). Deploys with
  `held-inserts`, after Clew-app's push, on the owner's word.
- **Published 2026-10-15 (was HELD): `held-pdfsize` `507d821`** (worktree `../Clew-docs-pdfsize`,
  from main `e4e7024`): a PDF embed one page tall at fit width, sizes in
  the link — the owner's report (a sliver in live edit), Clew-app `2e80ff4`
  (`ed6ffb0`; local) and Clew-iOS `9b0b67e` (pushed).
  attachments-and-files#pdfs and the new #pdf-sizes; links-and-embeds
  (media bullet, #sizes, two reference rows). Written as measured, two
  shortfalls included: ⟷ in live edit widens only to the column (its
  frame is no wider), and `#page=N` changes nothing (page 1, as in
  0.12.0) — the latter replaced in `5726d80` (Clew-app `f47ae05`:
  `c7417b9`, `f47ae05`, the owner's yes): `#page=3` opens at page 3's
  top, with sizes or alone, past the end the last page, the title opens
  the tab there; a broken or locked PDF's box as tall as EmbedPDF's card
  at any width. One iPad sentence, from Clew-iOS 9b0b67e's simulator
  measurement (sizes only). 0.12.0 markers measured on `9268aa3`
  (`$SC/pdfsize/`: Clew-app's pdf-size-scenario, extra-, open-,
  wide-width-scenario.js). No screenshot. Merges cleanly with the five
  other held branches (release-0.12.1: stamp lines only, as main).
  ACCEPTED by Clew-boss (no screenshot for now); HOLD, deploys with the
  other held items on the owner's word. The shortfalls are routed: ⟷ in
  live edit to Clew-app (after its current work), `#page=N` to the owner
  as a feature question (answered yes: `5726d80`, ACCEPTED by Clew-boss;
  HOLD with the rest); ⟷ answered too: Clew-app `a7b9940` draws it in
  reading view only, and `507d821` says so (live edit keeps the column's
  width; 0.12.0's live edit showed a ⟷); ACCEPTED by Clew-boss, HOLD.
- **Published 2026-10-15 (was HELD): `held-figengine` `90d653c`** (worktree `../Clew-docs-figengine`,
  from `held-cache` `a362245` — merge it after, or with, `held-cache`):
  step C, exports draw TikZ and MetaPost with Clew's built-in TeX by
  default (the owner's yes), Clew-app `73f92eb` (`2cc6d89`, `320b310`,
  `3267bf5`, `b7ad70a`; local). diagrams#export-figures (new) and
  #export's first two paragraphs, two reference rows;
  export#pdf-toolchain and a reference row; trusting-a-vault#restricted;
  settings-and-hotkeys (entry, app-global key). Written as measured:
  in a restricted vault a figure the built-in TeX fails on is TeX's error
  box (no warning), and "[TiKZ figure not drawn]" only when it cannot run
  at all; a restricted PDF via LaTeX still compiles TikZ with the user's
  TeX. Item 5 (dev builds' pinned `'external'`) left out: 0.12.0 never had
  the key. 0.12.0 markers measured on `9268aa3`. Scratch: `$SC/stepc/`.
  Merges cleanly with every held branch and main. ACCEPTED by Clew-boss;
  HOLD, deploys after or with `held-cache`, with Clew-app's push, on the
  owner's word. Findings routed: Clew-app to make its Settings hint true
  (HTML and LaTeX only); refusing a PDF via LaTeX in untrusted vaults is
  the owner's open question (Clew-boss says which sentence changes if so);
  "mp-tikz-wasm" in the warnings is an engine-wording candidate — keep the
  bridging sentence until it changes. `82508ea` follows Clew-app
  `72af6a2`'s corrected hint: four sentences now say a restricted vault's
  HTML and LaTeX exports (a PDF via LaTeX is still the installation's);
  ACCEPTED by Clew-boss, HOLD. If the owner refuses PDF via LaTeX in
  untrusted vaults, four sentences change (Clew-boss has the list):
  settings-and-hotkeys' entry, the end of diagrams#export-figures'
  restricted paragraph, export's reference row, trusting-a-vault#restricted.
  `3e7c15a` (Clew-app `1a5ab6e`): a family a figure names is handed over
  whole from this computer's fonts, restricted vaults too; a family it
  lacks or one over 64 MB falls back; "reads nothing on your disk but the
  fonts Clew hands it". ACCEPTED by Clew-boss; HOLD.
  `90db69b`: the owner decided Q4 (2026-10-15, via Clew-boss): a
  restricted vault refuses PDF via LaTeX by name — a note's, a book's, a
  chapter proof — offering the reading-view PDF or trusting the vault;
  HTML and LaTeX exports stay. Drafted from the decision, before Clew-app's
  `refuse-latex-pdf` branch has the refusal (not measured): the four
  sentences above, plus export#config-cascade's exception paragraph and
  books#build's restricted bullet and Build row. When Clew-boss sends the
  refusal's exact text and the new Settings hint, align the wording,
  measure on a scratch build. ACCEPTED by Clew-boss, extras included;
  HOLD. `90d653c` aligns it to Clew-app `refuse-latex-pdf` `0520b2c`
  (held; lands on local main after dev.12), measured on a scratch build
  (`$SC/lpr/`: Clew-app's latex-pdf-refusal-scenario restricted and
  trusted; panel-scenario.js — the Book panel's PDF and Proof buttons
  still shown, a real click → the refusal for 12 s, nothing built; Print
  PDF, LaTeX, HTML build; the Settings hint verbatim; `clew export --pdf`
  exit 1 with the note's words, `--html`/`--latex` exit 0; rc-scenario.js
  — planted latexmkrc files: only HOME's runs). Pages: the Settings entry
  (the new hint), diagrams, trusting-a-vault, export (#config-cascade,
  #pdf-toolchain's new latexmk/biber line with a 0.12.0 marker measured on
  `9268aa3` — it compiles where the PDF is saved and a latexmkrc there
  ran; the refusal quoted under #troubleshooting), books#build (the panel's
  **Print PDF**), command-line (`--pdf` refused, exit 1; deep links only
  open, nothing to say). Nothing written about the hole. ACCEPTED by
  Clew-boss (the troubleshooting quote and the hint checked against
  `0520b2c`; the system-wide latexmk file and "where you save the PDF"
  kept); HOLD until `0520b2c` is on origin/main and the owner says yes.
- **Live 2026-10-06 on the owner's OK ("OK books", via Clew-boss):** the
  chapter *Books* (`books.html`), merged from `held-books` (`427dde2`)
  and corrected (`b25d3da`): a `[[link]]` to a chapter is a link in a
  build, images are chapter-relative, and the iPad lines are dropped
  (Clew-iOS's sync brings a Book panel with Build refused; write the
  iPad text from Clew-boss's parity notice, measured). Rechecked
  against Clew-app `3d39952`: book-export-scenario, both cases, as its
  README records. 39 files live (every manual page restamped for
  nav.js), each 200 and byte-identical. No held branches remain.
- **Live 2026-10-10 on the owner's "Please push!" (via Clew-boss): book
  mode phase 2 and the print PDF** (`held-books2` `e72bb96`, merged
  `d80b1ad`; Clew-app pushed at `416c031`): books#writing, #build (Print
  PDF), the iPad callout; math-and-theorems (`:::` kinds unnumbered, the
  book exception); pointers in live-edit, citations (and chips follow an
  edited style), export#where. Five pages, each 200 and byte-identical.
  No held branches remain.
- **Published 2026-10-15 (was HELD): `held-postscript` `fc7f39d`** (worktree
  `../Clew-docs-postscript`; draft `870b7df`, iPad lines `fc7f39d`):
  diagrams#postscript and #system-fonts (new, with an On iPad callout),
  the complete-document paragraph, the toolchain and its On iPad,
  reference rows; publishing#figures. Against Clew-app `postscript`
  `5a976d1`, merged as `e00dabe`, pinned to the published 0.4.0 at
  `fa78cc0`; figure code unchanged through `d4eae20`. The iPad text is
  from Clew-iOS's sync build `137932f` in the simulator (relayed by
  Clew-boss 2026-10-10): PostScript 4/4, gs.wasm only where needed,
  families from iPadOS's installed fonts (the set and its limits are in
  the commit). **Deploys only when Clew-app's push AND the Clew-iOS
  build carrying this are on GitHub (Clew-boss says when), then on the
  owner's word.** Recheck against both hashes first.
- **Published 2026-10-15 (was HELD): `held-cache` `a362245`** (worktree `../Clew-docs-cache`),
  drafted 2026-10-10 on Clew-boss's notice, against Clew-app `d4eae20`
  (local) and `478cfdf`: export#figures-folder (new; the cache outside
  the vault, `<name>-figures/` beside the file, the Trash rule, a user's
  folder, 500 MB, restricted keeps none), the PDF alone (and the Tip),
  diagrams#caching/#export, books#build, command-line, trusting-a-vault,
  live-edit#frames (a block reading the note's own fields follows its
  front matter). Measured on a scratch build (the commit lists it).
  Deploys with Clew-app's push, on the owner's word. Merges cleanly with
  `held-postscript` (`git merge-tree`). The demo Dashboards chart
  (`4f6a706`) appears on no manual page or screenshot: nothing to change.
- **Published 2026-10-15 (was HELD): `held-proof` `1b7aca3`** (worktree `../Clew-docs-proof`),
  branched from `held-cache` (merge it after, or with, `held-cache`):
  books#build (a .tex per chapter for the PDF) and books#proof (Proof
  This Chapter), reference rows, export#where. Against Clew-app
  `235b27a` (`ef22b0b`), measured on a scratch build (the commit lists
  it). The iPad (`b547a52`): Clew-iOS synced to Clew-app `f959799`
  (verified by Clew-boss, not yet pushed) offers no Proof row or palette
  command and refuses a stray request; the books callout and the Not yet
  row say proofing stays on the desktop ("desktop", not "Mac": Clew
  ships for Windows and Linux too; Clew-boss confirmed). Deploys only
  when Clew-app's push AND Clew-iOS `52cd16a` are on GitHub, then on the
  owner's word; byte-check each page against the pushed hashes.
  `6081075`: a restricted vault refuses a proof (the Q4 decision; the
  proof bullet and its reference row); merges cleanly with `90db69b`.
  ACCEPTED by Clew-boss, HOLD. `1b7aca3` (Clew-app `0520b2c`, measured):
  the Proof row stays, a proof builds nothing, and its notice offers only
  trusting the vault. Merges cleanly with `90d653c`. ACCEPTED by
  Clew-boss; HOLD.
- **WAITING: jmarkdown retires the colon directives** (`:name[…]`,
  `::name[…]`, `:::name … :::` → `@name`, `@name+`, `@begin/@end`;
  branch `retire-colon-directives` in jmarkdown, owner's decision, not
  landed). Change nothing until it lands and Clew-app follows. Then:
  convert diagrams (11), dialect (9), editing (7), live-edit (2),
  math-and-theorems (2), export (1) and trusting-a-vault (1), rewording
  diagrams.html:303 and dialect.html:307 rather than respelling them;
  re-capture `editor-split.png`, `editor-editing.png` and
  `fence-split.png` (the only screenshots showing `:::`) from the
  converted demo vault, only after Clew-app has changed. Confirmed by
  Clew-boss at jmarkdown `21dee42`: `:::theorem` is unnumbered (ref ??),
  `@begin(theorem)` numbered, so the conversion changes output there;
  math-and-theorems.html:216-220 follows whatever the engine settles on.
- **Settled (Clew-boss, 2026-10-10):** no "In 0.12.0" line for the
  `:target` export crash (`e8fdad2` fixes it; 0.12.0's engine stops a
  note's export on `:target` with no `[…]`). Narrow; the fix ships next.
- **Live 2026-10-10:** apps on the iPad (`d85e186`): secrets in the
  Keychain, grants arriving live; the callout lists no differences.
- **Live 2026-10-07: app secrets** (`held-secrets` `a15b065`, merged
  `b8065d8`): apps-in-notes#secrets and trusting-a-vault#trusted-vaults
  for Clew-app `0cc8547`/`bd71168`, rechecked at `e430bed`
  (app-secrets-scenario unchanged). Settings shows no secrets count
  (`clew-settings-view.js` does not draw `APPS_LIST`'s); write one only
  if Clew-app adds it. `93912fa`/`e430bed` (a manifest asking only for
  more prompts without a reload) needed no text: #prompt already says
  so.
- **Live 2026-10-07 (manual-only, Clew-boss's go): the iPad at Clew-iOS
  `3947dd7`** (= Clew-app `cbfa692`; simulator-measured by Clew-iOS):
  books#not-yet On iPad (`ab20dc9`), getting-started#example-vaults
  (`24f7a53`), apps-in-notes On iPad after #network-hosts (`1c3be22`).
  Left out on purpose: live edit's "(1)(1)" equation and the task
  list's 4 px offset (no iPad section there; both fixed at the next
  sync). The apps callout was rewritten at Clew-iOS `94f0571`.
- **Live 2026-10-06, on Clew-boss's go (manual-only):**
  the three held branches merged (`d3f8046` demo update, `2313d85` live
  lists, `b44cdb2` export links), then `026384e` (an embed's `|size`,
  relative paths, `![[Note]]` as its name), `c2c9b11` (Mermaid and
  MetaPost figures in a LaTeX export, diagrams#export) and `9817abc`
  (0.12.0's list-item `&`/`#` and diagram errors, folded into
  export.html's "In 0.12.0" caution; measured on 0.12.0's engine: the
  PDF is still made, every code span prints `<MINTED>`). Four pages,
  each 200 and byte-identical.
- **Live 2026-10-05:** origin-bound network grants (`e9f3d35`,
  apps-in-notes#network-hosts, Clew-app `917303b`).
- **Live 2026-10-05 on the owner's OK:** the chapter "Links and the
  command line" (`command-line.html`), merged from `cli-chapter`
  (`2d105cb`), 38 files, each verified 200 and byte-identical, the ticker
  text (`7063fe7`) with it on the owner's choice; `main` pushed at
  `2d105cb`.
- **Deployed 2026-10-04, each verified byte-identical live:** PDF
  conflicts (`4de7ec4`), the device in the trust button (`9137dd7`),
  untitled admonition headings (`61f6507`), apps in live edit, prompts
  that focus the question and the App Gallery (`a5489ed`), pinned apps
  (`054a6f4`), the demo vault gaining new notes on upgrade (`eb17415`).
- **Base hash:** the manual reflects Clew-app up to **`416c031`**
  (book mode phase 2, the print PDF and app secrets included), and
  since 2026-10-15 every feature the seven published branches name, up
  to `0520b2c` on origin/main `f0aeaa4`. Not yet reviewed for the
  manual: none — `1406ffc` is `held-inline`; `c2c3fb4`, `ef5f7f2` and
  `f0aeaa4` need no text (Clew-boss). Undocumented on purpose: re-vendors, smoke-only
  commits, `ef8577e` (markup in code is text; no notice came),
  `038ec6f` (needs no text), `6ab62ae` (latexmk `-g`: fixes a freshness
  check 0.12.0 never had) `cbfa692` (mp-tikz 0.3.1, nothing visible) and `3d39952` (an
  equation's number once in live edit; the manual never said twice).
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
  owner's direct go), each verified byte-identical live. On 2026-10-15
  the seven held branches (above), manual only, byte-identical live.
- **GitHub:** `origin` = https://github.com/jmckalex/Clew-docs (public,
  homepage clew-app.com), `main` only. Pushed through the commit that
  records this push (2026-10-06, "authorise pushes", relayed by
  Clew-boss and confirmed by the owner here; `5c8232e` earlier that day;
  2026-10-15 `1599589` and the commit that records it, on the owner's
  yes relayed by Clew-boss); anything later is unpushed — every push needs the owner's explicit OK
  (§1).
- **Next release** (not scheduled; do not bump the site until Clew-boss
  says a release is done): grep the manual for `0.12.0` — 74 hits in
  19 files besides the version pages (2026-10-03). Each is a marker: a
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
  write the date line and add anything landed since `4921cc1` (the
  branch last merged `main` at `4138f94`, PDF quoting included),
  merge into `main`, and run `make stamp` — the merge conflicts on the
  `?v=` stamps only, and restamping is the resolution (done once already).
  Tabbing is deliberately absent: it predates 0.12.0.
- **Release checklist — the update feed** (Clew-app's update check reads
  `https://clew-app.com/downloads/latest.json` daily): (1) `make
  stage-downloads`; (2) in Clew-app, `node scripts/write-latest-json.mjs
  out --released <date> --out <Clew-docs>/site/downloads/latest.json`
  (notes default to `whats-new.html#v<x-y-z>`, which the release branch
  has); (3) once, with the owner's OK: put the `location =
  /downloads/latest.json { expires -1; }` block from
  `clew-app.com.nginx.conf` into the droplet's certbot-rewritten config
  (`make nginx-diff`), `nginx -t`, reload; (4) `make sync-downloads` (it
  skips latest.json), `make sync`, then **`make sync-feed` LAST**; check
  it is `Cache-Control: no-cache`, `application/json`.
- **Release grep caveat:** `getting-started.html` carries the version
  filenames AND a marker (`#updates`, "Not in 0.12.0: there, watch the
  download page") — bump the filenames, delete the marker; never a blind
  replace.
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
  `math.jpg`'s Note title colour (§4), the landing `kanban.jpg`. The
  thin bar along a live-edit frame's top (gone in Clew-app `4a5a60a`)
  appears in no current shot — it showed only on hover, and no recipe
  hovers a frame; a new shot of the `</>` Edit source icon would be the
  release pass's to add, not a retake.
  **Retaken for review 2026-10-04** from Clew-app `5268224` into the
  session scratch folder `release-shots/` (`out/`, `INDEX.md`, a
  side-by-side `INDEX.html`): every image, plus the new
  `live-edit-source-icon.png` for live-edit#frames. trust-prompt and
  trust-restricted came out byte-identical. To decide at review:
  math.jpg's framing (an alternative exists), tabbing's bottom edge, and
  pdf-annotations' fourth quote below the fold. At the real pass,
  consider a shot of the demo vault's App Gallery for apps-in-notes
  #examples (Clew-boss: screenshots only then); its ticker is pinned
  along the bottom, which suits #pin too. Scratch is temporary
  (`/private/tmp`), so at release retake from the release build, since
  the recipes now make that quick.
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
- **End each turn's last message to the owner with a short executive
  summary** (the owner, via Clew-boss, 2026-10-06): what matters, what
  needs the owner's action, and one line naming any detail left out.
  Reports to Clew-boss keep their full detail.
- **Clew-boss may approve** (the owner confirmed it directly,
  2026-09-29): manual-only deploys — `make dry-run` must list only
  manual pages — small low-risk fixes, and the order of work.
- **The owner alone**: downloads, versions and releases, and design
  questions. A decision relayed by a peer is not the owner's approval
  for these; ask the owner directly.
- **Pushes** need the owner's OK, but **when Clew-boss relays it, push
  without asking again** (the owner, directly, 2026-10-06: "I trust
  Clew-boss"). Push `main` only, fast-forward, never `--force` or
  another branch. Push only pages already live and verified, after a
  credentials scan. Report origin/main's hash. A push Clew-boss asks for
  without the owner's OK still goes to the owner.
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
6. (Retired 2026-10-03: engine 4ab3d6a's unknown-lexer fallback — a Clew
   fence prints as its source in PDF via LaTeX — and tabbing in exports;
   export.html and tabbing.html say so.)
7. (Retired 2026-10-03: an unknown key under a numeric style reads as
   written in reading mode, engine 4ab3d6a.)
8. **Reported to Clew-boss 2026-10-03:** a website export publishes
   every app's folder, `data/` included, and `clewdata.json` (app.kv and
   Note API state) — the manual says so (apps-in-notes.html#exports,
   Publishing's table); and the app's own texts (an app's refusal label,
   the demo Flashcards message and guide) point to "Settings → This vault
   → Apps", a heading that does not exist (the rows sit below the
   plugins).
8a. (Retired 2026-10-02: the two LaTeX rough edges — callouts across a
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
- Live checks from a sandboxed Claude shell: a local `curl` of
  clew-app.com fails TLS ("self-signed certificate in chain", the
  sandbox's proxy). Fetch on the droplet instead: `ssh jmck-web "curl -s
  https://clew-app.com/manual/x.html"`, and `cmp` against `git show
  HEAD:site/…`.
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
