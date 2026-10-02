// Manual screenshot: the trust prompt (manual/images/trust-prompt.png —
// trusting-a-vault.html). Fixture: shots/make-trust-vault.sh <dir>/field-notes,
// fresh user data, CLEW_SMOKE_TRUST_PROMPT=1 (the harness draws the modal
// prompt only then). Budget.md open in reading mode behind it, both sidebars
// closed, the prompt's Details opened so the shot shows what it lists.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore } = window.__clew;
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: false });
workspaceStore.setSidebar('right', { open: false });
const tab = workspaceStore.openNote('Budget.md', { defaultMode: 'reading' });
workspaceStore.setTabMode(tab.id, 'reading');
await sleep(6000);
const details = [...document.querySelectorAll('details')].find((d) => d.querySelector('summary')?.textContent.trim() === 'Details');
if (details) details.open = true;
await sleep(500);
const dlg = document.querySelector('h2')?.closest('dialog, [role="dialog"], .clew-trust-prompt, div');
console.log('shot-trust-prompt: title=' + JSON.stringify([...document.querySelectorAll('h2')].map((h) => h.textContent.trim()).find((t) => t.startsWith('Trust')) ?? null)
	+ ' details-open=' + !!details?.open + ' items=' + (details?.querySelectorAll('li').length ?? 0));
