# CLAUDE.md

Guidance for Claude Code working in the **Clew-docs** repository — the Clew
website and manual. Read `README.md` first for the layout and the deploy.

## What this repo is

Hand-written static HTML. No generator, no build step, no dependencies: the
pages in `site/manual/` are edited directly. `make sync` rsyncs `site/` to the
droplet. That is the whole pipeline.

The app itself lives in the sibling `../Clew-app` (and `../Clew-iOS`). **The
code is the arbiter of fact.** When the manual and the app disagree, the app
is right and the manual is a bug — do not "fix" the app to match the docs.
Specifically:

- **Hotkeys come from `../Clew-app/src/renderer/commands/builtin.js`** and
  nowhere else. Never transcribe a shortcut from another manual page, from
  memory, or from the menu bar.
- Feature behaviour is checked against the source, or against the demo vault
  at `../Clew-app/demo-vault/` (whose `Guide/` notes are the manual's
  original source material and are themselves the test corpus).
- Settings keys are checked against `../Clew-app/src/main/settings.js` and
  the per-vault `vault-settings.json` handling in `src/main/vault.js`.

## Editing the manual

- **Start from `site/manual/introduction.html`** as the skeleton — it carries
  the canonical page structure, top bar, and sidebar wiring.
- `nav.js` is the **single source** of the sidebar tree and the prev/next
  links. Adding a chapter means adding it there, not hand-editing 28 pages.
- `manual.css` is shared by every page and uses the landing page's palette.
  Page-specific styling belongs in it, keyed by a class, not in a `<style>`
  block on one page.
- **Every chapter ends with a Reference table and an
  `<h2 id="see-also">`.** No exceptions — the see-also anchors are linked
  across chapters and `make check-links` verifies every one of them resolves.

### House style

- Key caps in glyph order: `⌘⇧F`, `⌘⌥`, and the words `Esc` and `Enter`.
- "licence" is the noun, "license" the verb. British spelling throughout.
- Prose describes what the app *does*, including where it falls short. The
  manual documents the kanban horizontal-clipping limitation honestly rather
  than hiding it; keep that habit.

### Images

Every image the manual uses lives in `site/manual/images/`, including the ten
duplicated from `site/images/`. This is not redundancy to be cleaned up —
see README. `make check-links` fails if a manual page reaches outside
`manual/` for an asset.

Screenshots are captured with the app's smoke harness; the recipe is in
`../Clew-app/CLAUDE.md` (`CLEW_SMOKE`), and the tricks that matter —
collapsing sidebars for wide content, deleting `.clew/workspace.json` for a
clean single-pane layout — are in that repo's `HANDOVER.md`. Always pass
`CLEW_SMOKE_VAULT`.

## Before you push

```sh
make check-links     # every local href/src and every anchor
make dry-run         # exactly what would change on the server
```

`check-links` exits non-zero on a real problem and is cheap; run it after any
edit that touches a link, an anchor, an image, or a filename. It currently
reports the four `downloads/…` links as missing whenever the binaries are not
staged locally — that is expected on a fresh clone, not a regression.

For a visual check without Electron, headless Chrome renders a page directly:

```sh
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless --screenshot=/tmp/page.png --window-size=1400,2000 \
  site/manual/canvas.html
```

## Gotchas

- **nginx `add_header` does not merge across levels.** A `location` with any
  `add_header` of its own discards every one inherited from the server block.
  `clew.nginx.conf` expresses cache policy with `expires` for exactly this
  reason; if you add an `add_header` to a location, re-add the three security
  headers with it.
- **`make sync` uses `--delete`.** The `check` target guards against syncing
  a truncated tree. Do not weaken it.
- `site/downloads/` is gitignored and excluded from the ordinary sync. The
  exclusion is also what stops `--delete` from wiping 640 MB of releases on
  every deploy — do not "tidy" it away.
- The version number appears in `site/index.html` (download links and the
  footer) and in the Makefile's `VERSION`. They must agree, and neither is
  derived from the other.

## The rule that has no mechanism

**A feature change in `../Clew-app` is not finished until the manual matches
it.** When the docs lived inside the app repo, a stale manual showed up in
`git status` beside the code that staled it. Across two repos, nothing will
remind you. The manual documents split behaviour, citations, panels, the note
API, plugins, and every settings key — all of which move.
