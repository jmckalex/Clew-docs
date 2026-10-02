// The screenshot lightbox, shared by the manual and the landing page.
//
// Every screenshot is wrapped, in the HTML itself, in a link to its own
// file — <a class="zoom" href="images/x.png"><img …></a> — so a
// middle-click, "Open in New Tab" and a browser without scripts all still
// reach the picture. This script only takes over a plain click (Enter on a
// focused link is one) and shows the image in a native modal <dialog>:
// showModal() makes the page behind inert, moves focus in, and closes on
// Esc. Which images zoom is decided by that markup, not guessed here — the
// brand icon and other decoration are simply never wrapped.
(() => {
	const links = [...document.querySelectorAll('a.zoom')];
	if (!links.length || typeof HTMLDialogElement !== 'function') return;

	const dialog = document.createElement('dialog');
	dialog.className = 'lightbox';
	dialog.setAttribute('aria-label', 'Screenshot');
	dialog.innerHTML = `
		<button type="button" class="lightbox-close" aria-label="Close">×</button>
		<button type="button" class="lightbox-prev" aria-label="Previous screenshot">‹</button>
		<button type="button" class="lightbox-next" aria-label="Next screenshot">›</button>
		<figure><img alt=""><figcaption></figcaption></figure>`;
	document.body.append(dialog);
	const img = dialog.querySelector('img');
	const caption = dialog.querySelector('figcaption');
	const prev = dialog.querySelector('.lightbox-prev');
	const next = dialog.querySelector('.lightbox-next');
	prev.hidden = next.hidden = links.length < 2;

	let current = -1;
	let isOpen = false;

	// The figure's own caption where there is one (the manual), else the
	// image's alt text (the landing page, whose screenshots have none).
	function show(i) {
		current = (i + links.length) % links.length;
		const link = links[current];
		const thumb = link.querySelector('img');
		const own = link.closest('figure')?.querySelector('figcaption');
		img.src = link.href;
		img.alt = thumb?.alt ?? '';
		if (own) caption.innerHTML = own.innerHTML;
		else caption.textContent = thumb?.alt ?? '';
		caption.hidden = !caption.textContent.trim();
	}

	links.forEach((link, i) => link.addEventListener('click', (e) => {
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		e.preventDefault();
		show(i);
		document.documentElement.classList.add('lightbox-open');
		dialog.showModal();
		isOpen = true;
	}));

	// However it closes — Esc, the ×, the backdrop — the page scrolls again
	// and focus goes back to the thumbnail of the image last shown. Run from
	// each way of closing, not only from the dialog's close event: Chrome
	// does not always fire that one — after any key pressed inside the dialog
	// (Tab, an arrow), Esc closed it with `cancel` alone (measured, Chrome
	// 154), leaving the page locked.
	function teardown() {
		if (!isOpen) return;
		isOpen = false;
		document.documentElement.classList.remove('lightbox-open');
		img.removeAttribute('src');
		links[current]?.focus();
	}
	function closeBox() {
		if (dialog.open) dialog.close();
		teardown();
	}
	dialog.addEventListener('cancel', (e) => { e.preventDefault(); closeBox(); });
	dialog.addEventListener('close', teardown);
	dialog.querySelector('.lightbox-close').addEventListener('click', closeBox);
	prev.addEventListener('click', () => show(current - 1));
	next.addEventListener('click', () => show(current + 1));

	// A click anywhere but the picture, a button or a link in the caption is
	// a click on the backdrop.
	dialog.addEventListener('click', (e) => {
		if (e.target === img || e.target.closest('button, a')) return;
		closeBox();
	});

	dialog.addEventListener('keydown', (e) => {
		if (links.length < 2) return;
		if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
		else if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
	});
})();
