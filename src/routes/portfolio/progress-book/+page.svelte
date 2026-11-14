<script lang="ts">
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import PdfViewer from '#lib/components/PdfViewer.svelte';
</script>

<CaseStudy
	slug="progress-book"
	heading="XR Progress Book"
	subtitle="Projects my team created for our senior design project at Miami University."
	next="xr-opening"
>
	<PdfViewer src="/progress-book.pdf" title="2024 Miami University Project Book" />
</CaseStudy>
