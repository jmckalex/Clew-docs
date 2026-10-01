// For tabbing.js: scroll the reading view so "Indenting, and stepping back"
// sits at the top, and report that every tabbing block is laid out.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const want = 'Indenting, and stepping back';
const h = [...document.querySelectorAll('h2')].find((e) => e.textContent.trim().startsWith(want));
if (h) { h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -24); }
await sleep(800);
const blocks = document.querySelectorAll('.clew-tabbing');
console.log('shot-tabbing: blocks=' + blocks.length + ' laid=' + [...blocks].filter((b) => b.classList.contains('tb-laid')).length + ' scrolled=' + !!h);
