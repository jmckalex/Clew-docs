// Manual screenshot: live edit's "Edit source" icon
// (manual/images/live-edit-source-icon.png — live-edit.html#frames). The
// demo vault's Guide/Live Edit.md in live edit, both sidebars closed, the
// mermaid diagram in "## Blocks" in the middle of the pane and the pointer
// resting on it (a REAL move), so its </> icon is up at the block's
// upper-right corner. The caret at the note's end, the view where this
// script puts it: nothing near the diagram is revealed as source.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore, editorPool } = window.__clew;
const until = async (test, ms = 15000) => { for (const t0 = Date.now(); Date.now() - t0 < ms; await sleep(50)) if (test()) return true; return false; };
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Guide/Live Edit.md', { defaultMode: 'live' });
workspaceStore.setTabMode(tab.id, 'live');
await until(() => editorPool.get(tab.id)?.view?.state.doc.toString().includes('```mermaid'));
await sleep(1500);
const view = editorPool.get(tab.id).view;
const doc = view.state.doc.toString();
view.dispatch({ selection: { anchor: doc.length } });
const fence = doc.indexOf('```mermaid');
// Scroll, let the blocks above be drawn and measured, scroll again: the
// first lands on estimated heights.
for (let i = 0; i < 3; i++) {
	view.scrollDOM.scrollTop = Math.max(0, view.lineBlockAt(fence).top - 300);
	await until(() => document.querySelector('.le-frame-slot.is-measured[data-kind="mermaid"]'), 30000);
	await sleep(1200);
}
const icon = () => document.querySelector('.le-frame-reveal[data-kind="mermaid"]');
// The harness plays the input after this script returns: check from a
// detached task once the icon has faded in.
window.__clewSmokeInput = [
	{ move: { selector: '.le-frame-slot[data-kind="mermaid"] .le-frame-body' } }, { wait: 1500 },
];
(async () => {
	await until(() => icon()?.classList.contains('is-shown') && getComputedStyle(icon()).opacity === '1', 10000);
	const b = icon()?.getBoundingClientRect();
	const s = document.querySelector('.le-frame-slot[data-kind="mermaid"]')?.getBoundingClientRect();
	console.log('shot-source-icon: shown=' + !!icon()?.classList.contains('is-shown')
		+ ' opacity=' + (icon() ? getComputedStyle(icon()).opacity : 'absent')
		+ ' label=' + JSON.stringify(icon()?.getAttribute('aria-label') ?? null)
		+ ' at-corner=' + (b && s ? Math.abs(b.right - s.right) < 40 && Math.abs(b.top - s.top) < 40 : false)
		+ ' revealed=' + (view.state.selection.main.head < doc.length));
})();
