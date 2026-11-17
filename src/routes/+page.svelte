<script lang="ts">
	import FeatureCard from '#lib/components/FeatureCard.svelte';
	import HeroShowcase from '#lib/components/HeroShowcase.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { featuredProjects } from '#lib/data/projects.ts';
	import { site } from '#lib/data/site.ts';
	import { fly } from 'svelte/transition';

	// Hero backdrop: the Kodansha House reel, then photos from recent projects.
	import ledRoom from '#lib/assets/projects/adobe-max-2024/cover.jpg?imgSizes=100vw&enhanced';
	import rhythmGame from '#lib/assets/projects/express-polar/train-2.jpg?imgSizes=100vw&enhanced';
	import blueLockCage from '#lib/assets/projects/kodansha-house/la/bluelock-cage.jpg?imgSizes=100vw&enhanced';
	import nitric from '#lib/assets/logos/nitric-concepts.png?enhanced';
	import nationwide from '#lib/assets/logos/nationwide.png?enhanced';
	import miami from '#lib/assets/logos/miami.png?enhanced';
	// SVG wordmark: already tiny and sharp at any size, so it skips the image optimizer.
	import acronym from '#lib/assets/logos/acronym.svg';

	const slides = [
		{
			kind: 'video' as const,
			label: 'Kodansha House New York',
			role: 'Creative Technologist',
			wide: { src: '/video/hero-reel-wide.mp4', poster: '/video/hero-reel-wide.jpg' },
			tall: { src: '/video/hero-reel-tall.mp4', poster: '/video/hero-reel-tall.jpg' }
		},
		{
			kind: 'image' as const,
			image: ledRoom,
			label: 'Adobe MAX 2024 body-tracking LED room',
			role: 'Programmer'
		},
		{
			kind: 'image' as const,
			image: rhythmGame,
			label: 'Express: Polar rhythm minigame',
			role: 'Game Developer'
		},
		{
			kind: 'image' as const,
			image: blueLockCage,
			label: 'Kodansha House Blue Lock game',
			role: 'Innovator'
		}
	];

	const logos = [
		{ src: acronym, name: 'Acronym' },
		{ image: nitric, name: 'Nitric Concepts' },
		{ image: nationwide, name: 'Nationwide' },
		{ image: miami, name: 'Miami University' }
	];
</script>

<HeroShowcase {slides} scrollTarget="#recent-projects">
	{#snippet headline(active)}
		<h1
			class="font-display text-5xl font-bold text-white sm:text-7xl lg:text-8xl"
			aria-label={site.name}
		>
			<!-- Letters assemble one by one on load. -->
			{#each site.name as letter, i (i)}
				<span class="hero-letter" style:--i={i} aria-hidden="true"
					>{letter === ' ' ? ' ' : letter}</span
				>
			{/each}
		</h1>
		<!-- The role rotates with the backdrop; the grid stacks old and new words while they swap. -->
		<p
			class="mt-4 grid font-display text-2xl font-bold tracking-[0.2em] text-white/90 uppercase sm:text-4xl"
			aria-live="polite"
		>
			{#key active}
				<span
					class="col-start-1 row-start-1"
					in:fly={{ y: 24, duration: 600, delay: 150 }}
					out:fly={{ y: -24, duration: 400 }}>{slides[active].role}</span
				>
			{/key}
		</p>
	{/snippet}
</HeroShowcase>

<section id="recent-projects" class="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
	<h2 class="text-center text-4xl font-bold sm:text-5xl" use:reveal>Recent Projects</h2>
	{#if featuredProjects.length}
		<!-- Lead project gets a full-width spotlight; the rest sit in an even row of equal cards. -->
		<div class="mt-12" use:reveal>
			<FeatureCard project={featuredProjects[0]} />
		</div>
		<ul
			class={[
				'mt-6 grid gap-6',
				featuredProjects.length - 1 === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
			]}
		>
			{#each featuredProjects.slice(1) as project, i (project.slug)}
				<li use:reveal={{ delay: i * 100 }}><FeatureCard {project} variant="compact" /></li>
			{/each}
		</ul>
	{/if}
	<div class="mt-10 flex justify-center">
		<a href="/portfolio" class="btn btn-ghost">See all projects</a>
	</div>
</section>

<section id="about-me" class="mx-auto max-w-5xl px-4 pt-32 sm:px-6 lg:px-8">
	<div use:reveal>
		<h2 class="text-center text-4xl font-bold sm:text-5xl">About Me</h2>
		<p class="mt-2 text-center text-xl text-muted">Love games and rock climbing!</p>
	</div>

	<div class="mt-12 flex flex-col items-center gap-10 md:flex-row">
		<div class="space-y-4 text-lg text-muted" use:reveal>
			<p>
				I'm Frazier Kyle, a Creative Technology Programmer at Acronym, building interactive
				experiences that people walk into. I was the lead programmer on Kodansha House in Los
				Angeles and New York: I built the Blue Lock impact-screen game, every iPad UI and the
				takeaway systems, and ran all show control in TouchDesigner, from Dante audio to grandMA
				lighting cues.
			</p>
			<p>
				Before that I made games: Minecraft Marketplace maps with Nitric Concepts and Mojang, Unreal
				Engine 5 multiplayer projects, and leading Miami University's Game Design Club.
			</p>
		</div>
		<!-- Fixed-width wrapper: the <picture> enhanced:img renders would otherwise shrink in the row. -->
		<div class="w-64 shrink-0 sm:w-72 lg:w-80" use:reveal={{ delay: 120 }}>
			<enhanced:img
				src="#lib/assets/about/frazier-kyle.jpg"
				alt="Frazier Kyle testing an interactive prop with a laptop in the workshop"
				class="aspect-[4/5] w-full rounded-2xl border-4 border-primary object-cover"
				sizes="(min-width: 1024px) 320px, 288px"
			/>
		</div>
	</div>
	<div class="mt-10 flex justify-center">
		<a href="/contacts" class="btn btn-primary">My resume</a>
	</div>
</section>

<section class="mt-24 bg-surface py-12" aria-label="Where I've worked and studied">
	<ul class="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each logos as logo, i (logo.name)}
			<li class="flex justify-center" use:reveal={{ delay: i * 90 }}>
				{#if logo.image}
					<enhanced:img src={logo.image} alt={logo.name} class="max-h-40 w-auto" sizes="300px" />
				{:else}
					<img src={logo.src} alt={logo.name} class="h-10 w-auto max-w-full sm:h-12" />
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	.hero-letter {
		display: inline-block;
		animation: letter-in 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
		animation-delay: calc(200ms + var(--i) * 45ms);
	}
	@keyframes letter-in {
		from {
			opacity: 0;
			transform: translateY(0.35em) rotate(4deg);
			filter: blur(6px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-letter {
			animation: none;
		}
	}
</style>
