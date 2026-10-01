// Manual screenshot: sidenotes in live edit (manual/images/sidenotes-live.png
// — live-edit.html#sidenotes). Fixture: Clew-app's
// `node smoke/make-live-vault.mjs <dir>/snv` (Sidenotes.md: three notes, two
// on one line). Both sidebars closed — the margin needs a wide pane; the
// caret on the empty last line, so no note is revealed as source.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore, editorPool } = window.__clew;
const until = async (test, ms = 15000) => { for (const t0 = Date.now(); Date.now() - t0 < ms; await sleep(50)) if (test()) return true; return false; };
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Sidenotes.md', { defaultMode: 'live' });
workspaceStore.setTabMode(tab.id, 'live');
await until(() => document.querySelectorAll('.le-sidenote').length === 3);
const view = editorPool.get(tab.id).view;
view.focus();
view.dispatch({ selection: { anchor: view.state.doc.length } });
await sleep(1500);
console.log('shot-sidenotes-live: sidenotes=' + document.querySelectorAll('.le-sidenote').length);
