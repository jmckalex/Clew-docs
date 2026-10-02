// Manual screenshot: an app's prompt (manual/images/app-prompt.png —
// apps-in-notes.html). The demo vault copied to <scratch>/demo-vault and
// KNOWN to fresh user data (clew-settings.json {"recentVaults": [<path>]}),
// so the vault is trusted and the prompt is the trusted one. Guide/Apps in
// Notes.md in reading mode, both sidebars closed, the Flashcards prompt up.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore } = window.__clew;
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Guide/Apps in Notes.md', { defaultMode: 'reading' });
workspaceStore.setTabMode(tab.id, 'reading');
for (let i = 0; i < 150 && !document.querySelector('.clew-app-sheet'); i++) await sleep(100);
await sleep(800);
const sheet = document.querySelector('.clew-app-sheet');
console.log('shot-app-prompt: ' + JSON.stringify(sheet ? [...sheet.querySelectorAll('h2, p')].map((e) => e.textContent) : null));
