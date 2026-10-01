// Manual screenshot: the demo vault's Guide/Tabbing.md in reading mode,
// sidebars closed (manual/images/tabbing.png — tabbing.html). Pair with
// tabbing-frame.js (CLEW_SMOKE_FRAME_MATCH=vault/), which scrolls to the
// pseudo-code and flush-right examples.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore } = window.__clew;
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Guide/Tabbing.md', { defaultMode: 'reading' });
workspaceStore.setTabMode(tab.id, 'reading');
await sleep(7000);
