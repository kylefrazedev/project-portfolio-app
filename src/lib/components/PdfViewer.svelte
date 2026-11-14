<script lang="ts">
	/** Uses the browser's built-in PDF viewer, with a link fallback for mobile browsers that lack one. */
	let { src, title }: { src: string; title: string } = $props();
</script>

<div class="mx-auto max-w-5xl px-4 sm:px-6">
	<div class="flex justify-center">
		<a href={src} class="btn btn-primary" target="_blank" rel="noopener">Open {title} (PDF) ↗</a>
	</div>
	<object
		data={src}
		type="application/pdf"
		{title}
		class="mt-8 hidden h-[80vh] w-full rounded-xl border border-border bg-surface md:block"
	>
		<p class="p-6 text-center text-muted">
			Your browser can't display PDFs inline. <a href={src} class="text-accent underline"
				>Download the PDF</a
			>.
		</p>
	</object>
</div>
