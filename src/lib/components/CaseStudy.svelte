<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getProject } from '#lib/data/projects.ts';
	import FeatureCard from './FeatureCard.svelte';
	import MangaHero, { type HeroPanel } from './MangaHero.svelte';

	type Spec = { label: string; value: string; href?: string };
	type RepoLink = { label: string; href: string };

	let {
		slug,
		heading,
		subtitle,
		specs = [],
		repos = [],
		next,
		heroPanels,
		hero,
		feature,
		children
	}: {
		/** Project slug from projects.ts; used for the page title and meta description. */
		slug: string;
		/** Overrides the project title for the page heading. */
		heading?: string;
		subtitle: string;
		specs?: Spec[];
		repos?: RepoLink[];
		/** Slug of the project to suggest at the bottom of the page. */
		next?: string;
		/** Photos (1–3) for a manga-panel hero behind the title. */
		heroPanels?: HeroPanel[];
		/** Full-bleed visual behind the title; it receives the title block to place inside itself. */
		hero?: Snippet<[Snippet]>;
		/** Main media (e.g. a video). On wide screens the specs sit beside it. */
		feature?: Snippet;
		children: Snippet;
	} = $props();

	const project = $derived(getProject(slug));
	const nextProject = $derived(next ? getProject(next) : undefined);
</script>

<svelte:head>
	<title>{project.title} — Frazier Kyle</title>
	<meta name="description" content={project.description} />
</svelte:head>

{#snippet header()}
	<header class="mx-auto max-w-4xl px-4 text-center sm:px-6">
		<h1 class="text-gradient text-4xl font-bold sm:text-6xl">{heading ?? project.title}</h1>
		<p class="mt-4 text-xl text-muted sm:text-2xl">{subtitle}</p>
	</header>
{/snippet}

<article class={hero || heroPanels?.length ? '' : 'pt-28'}>
	{#if hero}
		{@render hero(header)}
	{:else if heroPanels?.length}
		<MangaHero panels={heroPanels}>{@render header()}</MangaHero>
	{:else}
		{@render header()}
	{/if}

	{#snippet specList()}
		<h2 id="specs-heading" class="mb-3 text-lg font-bold text-muted">Project specifications</h2>
		<dl class="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
			{#each specs as spec (spec.label)}
				<div class="grid grid-cols-3 gap-4 px-4 py-3">
					<dt class="font-medium text-muted">{spec.label}</dt>
					<dd class="col-span-2">
						{#if spec.href}
							<a href={spec.href} class="text-accent hover:underline" target="_blank" rel="noopener"
								>{spec.value} ↗</a
							>
						{:else}
							{spec.value}
						{/if}
					</dd>
				</div>
			{/each}
		</dl>
	{/snippet}

	{#if feature}
		<div
			class="mx-auto mt-12 grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:px-8"
		>
			<div class="min-w-0">{@render feature()}</div>
			{#if specs.length}
				<section aria-labelledby="specs-heading">{@render specList()}</section>
			{/if}
		</div>
	{:else if specs.length}
		<section class="mx-auto mt-12 max-w-2xl px-4 sm:px-6" aria-labelledby="specs-heading">
			{@render specList()}
		</section>
	{/if}

	<div class="mt-16 space-y-16">
		{@render children()}
	</div>

	{#if repos.length}
		<section class="mx-auto mt-16 max-w-2xl px-4 text-center sm:px-6">
			<h2 class="text-2xl font-bold">Source code</h2>
			<ul class="mt-4 flex flex-wrap justify-center gap-3">
				{#each repos as repo (repo.href)}
					<li>
						<a href={repo.href} class="btn btn-ghost" target="_blank" rel="noopener"
							>{repo.label} ↗</a
						>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<section class="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
		{#if nextProject}
			<h2 class="mb-8 text-center text-3xl font-bold">Check out my other projects</h2>
			<FeatureCard project={nextProject} />
		{/if}
		<div class="mt-8 flex justify-center">
			<a href="/portfolio" class="btn btn-ghost">See all projects</a>
		</div>
	</section>
</article>
