<script lang="ts">
	import { page } from '$app/state';
	import { nav, site } from '#lib/data/site.ts';
	import logo from '#lib/assets/frazier-logo.png';

	let open = $state(false);

	// Close the mobile menu whenever the route changes.
	$effect(() => {
		void page.url.pathname;
		open = false;
	});
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur">
	<nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<a href="/" class="group flex items-center gap-3" aria-label="{site.name} — home">
			<img
				src={logo}
				alt=""
				class="h-8 w-auto grayscale transition group-hover:grayscale-0"
				width="40"
				height="32"
			/>
			<span class="font-display font-bold">{site.name}</span>
		</a>

		<ul class="hidden items-center gap-1 sm:flex">
			{#each nav as item (item.href)}
				<li>
					<a
						href={item.href}
						class="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg"
						aria-current={page.url.pathname === item.href ? 'page' : undefined}>{item.label}</a
					>
				</li>
			{/each}
		</ul>

		<button
			type="button"
			class="rounded-md p-2 text-muted hover:bg-surface hover:text-fg sm:hidden"
			aria-controls="mobile-menu"
			aria-expanded={open}
			onclick={() => (open = !open)}
		>
			<span class="sr-only">{open ? 'Close' : 'Open'} main menu</span>
			<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				{#if open}
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				{/if}
			</svg>
		</button>
	</nav>

	{#if open}
		<ul id="mobile-menu" class="space-y-1 border-t border-border/60 px-4 pt-2 pb-4 sm:hidden">
			{#each nav as item (item.href)}
				<li>
					<a
						href={item.href}
						onclick={() => (open = false)}
						class="block rounded-md px-3 py-2 font-medium text-muted hover:bg-surface hover:text-fg"
						>{item.label}</a
					>
				</li>
			{/each}
		</ul>
	{/if}
</header>
