// Landing-page screenshot (site/images/kanban.jpg): study-vault's Pipeline
// board in reading mode, file explorer open, right sidebar closed so the
// four-column board fits the pane.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore } = window.__clew;
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: true });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Papers/Pipeline.md', { defaultMode: 'reading' });
workspaceStore.setTabMode(tab.id, 'reading');
await sleep(7000);
