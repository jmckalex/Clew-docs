// Manual screenshot: sidenotes in reading mode
// (manual/images/sidenotes-reading.png — reading-mode.html#sidenotes). The
// same fixture as sidenotes-live.js (make-live-vault.mjs, the vault named
// snv), both sidebars closed. The notes are drawn inside the preview frame,
// out of this script's reach: check them with
// CLEW_SMOKE_FRAME_SCRIPT=shots/sidenotes-reading-frame.js.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore } = window.__clew;
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Sidenotes.md', { defaultMode: 'reading' });
workspaceStore.setTabMode(tab.id, 'reading');
await sleep(7000);
