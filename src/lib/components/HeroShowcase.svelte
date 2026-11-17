<script lang="ts">
	/**
	 * Home-page hero: one fixed headline over a cross-fading backdrop of a video and photos.
	 * - Slides cross-fade; photos slowly zoom while they're on screen.
	 * - Progress bars fill over each slide's time and double as slide buttons.
	 * - Autoplay pauses while dragging or when keyboard focus is inside, and swipes/drags change slides.
	 * - With reduced motion: no autoplay, no zoom, and the video waits on its poster.
	 */
	import { onMount, untrack, type Snippet } from 'svelte';
	import type { Picture } from '@sveltejs/enhanced-img';

	type Slide =
		| { kind: 'image'; image: Picture; label: string }
		| {
				kind: 'video';
				label: string;
				wide: { src: string; poster: string };
				tall: { src: string; poster: string };
		  };

	let {
		slides,
		imageSeconds = 6,
		scrollTarget,
		headline
	}: {
		slides: Slide[];
		imageSeconds?: number;
		/** Where the scroll cue in the corner links to (e.g. '#recent-projects'). */
		scrollTarget?: string;
		/** Overlaid text; receives the active slide's index so it can change with the slides. */
		headline: Snippet<[number]>;
	} = $props();

	let active = $state(0);
	let leaving = $state(-1); // the slide fading out, so its zoom holds instead of snapping back
	let progress = $state(0); // 0–1 through the active slide
	let focused = $state(false);
	let dragging = $state(false);
	let reducedMotion = $state(false);
	let portrait = $state(false);
	let video: HTMLVideoElement | undefined = $state();

	const paused = $derived(focused || dragging || reducedMotion);
	const current = $derived(slides[active]);

	function go(index: number) {
		leaving = active;
		active = (index + slides.length) % slides.length;
		progress = 0;
	}

	// When the video slide comes up, start it from the beginning; when it leaves, stop it.
	$effect(() => {
		if (!video) return;
		if (current.kind === 'video' && !reducedMotion) {
			video.currentTime = 0;
			if (!untrack(() => paused)) video.play().catch(() => {});
		} else {
			video.pause();
		}
	});
	$effect(() => {
		if (!video || current.kind !== 'video' || reducedMotion) return;
		if (paused) video.pause();
		else video.play().catch(() => {});
	});

	onMount(() => {
		const motion = matchMedia('(prefers-reduced-motion: reduce)');
		const orientation = matchMedia('(orientation: portrait)');
		const sync = () => {
			reducedMotion = motion.matches;
			portrait = orientation.matches;
		};
		sync();
		motion.addEventListener('change', sync);
		orientation.addEventListener('change', sync);

		// One clock drives progress: video time for the video slide, elapsed time for photos.
		let last = performance.now();
		let frame = requestAnimationFrame(function tick(now) {
			// Cap the step so a stalled or backgrounded tab doesn't skip slides when it resumes.
			const dt = Math.min((now - last) / 1000, 0.1);
			last = now;
			if (!paused) {
				if (current.kind === 'video' && video && video.duration) {
					progress = Math.min(video.currentTime / video.duration, 1);
				} else if (current.kind === 'image') {
					progress = Math.min(progress + dt / imageSeconds, 1);
					if (progress >= 1) go(active + 1);
				}
			}
			frame = requestAnimationFrame(tick);
		});
		return () => {
			cancelAnimationFrame(frame);
			motion.removeEventListener('change', sync);
			orientation.removeEventListener('change', sync);
		};
	});

	// Swipe / drag between slides.
	let startX = 0;
	function onpointerdown(event: PointerEvent) {
		if ((event.target as Element).closest('a, button')) return;
		dragging = true;
		startX = event.clientX;
	}
	function onpointerup(event: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		const dx = event.clientX - startX;
		if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
	}
	// Depth: the backdrop drifts against the mouse and the headline drifts with it (fine pointers only).
	let stage: HTMLDivElement;
	function onpointermove(event: PointerEvent) {
		if (event.pointerType !== 'mouse' || reducedMotion) return;
		const box = stage.getBoundingClientRect();
		stage.style.setProperty('--mx', (((event.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
		stage.style.setProperty('--my', (((event.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
	}
	function resetDepth() {
		stage?.style.setProperty('--mx', '0');
		stage?.style.setProperty('--my', '0');
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') go(active + 1);
		if (event.key === 'ArrowLeft') go(active - 1);
	}
</script>

<!-- Carousel region: arrow keys change slides; keyboard focus or dragging pauses autoplay. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
	class="relative px-3 pt-19 select-none"
	aria-roledescription="carousel"
	aria-label="Introduction"
	onpointerleave={() => {
		dragging = false;
		resetDepth();
	}}
	onfocusin={(e) => (focused = (e.target as Element).matches(':focus-visible'))}
	onfocusout={() => (focused = false)}
	{onkeydown}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={stage}
		class:is-paused={paused}
		class="hero-stage relative h-[calc(100svh-6rem)] min-h-[30rem] cursor-grab touch-pan-y overflow-hidden rounded-3xl bg-surface active:cursor-grabbing"
		{onpointerdown}
		{onpointerup}
		{onpointermove}
		onpointercancel={() => (dragging = false)}
	>
		<div class="hero-backdrop absolute inset-0">
			{#each slides as slide, i (i)}
				<div
					class={[
						'hero-slide absolute inset-0',
						i === active && 'is-active',
						i === leaving && i !== active && 'is-leaving'
					]}
					style:--zoom-seconds="{imageSeconds + 1.5}s"
					aria-roledescription="slide"
					aria-label="{i + 1} of {slides.length}: {slide.label}"
					aria-hidden={i !== active}
				>
					{#if slide.kind === 'video'}
						{@const source = portrait ? slide.tall : slide.wide}
						<video
							bind:this={video}
							class="size-full object-cover"
							src={source.src}
							poster={source.poster}
							muted
							playsinline
							preload={i === 0 ? 'auto' : 'metadata'}
							onended={() => go(active + 1)}
							aria-hidden="true"
						></video>
					{:else}
						<enhanced:img
							src={slide.image}
							alt=""
							draggable="false"
							class="hero-photo size-full object-cover"
							sizes="100vw"
							loading={i <= 1 ? 'eager' : 'lazy'}
						/>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Legibility: darken toward the centre-bottom where the headline sits. -->
		<div
			class="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center] from-black/65 via-black/45 to-black/25"
		></div>
		<div
			class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent"
		></div>

		<div class="hero-headline absolute inset-0 grid place-items-center px-6 text-center">
			<div class="hero-headline-depth max-w-3xl">{@render headline(active)}</div>
		</div>

		{#if scrollTarget}
			<a
				href={scrollTarget}
				class="hero-scroll absolute right-6 bottom-6 hidden items-center gap-2 text-xs font-medium tracking-[0.2em] text-white/70 uppercase hover:text-white sm:flex"
			>
				Scroll
				<svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2"
					><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-6-6 6 6 6-6" /></svg
				>
			</a>
		{/if}

		<div class="absolute inset-x-0 bottom-6 flex justify-center gap-2 px-6">
			{#each slides as slide, i (i)}
				<button
					type="button"
					class="group grid h-8 w-12 place-items-center sm:w-16"
					onclick={() => go(i)}
					aria-label="Show slide {i + 1}: {slide.label}"
					aria-current={active === i}
				>
					<span class="relative h-1 w-full overflow-hidden rounded-full bg-white/30">
						<span
							class="absolute inset-y-0 left-0 rounded-full bg-white"
							style:width="{i < active ? 100 : i === active ? progress * 100 : 0}%"
						></span>
					</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero-slide {
		opacity: 0;
		transition: opacity 1.2s ease;
	}
	.hero-slide.is-active {
		opacity: 1;
	}
	/* Slow zoom on the visible photo; it restarts each time the slide comes back. */
	.hero-slide.is-active :global(.hero-photo) {
		animation: hero-zoom var(--zoom-seconds) linear both;
	}
	@keyframes hero-zoom {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.08);
		}
	}
	/* The outgoing photo keeps its zoom frozen while it fades out. */
	.hero-slide.is-leaving :global(.hero-photo) {
		animation: hero-zoom var(--zoom-seconds) linear both;
		animation-play-state: paused;
	}
	.hero-stage.is-paused .hero-slide.is-active :global(.hero-photo) {
		animation-play-state: paused;
	}
	/* Depth on mouse move: backdrop moves against the cursor, headline with it. */
	.hero-backdrop {
		transform: translate3d(calc(var(--mx, 0) * -14px), calc(var(--my, 0) * -10px), 0) scale(1.04);
		transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	.hero-headline-depth {
		transform: translate3d(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 6px), 0);
		transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	.hero-scroll svg {
		animation: hero-bob 1.8s ease-in-out infinite;
	}
	@keyframes hero-bob {
		50% {
			transform: translateY(4px);
		}
	}

	/* On the way out: the stage recedes and the headline lifts away as the hero scrolls off. */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.hero-stage {
				view-timeline: --hero block;
				animation: hero-recede linear both;
				animation-timeline: --hero;
				animation-range: exit 0% exit 100%;
			}
			.hero-headline {
				animation: hero-lift linear both;
				animation-timeline: --hero;
				animation-range: exit 0% exit 55%;
			}
		}
	}
	@keyframes hero-recede {
		to {
			transform: scale(0.93);
			opacity: 0.45;
		}
	}
	@keyframes hero-lift {
		to {
			transform: translateY(-12vh);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-slide {
			transition: none;
		}
		.hero-backdrop,
		.hero-headline-depth {
			transform: none;
			transition: none;
		}
		.hero-scroll svg {
			animation: none;
		}
		.hero-slide.is-active :global(.hero-photo) {
			animation: none;
		}
	}
</style>
