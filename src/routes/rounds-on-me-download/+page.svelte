<script lang="ts">
	// The game build used to be self-hosted here (/Windows1.4.zip) but that file was never
	// committed, so downloads now go through the itch.io page.
	const itch = 'https://bigninjachicken.itch.io/rounds-on-me';
</script>

<svelte:head>
	<title>Download Rounds On Me — Frazier Kyle</title>
</svelte:head>

<div class="grid min-h-[70svh] place-items-center px-4 pt-28 text-center">
	<div>
		<h1 class="text-gradient text-5xl font-bold">Rounds On Me</h1>
		<a href={itch} class="mt-8 btn btn-primary px-10 py-5 text-lg" rel="noopener">
			Download on itch.io ↗
		</a>
		<p class="mt-6">
			<a href="/portfolio/rounds-on-me" class="text-accent hover:underline">About the game</a>
		</p>
	</div>
</div>
