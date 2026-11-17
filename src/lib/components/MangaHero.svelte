<script lang="ts" module>
	import type { Picture } from '@sveltejs/enhanced-img';

	export type HeroPanel = {
		image: Picture;
		alt: string;
		/** CSS object-position, to keep the subject inside its slanted panel. */
		focus?: string;
	};
</script>

<script lang="ts">
	/**
	 * Full-bleed hero built like a manga page: photos sit in slanted panels with gutters between
	 * them, under a screentone dot texture, fading into the page where the title sits.
	 * Panels slide in on load and slowly drift; motion is skipped for reduced-motion users.
	 */
	import type { Snippet } from 'svelte';

	let { panels, children }: { panels: HeroPanel[]; children: Snippet } = $props();

	// Each panel's box (left/width, % of the hero) and its slanted outline within that box.
	// Gutters are 1% wide; edges lean left by 8% of the hero's width from top to bottom.
	const LAYOUTS: Record<number, { left: number; width: number; clip: string }[]> = {
		1: [{ left: 0, width: 100, clip: 'none' }],
		2: [
			{ left: 0, width: 56, clip: 'polygon(0 0, 100% 0, 85.7% 100%, 0 100%)' },
			{ left: 49, width: 51, clip: 'polygon(15.7% 0, 100% 0, 100% 100%, 0 100%)' }
		],
		3: [
			{ left: 0, width: 38, clip: 'polygon(0 0, 100% 0, 78.9% 100%, 0 100%)' },
			{ left: 31, width: 33, clip: 'polygon(24.2% 0, 100% 0, 81.8% 100%, 0 100%)' },
			{ left: 59, width: 41, clip: 'polygon(14.6% 0, 100% 0, 100% 100%, 0 100%)' }
		]
	};
	const shown = $derived(panels.slice(0, 3));
	const layout = $derived(LAYOUTS[shown.length] ?? LAYOUTS[1]);
</script>

<div class="manga-hero relative isolate overflow-hidden">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		{#each shown as panel, i (i)}
			<div
				class="manga-panel absolute inset-y-0 overflow-hidden"
				style:left="{layout[i].left}%"
				style:width="{layout[i].width}%"
				style:clip-path={layout[i].clip}
				style:--i={i}
			>
				<enhanced:img
					src={panel.image}
					alt=""
					class="manga-photo size-full object-cover"
					style="object-position: {panel.focus ?? 'center'}"
					sizes="(min-width: 640px) 45vw, 70vw"
					fetchpriority={i === 0 ? 'high' : undefined}
				/>
			</div>
		{/each}
		<!-- Screentone dots, then a fade into the page so the title reads cleanly. -->
		<div class="screentone absolute inset-0"></div>
		<div
			class="absolute inset-x-0 top-0 -bottom-px bg-linear-to-t from-bg from-10% via-bg/75 to-bg/10"
		></div>
		<div class="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-bg/80 to-transparent"></div>
	</div>

	<div
		class="flex min-h-[30rem] flex-col justify-end pt-28 pb-10 sm:min-h-[36rem] lg:min-h-[40rem]"
	>
		{@render children()}
	</div>
	<span class="sr-only">Photos: {shown.map((p) => p.alt).join('; ')}</span>
</div>

<style>
	.screentone {
		background-image: radial-gradient(rgb(0 0 0 / 0.55) 1px, transparent 1.4px);
		background-size: 6px 6px;
		mix-blend-mode: multiply;
		opacity: 0.55;
	}

	.manga-panel {
		animation: panel-in 900ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
		animation-delay: calc(var(--i) * 140ms);
	}
	.manga-photo {
		transform-origin: center;
		animation: drift 22s ease-in-out infinite alternate;
		animation-delay: calc(var(--i) * -7s);
		filter: saturate(1.1) contrast(1.05);
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: translateY(2.5rem) scale(1.04);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes drift {
		from {
			transform: scale(1.04) translate(-1%, 0);
		}
		to {
			transform: scale(1.14) translate(1%, -2%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.manga-panel,
		.manga-photo {
			animation: none;
		}
		.manga-photo {
			transform: scale(1.04);
		}
	}
</style>
