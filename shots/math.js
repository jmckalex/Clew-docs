// Screenshot for the landing page AND the manual (site/images/math.jpg and
// site/manual/images/math.jpg, one file twice): the demo vault's
// Features/Math and Theorems.md in reading mode, both sidebars open — the
// explorer, and Links on the right. Scale to 1400 wide, JPEG (README).
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore } = window.__clew;
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: true });
workspaceStore.setSidebar('right', { open: true });
const tab = workspaceStore.openNote('Features/Math and Theorems.md', { defaultMode: 'reading' });
workspaceStore.setTabMode(tab.id, 'reading');
await sleep(7000);
