<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		heading,
		level = 2,
		media,
		reverse = false,
		stacked = false,
		children
	}: {
		heading?: string;
		level?: 2 | 3;
		/** Image/video shown beside (or below, when `stacked`) the text. */
		media?: Snippet;
		/** Put the media on the left on wide screens. */
		reverse?: boolean;
		/** Text above, media full-width below. */
		stacked?: boolean;
		children?: Snippet;
	} = $props();
</script>

<section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
	<div
		class={[
			'grid items-center gap-8 rounded-2xl bg-surface p-6 sm:p-10',
			!stacked && media && 'md:grid-cols-2'
		]}
	>
		{#if heading || children}
			<div class={[reverse && !stacked && 'md:order-2', stacked && 'mx-auto max-w-3xl']}>
				{#if heading}
					<svelte:element
						this={'h' + level}
						class={level === 2 ? 'text-3xl font-bold sm:text-4xl' : 'text-2xl font-bold'}
					>
						{heading}
					</svelte:element>
				{/if}
				<div class="prose mt-4 max-w-none text-lg prose-invert prose-p:text-muted">
					{@render children?.()}
				</div>
			</div>
		{/if}
		{#if media}
			<div class={[stacked && 'mx-auto w-full max-w-4xl']}>
				{@render media()}
			</div>
		{/if}
	</div>
</section>
