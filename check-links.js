#!/usr/bin/env node
// Verify that every local link in the site resolves on disk.
//
//   node check-links.js site
//
// The manual is deliberately self-contained: it carries its own images/ so
// that it still works when the manual/ directory is served as its own web
// root. That invariant is invisible — nothing breaks locally when someone
// writes ../images/foo.jpg, because the file really is there one level up.
// It breaks only in production, only for readers, and only on one of the two
// ways the manual gets served. So it is checked here instead.
//
// Exit status is 1 if anything is broken, so `make check-links` can gate a
// deploy.

const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || 'site');
const manualDir = path.join(root, 'manual');

// Links out of the site are not our problem; nor are the protocol-ish ones.
const EXTERNAL = /^(?:https?:|mailto:|data:|javascript:|tel:|#)/i;

function walk(dir, out = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(full, out);
		else if (entry.isFile() && full.endsWith('.html')) out.push(full);
	}
	return out;
}

// Good enough for hand-written HTML: no parser, and the attributes we care
// about are never built by script in these pages.
function attrs(html) {
	const found = [];
	const re = /\b(?:href|src)\s*=\s*"([^"]*)"/gi;
	let m;
	while ((m = re.exec(html)) !== null) {
		found.push({ value: m[1], index: m.index });
	}
	return found;
}

function lineOf(html, index) {
	return html.slice(0, index).split('\n').length;
}

function idsIn(html) {
	const ids = new Set();
	const re = /\bid\s*=\s*"([^"]*)"/gi;
	let m;
	while ((m = re.exec(html)) !== null) ids.add(m[1]);
	return ids;
}

const pages = walk(root);
const problems = [];
const outward = new Map(); // manual/ → landing-page links, counted not listed
let checked = 0;

for (const page of pages) {
	const html = fs.readFileSync(page, 'utf8');
	const ids = idsIn(html);
	const rel = path.relative(root, page);

	for (const { value, index } of attrs(html)) {
		const line = lineOf(html, index);
		const where = `${rel}:${line}`;

		if (value === '' || EXTERNAL.test(value)) {
			// A bare fragment must still name something on this page.
			if (value.startsWith('#') && value.length > 1 && !ids.has(value.slice(1))) {
				problems.push(`${where}  dangling anchor  ${value}`);
			}
			continue;
		}
		if (value.startsWith('//')) continue; // protocol-relative: external

		checked++;
		const [target, frag] = value.split('#');
		const resolved = path.resolve(path.dirname(page), decodeURIComponent(target.split('?')[0]));

		if (!fs.existsSync(resolved)) {
			problems.push(`${where}  missing  ${value}`);
			continue;
		}
		// A link into another page's anchor is only checkable if that page is
		// HTML we can read; images and PDFs obviously have no ids.
		if (frag && resolved.endsWith('.html')) {
			const targetIds = idsIn(fs.readFileSync(resolved, 'utf8'));
			if (!targetIds.has(frag)) {
				problems.push(`${where}  dangling anchor  ${value}`);
			}
		}
		// Self-containment: a manual page reaching above manual/ for an asset
		// works here and 404s when manual/ is the web root. Links to the
		// landing page are the documented exception — they are navigation,
		// not assets, and the top bar is expected to leave the manual.
		if (page.startsWith(manualDir + path.sep) && !resolved.startsWith(manualDir + path.sep)) {
			const isAsset = !resolved.endsWith('.html');
			if (isAsset) {
				problems.push(`${where}  escapes manual/  ${value}  (breaks when manual/ is served as its own root)`);
			} else {
				// The top bar's Home/Download links do this on every page by
				// design. Counted rather than listed: 80-odd lines restating
				// a known, accepted fact is how a checker teaches you to stop
				// reading it.
				outward.set(value, (outward.get(value) || 0) + 1);
			}
		}
	}
}

// A chapter written by copying another page inherits its og:url and og:title,
// and nothing about the rendered page looks wrong — the tags only surface when
// someone shares the link. `node apply-og.js site` regenerates them; this just
// reports that they need it. The domain is deliberately not repeated here: the
// path suffix is what the copy-paste bug gets wrong.
for (const page of pages) {
	if (!page.startsWith(manualDir + path.sep)) continue;
	const file = path.basename(page);
	const rel = path.relative(root, page);
	const html = fs.readFileSync(page, 'utf8');
	const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i)?.[1];

	if (!ogUrl) {
		problems.push(`${rel}  no og:url  (run: node apply-og.js ${path.relative(process.cwd(), root)})`);
		continue;
	}
	const expected = file === 'index.html' ? '/manual/' : `/manual/${file}`;
	if (!ogUrl.endsWith(expected)) {
		problems.push(`${rel}  og:url points elsewhere  ${ogUrl}  (expected it to end ${expected})`);
	}
}

console.log(`${pages.length} pages, ${checked} local links checked.`);

if (outward.size) {
	const total = [...outward.values()].reduce((a, b) => a + b, 0);
	console.log(`\n${total} link(s) from manual/ out to the landing page — expected (the top bar):`);
	for (const [target, n] of [...outward].sort((a, b) => b[1] - a[1])) {
		console.log(`  ${String(n).padStart(3)} x  ${target}`);
	}
	console.log('  These resolve at /manual/ on the site; they are dead only if');
	console.log('  manual/ is served as its own web root.');
}

if (problems.length) {
	console.error(`\n${problems.length} problem(s):`);
	for (const p of problems) console.error(`  ${p}`);
	process.exit(1);
}

console.log('\nAll local links resolve.');
