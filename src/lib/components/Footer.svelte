<script lang="ts">
	import { site } from '#lib/data/site.ts';

	const year = new Date().getFullYear();
</script>

<footer class="mt-24 border-t border-border/60">
	<div
		class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
	>
		<p>© {year} {site.name}. All rights reserved.</p>
		<ul class="flex flex-wrap gap-x-6 gap-y-2">
			<li><a href="/contacts" class="hover:text-fg">Contact / Resume</a></li>
			<li><a href={site.linkedin} class="hover:text-fg" rel="noopener">LinkedIn</a></li>
			<li><a href={site.github} class="hover:text-fg" rel="noopener">GitHub</a></li>
			<li><a href={site.repo} class="hover:text-fg" rel="noopener">Site source</a></li>
		</ul>
	</div>
</footer>
