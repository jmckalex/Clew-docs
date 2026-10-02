#!/usr/bin/env node
// Stamp every local stylesheet and script URL with its file's content hash.
//
//   node stamp-assets.js site
//
// nginx serves CSS and JS with a 7-day expiry (clew-app.com.nginx.conf),
// while the pages are revalidated on every visit. So a changed nav.js or
// manual.css reached a returning reader up to a week late — the old URL was
// still fresh in their cache. Each <link href="….css"> and
// <script src="….js"> that names a file in the site gets ?v=<hash>; the page,
// always fresh, asks for the new URL the moment the file changes.
//
// Idempotent: a stamp is replaced, never stacked. check-links.js fails on a
// stamp that no longer matches its file, so a forgotten `make stamp` cannot
// reach a deploy.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(process.argv[2] || 'site');

function walk(dir, out = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(full, out);
		else if (entry.isFile() && full.endsWith('.html')) out.push(full);
	}
	return out;
}

// The first ten hex digits of the file's SHA-256: plenty to tell versions
// apart, short enough to read in a diff.
function hashOf(file) {
	return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 10);
}

// <link …href="x.css…"> and <script …src="x.js…"> naming a local file, with
// or without a stamp already. Shared with check-links.js.
const ASSET = /(<(?:link|script)\b[^>]*?\b(?:href|src)=")([^"#?:]+\.(?:css|js))(\?v=[0-9a-f]*)?(")/gi;

function stamp(html, page) {
	return html.replace(ASSET, (whole, open, url, _old, close) => {
		const file = path.resolve(path.dirname(page), decodeURIComponent(url));
		if (!fs.existsSync(file)) return whole; // check-links reports it
		return `${open}${url}?v=${hashOf(file)}${close}`;
	});
}

if (require.main === module) {
	let changed = 0;
	for (const page of walk(root)) {
		const html = fs.readFileSync(page, 'utf8');
		const out = stamp(html, page);
		if (out !== html) {
			fs.writeFileSync(page, out);
			changed++;
		}
	}
	console.log(`${changed} page(s) restamped.`);
}

module.exports = { ASSET, hashOf };
