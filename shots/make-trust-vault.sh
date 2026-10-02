#!/bin/bash
# shots/make-trust-vault.sh <dir>: a colleague's vault, for the screenshots of
# trusting-a-vault.html — a vault script, one plugin of its own, a note with a
# script and a handler, a dataviewjs reading list, and requests for the Note
# API, dataviewjs and the network. Name the folder field-notes: it is the
# vault's name in the shots.
D=${1:?usage: make-trust-vault.sh <dir>}; rm -rf "${D:?}"; mkdir -p "$D/.clew/scripts" "$D/.clew/plugins/reading-time"
cat > "$D/.clew/scripts/sparkline.js" <<'JS'
// Draws a sparkline into every <span class="spark" data-values="…">.
for (const el of document.querySelectorAll('span.spark')) el.textContent = '▁▃▅▇';
JS
cat > "$D/.clew/plugins/reading-time/manifest.json" <<'JSON'
{ "id": "reading-time", "name": "Reading time", "version": "1.2.0", "description": "Shows how long a note takes to read.", "surfaces": { "preview": "preview.js" } }
JSON
printf '%s\n' "document.body.dataset.readingTime = Math.ceil(document.body.innerText.split(/\\s+/).length / 230) + ' min';" > "$D/.clew/plugins/reading-time/preview.js"
cat > "$D/.clew/vault-settings.json" <<'JSON'
{
	"plugins": ["reading-time"],
	"noteApi": true,
	"dataviewJs": true,
	"network": true
}
JSON
cat > "$D/Budget.md" <<'MD'
# Budget

The field season's costs. The total is worked out by a script, and the
button recalculates it after an edit.

| Item | Cost |
|---|---:|
| Travel | 1,240 |
| Equipment | 860 |
| Accommodation | 1,905 |

<script>
const cells = [...document.querySelectorAll('td:last-child')];
document.getElementById('total').textContent = cells.reduce((s, c) => s + Number(c.textContent.replace(/,/g, '')), 0);
</script>

**Total:** <span id="total">—</span> <button onclick="location.reload()">Recalculate</button>

Spending by month: <span class="spark" data-values="3,5,8,6"></span>
MD
cat > "$D/Reading list.md" <<'MD'
# Reading list

```dataviewjs
dv.table(['Paper', 'Status'], dv.pages('"Papers"').map((p) => [p.file.link, p.status]));
```
MD
printf '# Field notes\n\nNotes from the 2026 season. Start with [[Budget]] and the [[Reading list]].\n' > "$D/Field notes.md"
