// Manual screenshot: the demo vault's Guide/Live Edit.md in live edit, the
// cursor inside *strong* in the Inline paragraph, "The rule" near the top
// (manual/images/live-edit.png — live-edit.html). Left sidebar open, right closed.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore, editorPool } = window.__clew;
const until = async (test, ms = 15000) => { for (const t0 = Date.now(); Date.now() - t0 < ms; await sleep(50)) if (test()) return true; return false; };
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: true });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Guide/Live Edit.md', { defaultMode: 'live' });
workspaceStore.setTabMode(tab.id, 'live');
await until(() => document.querySelector('clew-editor-view clew-editor-toolbar'));
await sleep(1500);
const view = editorPool.get(tab.id).view;
const doc = view.state.doc.toString();
const strong = doc.indexOf('*strong*');
view.focus();
view.dispatch({ selection: { anchor: strong + 3 } });
await sleep(300);
const rule = doc.indexOf('## The rule');
view.scrollDOM.scrollTop = Math.max(0, view.lineBlockAt(rule).top - 40);
await until(() => document.querySelector('.le-cite') && !/\b20\d\d\b$/.test(''), 3000);
await sleep(4000);
// Re-scroll once every line above is measured (the first scroll lands on
// estimated heights), and frame the Inline paragraph whole — it has grown
// since 0.12.0 and its citation chip fell below the fold.
const inline = doc.indexOf('## Inline');
for (let i = 0; i < 2; i++) { view.scrollDOM.scrollTop = Math.max(0, view.lineBlockAt(inline).top + 18); await sleep(800); }
const chip = document.querySelector('clew-editor-view [class*="cite"]');
console.log('shot-live-edit: strong=' + strong + ' rule=' + rule + ' chip=' + JSON.stringify(chip?.textContent ?? null));
