// Manual screenshot: a PDF's annotations as a note
// (manual/images/pdf-annotations.png — attachments-and-files.html#pdf-annotations).
// Two steps, both in Clew-app:
//   1. `node smoke/make-pdf-vault.mjs <dir>/pdfv`, then run
//      smoke/pdf-annotations-scenario.js over it (with its frame script) —
//      it makes the highlights and the sticky note and writes
//      "Paper — Annotations.md";
//   2. delete pdfv/.clew/workspace.json and run THIS script over pdfv with
//      fresh user data: the note in live edit on the left, Paper.pdf split
//      off to the right, both sidebars closed. The caret at the note's end,
//      the view at its top, so the properties are drawn, not revealed.
// The pause before the PDF opens: before Clew-app 09aabdf, opening and
// splitting in the same tick as the note left live edit undrawn (a
// RangeError from the sidenotes plugin's measure). Harmless after it.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore, editorPool } = window.__clew;
const until = async (test, ms = 15000) => { for (const t0 = Date.now(); Date.now() - t0 < ms; await sleep(50)) if (test()) return true; return false; };
const groupOf = (tabId) => workspaceStore.allGroups().find((g) => g.tabs.some((t) => t.id === tabId));
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const note = workspaceStore.openNote('Paper — Annotations.md', { defaultMode: 'live' });
workspaceStore.setTabMode(note.id, 'live');
await until(() => editorPool.get(note.id)?.view);
await sleep(2500);
const pdf = workspaceStore.openFile('Paper.pdf', { newTab: true });
workspaceStore.splitWithTab(groupOf(note.id).id, 'right', pdf.id);
await sleep(1500);
await until(() => [...document.querySelectorAll('clew-file-view')].find((v) => v.path === 'Paper.pdf')?.querySelector('iframe.pdf-frame'));
await sleep(5000);
workspaceStore.activateTab(note.id);
const view = editorPool.get(note.id).view;
view.dispatch({ selection: { anchor: view.state.doc.length } });
view.scrollDOM.scrollTop = 0;
await sleep(1500);
console.log('shot-pdf-annotations: panes=' + document.querySelectorAll('clew-tab-group').length
	+ ' quotes=' + (view.state.doc.toString().match(/\^pdf-/g) ?? []).length
	+ ' properties-drawn=' + view.contentDOM.textContent.includes('Edit as YAML'));
