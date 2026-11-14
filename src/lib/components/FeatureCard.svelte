<script lang="ts">
	import { projectHref, type Project } from '#lib/data/projects.ts';

	let { project }: { project: Project } = $props();
</script>

<a
	href={projectHref(project)}
	class="group grid items-center gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-4 transition hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 sm:grid-cols-2 sm:p-6"
>
	<div class="order-2 sm:order-1">
		<h3 class="text-3xl font-bold text-fg group-hover:text-primary">
			{project.title}{#if project.tagline}<span class="text-muted"> — {project.tagline}</span>{/if}
		</h3>
		<p class="mt-2 font-medium text-accent">{project.role}</p>
		<p class="mt-4 text-lg text-muted">{project.description}</p>
		<p class="mt-4 text-sm text-muted/80">{project.date}</p>
	</div>
	<enhanced:img
		src={project.featureImage ?? project.image}
		alt=""
		class="order-1 w-full rounded-xl object-cover sm:order-2"
		sizes="(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw"
	/>
</a>
