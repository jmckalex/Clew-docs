// Manual screenshot: the demo's Flashcards app running in its note
// (manual/images/app-flashcards.png — apps-in-notes.html). Same fixture as
// app-prompt.js; the prompt is answered with a real click on Allow, and the
// app shows its first card. (The harness's frameClick looks only in preview
// frames, so a click inside the app's own frame is not scripted.)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore } = window.__clew;
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Guide/Apps in Notes.md', { defaultMode: 'reading' });
workspaceStore.setTabMode(tab.id, 'reading');
for (let i = 0; i < 150 && !document.querySelector('.clew-app-sheet .clew-trust-button'); i++) await sleep(100);
document.querySelector('.clew-app-sheet .clew-trust-button').id = 'shot-allow';
window.__clewSmokeInput = [
	{ click: { selector: '#shot-allow' } }, { wait: 3500 },
];
