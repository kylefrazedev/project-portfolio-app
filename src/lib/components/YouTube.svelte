<script lang="ts">
	/**
	 * Lightweight YouTube embed: shows the thumbnail and only loads the player iframe on click.
	 */
	let { id, title }: { id: string; title: string } = $props();

	let playing = $state(false);
</script>

<div class="relative aspect-video w-full overflow-hidden rounded-xl bg-surface">
	{#if playing}
		<iframe
			class="absolute inset-0 size-full"
			src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1"
			{title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	{:else}
		<button
			type="button"
			class="group absolute inset-0 size-full"
			onclick={() => (playing = true)}
			aria-label="Play video: {title}"
		>
			<img
				src="https://i.ytimg.com/vi/{id}/hqdefault.jpg"
				alt=""
				loading="lazy"
				class="size-full object-cover opacity-80 transition group-hover:opacity-100"
			/>
			<span
				class="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-full bg-black/70 transition group-hover:bg-primary"
			>
				<svg viewBox="0 0 24 24" class="ml-1 size-7 fill-white"><path d="M8 5v14l11-7z" /></svg>
			</span>
		</button>
	{/if}
</div>
