# shots/ — screenshot recipes

How every app screenshot on the site is made, so a retake is a command
rather than an afternoon. Nothing here is published: `make sync` sends
`site/` only. The retakes themselves are a release-checklist item
(HANDOVER §0): taken at a release, so the shots match what people
download.

Each recipe is a `CLEW_SMOKE_SCRIPT` for the app's smoke harness (see
`../Clew-app/CLAUDE.md`). It runs invisibly and writes one PNG at
2560×1700, dark theme. Every recipe logs a `shot-…` line that proves the
state is right; read it before you look at the picture.

## Running one

From `../Clew-app`, with `S` a scratch directory and `D` this folder:

```sh
D=../Clew-docs/shots
# a fixture: a copy of the demo vault, without its saved layout
rsync -a --exclude .clew/cache --exclude .clew/history demo-vault/ "$S/demo-vault/"
rm -f "$S/demo-vault/.clew/workspace.json"
env CLEW_SMOKE="$S/out.png" CLEW_SMOKE_SCRIPT=$D/live-edit.js \
    CLEW_SMOKE_VAULT="$S/demo-vault" CLEW_USER_DATA="$S/ud-1" \
    CLEW_SMOKE_LOG=1 npx electron . 2>&1 | grep -E 'shot-|smoke:'
```

- **A fresh fixture and fresh `CLEW_USER_DATA` for every run.** A
  recipe can edit its vault, and a saved layout or setting from the last
  run will leak into the next shot.
- **The fixture's folder name is the vault's name**, in the title bar
  and at the head of the explorer. Copies of the demo vault are called
  `demo-vault`; the other fixtures keep the names below.
- The harness plays `window.__clewSmokeInput` only *after* the script
  returns. A recipe that uses real input therefore checks its result
  from a listener or a detached task, never by waiting in line.
- Recipes that draw in reading mode measure inside the preview frame,
  with `CLEW_SMOKE_FRAME_SCRIPT`.

## The images

Manual images go to `site/manual/images/` at full size, as PNG. None of
those listed here is duplicated in `site/images/`. `math.jpg` is the
exception: it is one file in two places.

| Image | Recipe | Fixture (folder name) | Extra env | The log line to expect |
|---|---|---|---|---|
| `live-edit.png` | `live-edit.js` | demo vault (`demo-vault`) | — | `shot-live-edit: strong=… rule=… chip="Alexander 2023"` |
| `live-edit-toolbar.png` | `live-edit-toolbar.js` | demo vault | — | `shot-toolbar: block-style="Heading 2" lit=12 caption="3 × 4" focus=BODY` |
| `live-edit-table.png` | `live-edit-table.js` | demo vault | — | `shot-table: cell="mermaid" active=true menu=true items=16 block-style="Table"` |
| `sidenotes-live.png` | `sidenotes-live.js` | `node smoke/make-live-vault.mjs $S/snv` (`snv`) | — | `shot-sidenotes-live: sidenotes=3` |
| `sidenotes-reading.png` | `sidenotes-reading.js` | as above (`snv`) | `CLEW_SMOKE_FRAME_SCRIPT=$D/sidenotes-reading-frame.js` | `shot-sidenotes-reading: sidenotes=3` |
| `pdf-annotations.png` | two steps, below | `node smoke/make-pdf-vault.mjs $S/pdfv` (`pdfv`) | — | `shot-pdf-annotations: panes=2 quotes=4 properties-drawn=true` |
| `shell-panel.png` | `shell-panel.js` | demo vault | `ZDOTDIR=$PWD/$D/zsh` (absolute) | `shot-shell: cursor-col=2 … total=true first="demo-vault/"` |
| `tabbing.png` | `tabbing.js` | demo vault | `CLEW_SMOKE_FRAME_SCRIPT=$D/tabbing-frame.js CLEW_SMOKE_FRAME_MATCH=vault/` | `shot-tabbing: blocks=6 laid=6 scrolled=true` |
| `kanban-board.png` | `../Clew-app/smoke/manual/kanban-board.js` | a copy of `study-vault` (`study-vault`) | — | none; check that all four columns are in the shot |
| `citations-library.png` | `../Clew-app/smoke/citations-scenario.js` (its last frame) | `node smoke/make-citations-vault.mjs $S/ci` (`ci`) | — | `smoke-ci: …` through `pandoc cited-in=[2,1,2]`; the split's live pane shows its toolbar |
| landing `site/images/kanban.jpg` | `kanban-landing.js` | a copy of `study-vault` | — | none; then 1400 wide, JPEG (below) |
| `math.jpg`, landing and manual | `math.js` | demo vault | — | none; then 1400 wide, JPEG (below) |

**`pdf-annotations.png`** takes two runs over one fixture. The first is
the app's own scenario, which makes the highlights and the sticky note
and writes "Paper — Annotations.md":

```sh
node smoke/make-pdf-vault.mjs "$S/pdfv"
env CLEW_SMOKE="$S/step1.png" CLEW_SMOKE_SCRIPT=smoke/pdf-annotations-scenario.js \
    CLEW_SMOKE_FRAME_SCRIPT=smoke/pdf-annotations-frame.js CLEW_SMOKE_FRAME_MATCH=pdf-page \
    CLEW_SMOKE_VAULT="$S/pdfv" CLEW_USER_DATA="$S/ud-1" CLEW_SMOKE_LOG=1 npx electron .
rm -f "$S/pdfv/.clew/workspace.json"
```

The second is `pdf-annotations.js` over the same `pdfv`, with fresh user
data. Expect `smoke-pa-frame: page=3 annotations=4` from the first run.

**JPEGs** are scaled and converted with `sips`:

```sh
sips -s format jpeg -s formatOptions 86 --resampleWidth 1400 "$S/out.png" --out kanban.jpg
```

## Notes for the retake

- `shell-panel.png`: the old shot shows the owner's own prompt (conda's
  `(base)`, their clock). `zsh/.zshrc` is the neutral one to use: the
  folder name, then `$ ` below it, the time on the right. It unsets
  `HISTFILE`, because `/etc/zshrc` would otherwise write history into
  this repository. Never run a shot against real dotfiles.
- `live-edit-table.png`: the harness clicks only the left button, so the
  right-click is a `contextmenu` event on the cell, near its corner.
  The handler reads nothing else, so the result is the same. With the
  cursor in a table, the toolbar shows the table tools and undo/redo go
  into `…` (live-edit.html#toolbar).
- `live-edit-toolbar.png`: the popover focuses its first grid cell when
  it opens. The recipe blurs it, or the shot would carry a focus ring
  the mouse never made.
- `pdf-annotations.js` waits 2.5 s after opening the note before it opens
  the PDF and splits. Doing all three in one tick left live edit undrawn,
  with a RangeError from the sidenotes plugin's measure (reported to
  Clew-boss, 2026-10-02).
- `math.jpg`: the note has grown since the old shot. It now has numbered
  headings, a Cross-references section, and the Earthrise figure, whose
  black top edge sits at the bottom of the frame. Decide the framing at
  the retake. The Note callout's title colour is the change that
  prompted the retake (HANDOVER §4).
- The demo vault's live-edit shots used other fixtures before (`mv`,
  `shv`, whose window titles show them). The recipes here use the demo
  vault, the manual's own source material.
