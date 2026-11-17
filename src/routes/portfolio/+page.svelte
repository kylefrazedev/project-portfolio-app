<script lang="ts">
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { projects } from '#lib/data/projects.ts';

	// Projects are already sorted newest first, so grouping keeps years in descending order.
	const years: { year: string; items: typeof projects }[] = [];
	for (const project of projects) {
		const year = project.sortDate.slice(0, 4);
		const last = years.at(-1);
		if (last?.year === year) last.items.push(project);
		else years.push({ year, items: [project] });
	}
</script>

<svelte:head>
	<title>All Projects — Frazier Kyle</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
	<header>
		<h1 class="text-4xl font-bold sm:text-5xl">All Projects</h1>
		<p class="mt-3 max-w-xl text-sm text-muted">
			Newest first. Some work can't be shown because of non-disclosure agreements.
		</p>
	</header>

	<div class="mt-12 space-y-12">
		{#each years as group (group.year)}
			<section aria-labelledby="year-{group.year}">
				<div class="mb-5 flex items-center gap-3">
					<h2 id="year-{group.year}" class="text-lg font-medium text-muted">{group.year}</h2>
					<span class="h-px flex-1 bg-border/50"></span>
					<span class="text-xs text-muted/70">
						{group.items.length}
						{group.items.length === 1 ? 'project' : 'projects'}
					</span>
				</div>
				<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each group.items as project, i (project.slug)}
						<li use:reveal={{ delay: (i % 3) * 80 }}>
							<ProjectCard {project} />
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</div>
