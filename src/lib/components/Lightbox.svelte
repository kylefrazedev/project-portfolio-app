<script lang="ts">
	/**
	 * Makes every image inside it expandable: an expand icon sits on each image, clicking (or
	 * Enter/Space) opens it full-screen, and clicking outside the image or pressing Esc closes it.
	 * Images inside links are left alone.
	 */
	import type { Snippet } from 'svelte';

	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();

	let container: HTMLDivElement;
	let dialog: HTMLDialogElement;
	let src = $state('');
	let alt = $state('');

	const MIME: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg' };

	/** The largest candidate from the <picture>'s srcset, in the format the browser already chose. */
	function largestSource(img: HTMLImageElement) {
		const ext = (img.currentSrc || img.src).split('?')[0].split('.').pop() ?? '';
		const type = MIME[ext] ?? `image/${ext}`;
		const sources = [...(img.closest('picture')?.querySelectorAll('source') ?? [])];
		const srcset = (sources.find((s) => s.type === type) ?? sources[0])?.srcset || img.srcset;
		const candidates = (srcset || '')
			.split(',')
			.map((c) => c.trim().split(/\s+/))
			.filter(([url]) => url);
		if (!candidates.length) return img.currentSrc || img.src;
		const weight = (descriptor?: string) => (descriptor ? parseFloat(descriptor) : 1);
		return candidates.reduce((a, b) => (weight(b[1]) > weight(a[1]) ? b : a))[0];
	}

	function zoomTarget(event: Event) {
		const target = event.target as Element;
		if (target.closest('a, button, video')) return null;
		return target.closest('picture')?.querySelector('img') ?? null;
	}

	function open(img: HTMLImageElement) {
		src = largestSource(img);
		alt = img.alt;
		dialog.showModal();
	}

	function onclick(event: MouseEvent) {
		const img = zoomTarget(event);
		if (img) open(img);
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		const img = zoomTarget(event);
		if (!img) return;
		event.preventDefault();
		open(img);
	}

	// Make each image reachable and announced as a button for keyboard and screen-reader users.
	$effect(() => {
		for (const picture of container.querySelectorAll('picture')) {
			if (picture.closest('a')) continue;
			const label = picture.querySelector('img')?.alt;
			picture.setAttribute('role', 'button');
			picture.setAttribute('tabindex', '0');
			picture.setAttribute('aria-label', label ? `Expand image: ${label}` : 'Expand image');
		}
	});
</script>

<!-- Clicks and keys are delegated to the images inside, which get role="button" above. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={container} class={className} data-zoomable {onclick} {onkeydown}>
	{@render children()}
</div>

<dialog
	bind:this={dialog}
	class="lightbox"
	aria-label={alt || 'Expanded image'}
	onclick={(event) => event.target === dialog && dialog.close()}
	onclose={() => (src = '')}
>
	{#if src}
		<img
			{src}
			{alt}
			class="max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] rounded-xl object-contain shadow-2xl"
		/>
	{/if}
	<button
		type="button"
		class="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-black/60 text-white hover:bg-primary hover:text-bg"
		aria-label="Close"
		onclick={() => dialog.close()}
	>
		<svg viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" />
		</svg>
	</button>
</dialog>
