/*
 * Clew manual: shared navigation.
 * Every page carries an empty <nav id="sidebar"> and <nav id="pagenav">;
 * this script fills both from the single tree below, so the manual's
 * structure lives in exactly one place. Plain script, no framework —
 * works over file:// as well as any static host.
 */

const MANUAL_NAV = [
	{ section: 'Getting started', items: [
		{ file: 'introduction.html', title: 'Introduction' },
		{ file: 'getting-started.html', title: 'Getting started' },
	] },
	{ section: 'The vault', items: [
		{ file: 'vaults-and-files.html', title: 'Vaults and files' },
		{ file: 'note-history.html', title: 'Note history' },
		{ file: 'attachments-and-files.html', title: 'Attachments and files' },
		{ file: 'office-documents.html', title: 'Office documents' },
	] },
	{ section: 'Writing', items: [
		{ file: 'editing.html', title: 'The editor' },
		{ file: 'live-edit.html', title: 'Live edit and the toolbar' },
		{ file: 'dialect.html', title: 'The jmarkdown dialect' },
		{ file: 'callouts.html', title: 'Callouts' },
		{ file: 'tabbing.html', title: 'Tabbing' },
		{ file: 'links-and-embeds.html', title: 'Links and embeds' },
		{ file: 'properties.html', title: 'Properties and metadata' },
		{ file: 'daily-notes.html', title: 'Daily notes and the diary' },
	] },
	{ section: 'Reading mode', items: [
		{ file: 'reading-mode.html', title: 'How rendering works' },
		{ file: 'math-and-theorems.html', title: 'Math and theorems' },
		{ file: 'citations.html', title: 'Citations and bibliographies' },
		{ file: 'diagrams.html', title: 'Diagrams' },
		{ file: 'maps.html', title: 'Interactive maps' },
	] },
	{ section: 'The vault as a database', items: [
		{ file: 'queries.html', title: 'Queries' },
		{ file: 'tasks-and-kanban.html', title: 'Tasks and kanban' },
	] },
	{ section: 'Canvas', items: [
		{ file: 'canvas.html', title: 'The canvas' },
		{ file: 'excalidraw.html', title: 'Drawings (Excalidraw)' },
	] },
	{ section: 'Workspace', items: [
		{ file: 'navigation.html', title: 'Navigation, tabs and splits' },
		{ file: 'panels.html', title: 'Panels' },
		{ file: 'search.html', title: 'Search' },
		{ file: 'graph-view.html', title: 'Graph view' },
	] },
	{ section: 'Sharing your work', items: [
		{ file: 'export.html', title: 'Exporting notes' },
		{ file: 'publishing.html', title: 'Publishing as a website' },
	] },
	{ section: 'Extending Clew', items: [
		{ file: 'note-api.html', title: 'The Note API' },
		{ file: 'plugins.html', title: 'Vault plugins' },
		{ file: 'theming.html', title: 'Theming and CSS snippets' },
	] },
	{ section: 'Reference', items: [
		{ file: 'settings-and-hotkeys.html', title: 'Settings and hotkeys' },
	] },
];

(function () {
	const here = location.pathname.split('/').pop() || 'index.html';
	const flat = MANUAL_NAV.flatMap((s) => s.items);

	const sidebar = document.getElementById('sidebar');
	if (sidebar) {
		const parts = [];
		parts.push('<p class="nav-head"><a href="index.html">Clew Manual</a> <span class="nav-version">v0.11.1</span></p>');
		for (const group of MANUAL_NAV) {
			parts.push(`<p class="nav-section">${group.section}</p><ul>`);
			for (const item of group.items) {
				const cls = item.file === here ? ' class="current"' : '';
				parts.push(`<li><a${cls} href="${item.file}">${item.title}</a></li>`);
			}
			parts.push('</ul>');
		}
		sidebar.innerHTML = parts.join('');
		const current = sidebar.querySelector('a.current');
		if (current) current.scrollIntoView({ block: 'center' });
	}

	const pagenav = document.getElementById('pagenav');
	const idx = flat.findIndex((item) => item.file === here);
	if (pagenav && idx !== -1) {
		const prev = flat[idx - 1];
		const next = flat[idx + 1];
		let html = '';
		if (prev) html += `<a class="prev" href="${prev.file}"><span class="dir">Previous</span>${prev.title}</a>`;
		if (next) html += `<a class="next" href="${next.file}"><span class="dir">Next</span>${next.title}</a>`;
		pagenav.innerHTML = html;
	}

	const toggle = document.querySelector('.nav-toggle');
	if (toggle) {
		toggle.addEventListener('click', () => document.body.classList.toggle('nav-open'));
		// Selecting a page closes the drawer (matters only at mobile widths).
		if (sidebar) sidebar.addEventListener('click', (e) => {
			if (e.target.closest('a')) document.body.classList.remove('nav-open');
		});
	}
})();
