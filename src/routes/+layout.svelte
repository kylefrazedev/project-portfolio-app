<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { site } from '#lib/data/site.ts';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<a
	href="#main"
	class="sr-only z-[60] rounded-md bg-primary px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
	>Skip to content</a
>

<Nav />

<main id="main">
	{@render children()}
</main>

<Footer />
