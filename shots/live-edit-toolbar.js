// Manual screenshot: the editor toolbar over the demo vault's
// Guide/Live Edit.md in live edit, the cursor on "## Blocks" (so the block
// style reads Heading 2), the Table popover open with 3 × 4 lit
// (manual/images/live-edit-toolbar.png — live-edit.html#toolbar). Both
// sidebars closed. Real pointer input: the toolbar button, then the grid.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore, editorPool } = window.__clew;
const until = async (test, ms = 15000) => { for (const t0 = Date.now(); Date.now() - t0 < ms; await sleep(50)) if (test()) return true; return false; };
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Guide/Live Edit.md', { defaultMode: 'live' });
workspaceStore.setTabMode(tab.id, 'live');
await until(() => document.querySelector('clew-editor-view clew-editor-toolbar'));
await sleep(1500);
const view = editorPool.get(tab.id).view;
const doc = view.state.doc.toString();
const blocks = doc.indexOf('## Blocks');
view.focus();
view.dispatch({ selection: { anchor: blocks + 5 } });
view.scrollDOM.scrollTop = Math.max(0, view.lineBlockAt(blocks).top - 20);
await sleep(1500);
// The harness plays __clewSmokeInput after this script returns, so the
// check waits for the hover itself. The popover focuses its first cell on
// open; blur it, or the shot carries a focus ring the mouse never made.
document.addEventListener('pointerover', (e) => {
	if (!e.target.matches?.('.popover-grid-cell[data-size="3x4"]')) return;
	if (document.activeElement?.matches?.('.popover-grid-cell')) document.activeElement.blur();
	requestAnimationFrame(() => console.log('shot-toolbar: block-style='
		+ JSON.stringify(document.querySelector('clew-editor-toolbar [data-popover="heading"]')?.textContent?.trim() ?? null)
		+ ' lit=' + document.querySelectorAll('.popover-grid-cell.is-lit').length
		+ ' caption=' + JSON.stringify(document.querySelector('.popover-caption')?.textContent ?? null)
		+ ' focus=' + (document.activeElement?.className || document.activeElement?.tagName)));
}, true);
window.__clewSmokeInput = [
	{ click: { selector: 'clew-editor-toolbar [data-popover="table"]' } }, { wait: 700 },
	{ move: { selector: '.popover-grid-cell[data-size="3x4"]' } }, { wait: 800 },
];
