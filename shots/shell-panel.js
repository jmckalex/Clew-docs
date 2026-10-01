// Manual screenshot: the shell panel under a note
// (manual/images/shell-panel.png — panels.html#shell). The demo vault copied
// to <scratch>/demo-vault, the explorer open, the right sidebar closed,
// Guide/Vaults and Files.md in live edit; ⌃` opens the panel and two
// commands are typed for real. Run with ZDOTDIR=<repo>/shots/zsh (a neutral
// prompt — never the owner's dotfiles).
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { workspaceStore, vaultStore, editorPool } = window.__clew;
const until = async (test, ms = 20000) => { for (const t0 = Date.now(); Date.now() - t0 < ms; await sleep(100)) if (test()) return true; return false; };
for (let i = 0; i < 150 && !vaultStore.vault?.sessionId; i++) await sleep(100);
workspaceStore.setSidebar('left', { open: true });
workspaceStore.setSidebar('right', { open: false });
// 280 px, not the default 220: room for all three prompts.
workspaceStore.setShell({ open: false, height: 280 });
const tab = workspaceStore.openNote('Guide/Vaults and Files.md', { defaultMode: 'live' });
workspaceStore.setTabMode(tab.id, 'live');
await sleep(4000);
// The caret at the note's end, the view at its top: the properties drawn,
// not revealed as YAML.
const view = editorPool.get(tab.id).view;
view.dispatch({ selection: { anchor: view.state.doc.length } });
view.scrollDOM.scrollTop = 0;
await sleep(500);

const term = () => window.__clew.shellTerminal;
const line = (y) => term()?.buffer.active.getLine(y)?.translateToString(true) ?? '';
const cursorLine = () => { const b = term()?.buffer.active; return b ? line(b.baseY + b.cursorY) : ''; };
window.__clewSmokeInput = [
	{ combo: { key: '`', modifiers: 2 } },
	{ wait: 4000 },   // the pty, a login zsh, the first prompt
	{ combo: { key: 'l', modifiers: 2 } }, { wait: 800 },   // ⌃L: the prompt at the top
	{ text: 'wc -w Guide/*.md | tail -3' }, { combo: { key: 'Enter' } }, { wait: 2500 },
	{ text: 'ls Guide | head -4' }, { combo: { key: 'Enter' } }, { wait: 2500 },
];
// The harness plays the input after this script returns: report from a
// detached task once the third prompt is up.
(async () => {
	await until(() => (term()?.cols ?? 0) > 1);
	await until(() => /head -4/.test([...Array(term().buffer.active.length).keys()].map(line).join('\n'))
		&& /^\$\s*(\d+:\d\d:\d\d)?$/.test(cursorLine().trimEnd()), 20000);
	await sleep(400);
	const b = term().buffer.active;
	console.log('shot-shell: cursor-col=' + b.cursorX + ' line=' + JSON.stringify(cursorLine().replace(/\s+$/, ''))
		+ ' total=' + /\d+ total/.test([...Array(b.length).keys()].map(line).join('\n'))
		+ ' first=' + JSON.stringify(line(b.viewportY).trimEnd()));
})();
