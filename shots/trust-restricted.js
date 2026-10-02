// Manual screenshot: a restricted vault (manual/images/trust-restricted.png —
// trusting-a-vault.html#restricted): Budget.md in reading mode with its
// script and its button's handler marked in place, and the status bar's
// "Restricted · Trust…". Same fixture as trust-prompt.js, fresh user data,
// WITHOUT CLEW_SMOKE_TRUST_PROMPT (so no modal: the vault stays undecided
// and restricted, as after the prompt is put away).
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore } = window.__clew;
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Budget.md', { defaultMode: 'reading' });
workspaceStore.setTabMode(tab.id, 'reading');
await sleep(7000);
console.log('shot-trust-restricted: indicator=' + JSON.stringify(document.querySelector('.clew-trust-indicator')?.textContent ?? null));
