<script lang="ts">
	/**
	 * Editorial photo grid: a lead photo at 2×2, uniform tiles after it, and the last tile
	 * stretched so rows always end flush. Tiles fade up as they scroll into view and the photos
	 * drift slightly with scroll (where the browser supports scroll-driven animations).
	 */
	import type { Picture } from '@sveltejs/enhanced-img';
	import { reveal } from '#lib/actions/reveal.ts';

	let {
		heading,
		intro,
		images,
		credit
	}: {
		heading: string;
		intro?: string;
		images: { src: Picture; caption: string }[];
		/** Photo credit link shown under the grid. */
		credit?: { label: string; href: string };
	} = $props();

	/** Span classes for the last tile so neither the 2-column nor the 3-column grid ends ragged. */
	function lastTileSpan(count: number) {
		const classes = [];
		if (count > 1 && (count - 1) % 2 === 1) classes.push('col-span-2');
		const lgRemainder = (count - 3) % 3; // after the 2×2 lead + the two tiles beside it
		if (count > 3 && lgRemainder === 1) classes.push('lg:col-span-3');
		else if (count > 3 && lgRemainder === 2) classes.push('lg:col-span-2');
		else if (classes.length) classes.push('lg:col-span-1');
		return classes;
	}
</script>

<section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2 class="text-3xl font-bold sm:text-4xl">{heading}</h2>
			{#if intro}
				<p class="mt-3 max-w-3xl text-lg text-muted">{intro}</p>
			{/if}
		</div>
		<p class="text-sm text-muted">{images.length} photos · click to expand</p>
	</div>

	<ul
		class="mt-8 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-3"
	>
		{#each images as image, i (image.caption)}
			<li
				use:reveal={{ delay: (i % 3) * 90 }}
				class={[
					'gallery-tile group relative overflow-hidden rounded-2xl bg-surface',
					'[&_picture]:block [&_picture]:size-full! [&_picture]:rounded-none',
					i === 0 && 'col-span-2 row-span-2',
					i === images.length - 1 && i > 0 && lastTileSpan(images.length)
				]}
			>
				<enhanced:img
					src={image.src}
					alt={image.caption}
					class="gallery-photo size-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
					sizes={i === 0
						? '(min-width: 1024px) 760px, 100vw'
						: '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 50vw'}
				/>
				<div
					class="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 via-black/20 to-transparent pt-10 pr-14 pb-3 pl-4"
				>
					<p class={['leading-snug text-white/70', i === 0 ? 'text-sm' : 'text-xs']}>
						{image.caption}
					</p>
				</div>
			</li>
		{/each}
	</ul>

	{#if credit}
		<p class="mt-4 text-sm text-muted">
			Photos: <a
				href={credit.href}
				class="text-accent hover:underline"
				target="_blank"
				rel="noopener">{credit.label}</a
			>
		</p>
	{/if}
</section>

<style>
	/* Gentle parallax: each photo drifts as its tile crosses the viewport. */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.gallery-photo {
				animation: gallery-drift linear both;
				animation-timeline: view();
				animation-range: cover;
			}
		}
	}
	@keyframes gallery-drift {
		from {
			transform: translateY(-5%) scale(1.1);
		}
		to {
			transform: translateY(5%) scale(1.1);
		}
	}
</style>
