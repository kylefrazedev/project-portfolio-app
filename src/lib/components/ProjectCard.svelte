<script lang="ts">
	import { projectHref, type Project } from '#lib/data/projects.ts';

	let { project }: { project: Project } = $props();

	const href = $derived(projectHref(project));
	const external = $derived(!!href && !href.startsWith('/'));
</script>

<svelte:element
	this={href ? 'a' : 'article'}
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener' : undefined}
	class="group block overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10"
>
	<enhanced:img
		src={project.image}
		alt=""
		class="aspect-video w-full object-cover"
		sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
	/>
	<div class="p-6">
		<h2 class="text-2xl font-bold text-fg group-hover:text-primary">{project.title}</h2>
		<p class="mt-1 text-sm font-medium text-accent">{project.role}</p>
		<p class="mt-4 text-muted">{project.description}</p>
		<div class="mt-4 flex justify-between gap-4 text-xs text-muted/80">
			<span>{project.date}</span>
			<span class="text-right">{project.location}</span>
		</div>
	</div>
</svelte:element>
