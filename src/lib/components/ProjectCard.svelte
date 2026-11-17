<script lang="ts">
	import { projectHref, type Project } from '#lib/data/projects.ts';

	let { project }: { project: Project } = $props();

	const href = $derived(projectHref(project));
	const external = $derived(!!href && !href.startsWith('/'));
	const company = $derived(project.location.split(' — ')[0]);
</script>

<svelte:element
	this={href ? 'a' : 'article'}
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener' : undefined}
	class="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10"
>
	<div class="relative overflow-hidden">
		<enhanced:img
			src={project.image}
			alt=""
			class="aspect-video w-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
			sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
		/>
		{#if project.caseStudy}
			<span
				class="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur"
				>Case study</span
			>
		{/if}
	</div>
	<div class="flex flex-1 flex-col p-5 sm:p-6">
		<p class="text-xs font-semibold tracking-widest text-primary uppercase">{company}</p>
		<h3 class="mt-1.5 text-xl font-bold text-fg group-hover:text-primary sm:text-2xl">
			{project.title}
		</h3>
		<p class="mt-1 text-sm font-medium text-accent">{project.role}</p>
		<p class="mt-3 mb-4 line-clamp-3 text-sm text-muted">{project.description}</p>
		<div
			class="mt-auto flex items-center justify-between gap-4 border-t border-border/60 pt-4 text-xs text-muted/80"
		>
			<span>{project.date}</span>
			<span
				aria-hidden="true"
				class="text-fg transition group-hover:translate-x-1 group-hover:text-primary"
				>{external ? '↗' : '→'}</span
			>
		</div>
	</div>
</svelte:element>
