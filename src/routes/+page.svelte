<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import FeatureCard from '#lib/components/FeatureCard.svelte';
	import { featuredProjects } from '#lib/data/projects.ts';

	import hero1 from '#lib/assets/hero/stat-gpt.jpg?enhanced';
	import hero2 from '#lib/assets/hero/action-slapstick.png?enhanced';
	import hero3 from '#lib/assets/hero/dino.jpg?enhanced';
	import nitric from '#lib/assets/logos/nitric-concepts.png?enhanced';
	import nationwide from '#lib/assets/logos/nationwide.png?enhanced';
	import miami from '#lib/assets/logos/miami.png?enhanced';

	const slides = [
		{ image: hero1, eyebrow: 'Hello!', title: "I'm a programmer" },
		{ image: hero2, title: 'Game developer' },
		{ image: hero3, title: 'Innovator' }
	];

	const logos = [
		{ image: nitric, name: 'Nitric Concepts' },
		{ image: nationwide, name: 'Nationwide' },
		{ image: miami, name: 'Miami University' }
	];

	const reducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const carousel = {
		options: { loop: true },
		plugins: reducedMotion ? [] : [Autoplay({ delay: 4000, stopOnInteraction: false })]
	};

	let embla: EmblaCarouselType | undefined = $state();
	let selected = $state(0);

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		embla = event.detail;
		embla.on('select', () => (selected = embla!.selectedScrollSnap()));
	}
</script>

<section class="relative px-3 pt-19" aria-roledescription="carousel" aria-label="Introduction">
	<div class="overflow-hidden rounded-3xl" use:emblaCarouselSvelte={carousel} onemblaInit={onInit}>
		<div class="flex">
			{#each slides as slide, i (i)}
				<div
					class="relative h-[calc(100svh-6rem)] min-h-[28rem] min-w-0 flex-[0_0_100%]"
					aria-roledescription="slide"
					aria-label="{i + 1} of {slides.length}"
				>
					<enhanced:img
						src={slide.image}
						alt=""
						class="absolute inset-0 size-full object-cover"
						sizes="100vw"
						fetchpriority={i === 0 ? 'high' : undefined}
						loading={i === 0 ? 'eager' : 'lazy'}
					/>
					<div
						class="absolute inset-0 bg-linear-to-tr from-black via-black/60 to-transparent"
					></div>
					<div class="absolute inset-0 grid place-items-center px-4 text-center">
						<div>
							{#if slide.eyebrow}
								<p class="font-display text-6xl font-bold text-white sm:text-8xl">
									{slide.eyebrow}
								</p>
							{/if}
							<p
								class="mt-3 font-display text-3xl font-bold tracking-widest text-white uppercase sm:text-5xl"
							>
								{slide.title}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="absolute inset-x-0 bottom-6 flex justify-center gap-3">
		{#each slides as slide, i (i)}
			<button
				type="button"
				class="grid h-8 w-10 place-items-center"
				onclick={() => embla?.scrollTo(i)}
				aria-label="Show slide {i + 1}: {slide.title}"
				aria-current={selected === i}
			>
				<span
					class={[
						'h-1 w-full rounded-full transition-colors',
						selected === i ? 'bg-white' : 'bg-white/40'
					]}
				></span>
			</button>
		{/each}
	</div>
</section>

<section id="recent-projects" class="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
	<h1 class="text-center text-4xl font-bold sm:text-5xl">Recent Projects</h1>
	<div class="mt-12 grid gap-6 lg:grid-cols-2">
		{#each featuredProjects as project, i (project.slug)}
			<div class={[i === featuredProjects.length - 1 && i % 2 === 0 && 'lg:col-span-2']}>
				<FeatureCard {project} />
			</div>
		{/each}
	</div>
	<div class="mt-10 flex justify-center">
		<a href="/portfolio" class="btn btn-ghost">See all projects</a>
	</div>
</section>

<section id="about-me" class="mx-auto max-w-5xl px-4 pt-32 sm:px-6 lg:px-8">
	<h2 class="text-center text-4xl font-bold sm:text-5xl">About Me</h2>
	<p class="mt-2 text-center text-xl text-muted">Love games and rock climbing!</p>

	<div class="mt-12 flex flex-col items-center gap-10 md:flex-row">
		<div class="space-y-4 text-lg text-muted">
			<p>
				I'm Frazier Kyle, passionate about games and skilled in designing immersive worlds, levels,
				and environments. As a Developer and Designer at Nitric Concepts, I programmed interactive
				levels and developed background systems for engaging gaming experiences, collaborating with
				Mojang and YouTubers to create popular maps and games. I also led Miami University's Game
				Design Club, mentoring the future of game design.
			</p>
			<p class="font-semibold text-fg">
				I'm seeking computer science and game development opportunities.
			</p>
			<a href="/contacts" class="mt-2 btn btn-primary">My resume</a>
		</div>
		<enhanced:img
			src="#lib/assets/about/gdc-me.png"
			alt="Frazier Kyle at GDC"
			class="size-64 shrink-0 rounded-full border-4 border-primary object-cover sm:size-80"
		/>
	</div>
</section>

<section class="mt-24 bg-surface py-12" aria-label="Where I've worked and studied">
	<ul class="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:grid-cols-3">
		{#each logos as logo (logo.name)}
			<li class="flex justify-center">
				<enhanced:img src={logo.image} alt={logo.name} class="max-h-40 w-auto" sizes="300px" />
			</li>
		{/each}
	</ul>
</section>
