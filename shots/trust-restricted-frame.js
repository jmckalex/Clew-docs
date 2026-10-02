// Frame half of trust-restricted.js: the markers the preview client draws.
console.log('shot-trust-restricted: markers=' + JSON.stringify([...document.querySelectorAll('[data-jmd-refused], .jmd-refused')].map((m) => m.textContent.trim())));
