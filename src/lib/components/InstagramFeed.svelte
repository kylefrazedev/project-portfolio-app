<script lang="ts">
	/**
	 * Links to Instagram accounts plus official embeds of hand-picked reels.
	 * Instagram has no public API for showing other accounts' feeds, so reels are listed by hand.
	 * The embed script is only loaded when there are reels to show.
	 */
	import { onMount } from 'svelte';

	type Reel = {
		/** Account that posted it, without the @. */
		account: string;
		/** The post's shortcode, from instagram.com/reel/<code>/ or instagram.com/p/<code>/. */
		code: string;
		/** 'reel' (default) for videos, 'p' for photo/carousel posts. */
		type?: 'reel' | 'p';
		/** Short description, used as the fallback link text before the embed loads. */
		title: string;
	};

	let {
		accounts,
		blurb,
		reels = []
	}: {
		/** Handles (without the @) to link to. */
		accounts: string[];
		blurb: string;
		reels?: Reel[];
	} = $props();

	onMount(() => {
		if (!reels.length) return;
		const w = window as typeof window & { instgrm?: { Embeds: { process(): void } } };
		if (w.instgrm) {
			w.instgrm.Embeds.process();
			return;
		}
		const script = document.createElement('script');
		script.src = 'https://www.instagram.com/embed.js';
		script.async = true;
		document.body.append(script);
	});
</script>

<section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-labelledby="instagram-heading">
	<div class="rounded-2xl bg-surface p-6 sm:p-10">
		<div class="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
			<div>
				<h2 id="instagram-heading" class="text-3xl font-bold sm:text-4xl">On Instagram</h2>
				<p class="mt-2 text-lg text-muted">{blurb}</p>
			</div>
			<ul class="flex flex-wrap gap-3">
				{#each accounts as account (account)}
					<li>
						<a
							href="https://www.instagram.com/{account}/"
							class="btn btn-ghost"
							target="_blank"
							rel="noopener"
						>
							<svg
								viewBox="0 0 24 24"
								class="size-5"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								aria-hidden="true"
							>
								<rect x="3" y="3" width="18" height="18" rx="5" />
								<circle cx="12" cy="12" r="4" />
								<circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
							</svg>
							@{account}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		{#if reels.length}
			<ul
				class={[
					'mt-8 grid items-start gap-6',
					reels.length === 1 && 'mx-auto max-w-md',
					reels.length === 2 && 'mx-auto max-w-4xl sm:grid-cols-2',
					reels.length > 2 && 'sm:grid-cols-2 lg:grid-cols-3'
				]}
			>
				{#each reels as reel (reel.code)}
					<li class="min-w-0">
						<blockquote
							class="instagram-media"
							data-instgrm-permalink="https://www.instagram.com/{reel.type ?? 'reel'}/{reel.code}/"
							data-instgrm-version="14"
							style="background:#fff;border:0;border-radius:12px;margin:0;max-width:540px;min-width:260px;width:100%"
						>
							<a
								href="https://www.instagram.com/{reel.type ?? 'reel'}/{reel.code}/"
								target="_blank"
								rel="noopener"
								class="block p-6 text-center text-bg"
								>{reel.title} — watch on Instagram (@{reel.account})</a
							>
						</blockquote>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
