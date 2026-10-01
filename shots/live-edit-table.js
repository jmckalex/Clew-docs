// Manual screenshot: a table in live edit with one cell outlined for editing
// and the table menu open beside it (manual/images/live-edit-table.png —
// live-edit.html#tables). The demo vault's Guide/Live Edit.md, "## Blocks"
// at the top, both sidebars closed. The harness clicks only the left button,
// so the right-click is a contextmenu event on the cell, near its corner —
// all live edit's handler reads (the target and the point).
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore, editorPool } = window.__clew;
const until = async (test, ms = 15000) => { for (const t0 = Date.now(); Date.now() - t0 < ms; await sleep(50)) if (test()) return true; return false; };
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Guide/Live Edit.md', { defaultMode: 'live' });
workspaceStore.setTabMode(tab.id, 'live');
await until(() => document.querySelector('clew-editor-view .le-table-wrap [data-le-cell]'));
await sleep(1500);
const view = editorPool.get(tab.id).view;
const blocks = view.state.doc.toString().indexOf('## Blocks');
view.scrollDOM.scrollTop = Math.max(0, view.lineBlockAt(blocks).top - 20);
await sleep(1500);
const td = [...view.contentDOM.querySelectorAll('.le-table-wrap [data-le-cell]')]
	.find((c) => c.textContent.trim() === 'mermaid');
const r = td.getBoundingClientRect();
td.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, button: 2, clientX: r.right - 12, clientY: r.bottom - 8 }));
await sleep(1200);
const menu = document.querySelector('.table-menu');
console.log('shot-table: cell=' + JSON.stringify(td.textContent.trim()) + ' active=' + (td.dataset.leActive !== undefined)
	+ ' menu=' + !!menu + ' items=' + (menu?.querySelectorAll('.popover-item').length ?? 0)
	+ ' block-style=' + JSON.stringify(document.querySelector('clew-editor-toolbar [data-popover="heading"]')?.textContent?.trim() ?? null));
