<script lang="ts">
	import PdfViewer from '#lib/components/PdfViewer.svelte';
	import { site } from '#lib/data/site.ts';

	const links = [
		{ label: site.phone, href: `tel:${site.phone.replace(/\D/g, '')}`, icon: '📞' },
		{ label: site.email, href: `mailto:${site.email}`, icon: '📨' },
		{ label: 'GitHub', href: site.github, icon: '💾' },
		{ label: 'LinkedIn', href: site.linkedin, icon: '🔗' }
	];
</script>

<svelte:head>
	<title>Contact & Resume — Frazier Kyle</title>
</svelte:head>

<div class="px-4 pt-28 sm:px-6">
	<section class="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8 text-center">
		<h1 class="text-gradient text-5xl font-bold">Contact</h1>
		<p class="mt-4 text-muted">
			Feel free to reach out if you'd like to discuss any of my projects.
		</p>
		<p class="mt-8 text-lg font-medium">Frazier E. Kyle 👋</p>
		<ul class="mt-4 space-y-2 text-lg">
			{#each links as link (link.href)}
				<li>
					<a href={link.href} class="text-accent hover:underline">
						{link.label} <span aria-hidden="true">{link.icon}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</div>

<section class="mt-16" aria-label="Resume">
	<PdfViewer src={site.resume} title="Resume" />
</section>
