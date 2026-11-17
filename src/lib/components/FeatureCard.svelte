<script lang="ts">
	import { projectHref, type Project } from '#lib/data/projects.ts';

	let {
		project,
		variant = 'spotlight'
	}: {
		project: Project;
		/**
		 * spotlight: wide card with the image beside the full description (lead project).
		 * compact: image on top, clamped description, built to sit in an even-height row.
		 */
		variant?: 'spotlight' | 'compact';
	} = $props();

	const image = $derived(project.featureImage ?? project.image);
</script>

{#snippet arrow()}
	<svg
		viewBox="0 0 20 20"
		class="size-4 transition-transform group-hover:translate-x-1"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		aria-hidden="true"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M4 10h12m-5-5 5 5-5 5" />
	</svg>
{/snippet}

{#if variant === 'spotlight'}
	<a
		href={projectHref(project)}
		class="group grid overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
	>
		<div class="relative overflow-hidden [&_picture]:block [&_picture]:h-full">
			<enhanced:img
				src={image}
				alt=""
				class="aspect-[16/10] size-full object-cover transition duration-500 group-hover:scale-[1.03] lg:aspect-auto"
				sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 100vw"
			/>
		</div>
		<div class="flex flex-col p-6 sm:p-8">
			{#if project.tagline}
				<p class="text-sm font-semibold tracking-widest text-primary uppercase">
					{project.tagline}
				</p>
			{/if}
			<h3 class="mt-2 text-3xl font-bold text-fg group-hover:text-primary sm:text-4xl">
				{project.title}
			</h3>
			<p class="mt-2 font-medium text-accent">{project.role}</p>
			<p class="mt-4 text-lg text-muted">{project.description}</p>
			<div class="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
				<span class="text-muted/80">{project.date}</span>
				<span class="inline-flex items-center gap-1.5 font-medium text-fg group-hover:text-primary">
					Read the case study {@render arrow()}
				</span>
			</div>
		</div>
	</a>
{:else}
	<a
		href={projectHref(project)}
		class="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10"
	>
		<div class="overflow-hidden">
			<enhanced:img
				src={image}
				alt=""
				class="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.04]"
				sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
			/>
		</div>
		<div class="flex flex-1 flex-col p-5 sm:p-6">
			{#if project.tagline}
				<p class="text-xs font-semibold tracking-widest text-primary uppercase">
					{project.tagline}
				</p>
			{/if}
			<h3 class="mt-1 text-2xl font-bold text-fg group-hover:text-primary">{project.title}</h3>
			<p class="mt-1 text-sm font-medium text-accent">{project.role}</p>
			<p class="mt-3 line-clamp-3 text-muted">{project.description}</p>
			<div class="mt-auto flex items-center justify-between gap-4 pt-5 text-sm">
				<span class="text-muted/80">{project.date}</span>
				<span class="text-fg group-hover:text-primary">{@render arrow()}</span>
			</div>
		</div>
	</a>
{/if}
