<script lang="ts">
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { projects } from '#lib/data/projects.ts';
</script>

<svelte:head>
	<title>All Projects — Frazier Kyle</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
	<h1 class="text-center text-4xl font-bold sm:text-5xl">All Projects</h1>
	<p class="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
		Certain projects cannot be shown due to my commitment to uphold non-disclosure agreements
		(NDAs).
	</p>

	<ul class="mt-12 gap-8 sm:columns-2 lg:columns-3">
		{#each projects as project (project.slug)}
			<li class="mb-8 break-inside-avoid">
				<ProjectCard {project} />
			</li>
		{/each}
	</ul>
</div>
