/**
 * Fades an element up into place the first time it scrolls into view.
 * The hidden state is only applied once JavaScript runs, so prerendered pages never
 * hide content from visitors without JS. Styles live in layout.css (.reveal).
 */
export function reveal(node: HTMLElement, options: { delay?: number } = {}) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	node.classList.add('reveal');
	node.style.setProperty('--reveal-delay', `${options.delay ?? 0}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.classList.add('is-visible');
				observer.disconnect();
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
	);
	observer.observe(node);

	return { destroy: () => observer.disconnect() };
}
