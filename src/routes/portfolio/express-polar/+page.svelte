<script lang="ts">
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import YouTube from '#lib/components/YouTube.svelte';
</script>

<CaseStudy
	slug="express-polar"
	subtitle="Runaway in the train."
	specs={[
		{ label: 'My role', value: 'Solo Developer' },
		{ label: 'Engine', value: 'Unreal Engine 5.1' },
		{ label: 'Players', value: '1–2' },
		{ label: 'Genre', value: 'Speedrun, Rhythm, Multiplayer, Minigames' },
		{ label: 'Online', value: 'Epic Online Services (EOS)' }
	]}
	next="pursuit-of-laughter"
>
	<Section heading="Gameplay trailer" stacked>
		{#snippet media()}
			<YouTube id="W1c0M_Db2-U" title="Express: Polar gameplay trailer" />
		{/snippet}
	</Section>

	<Section heading="Bringing a train to life">
		<p>
			Express: Polar's hook was a multiplayer experience combining the "rhythm game" and
			"speedrunning" genres, resulting in an exhilarating fusion of music and competition that
			challenges players' reflexes and coordination. Here's a look at the creative process,
			technical challenges, and design decisions that brought it to life.
		</p>
		{#snippet media()}
			<enhanced:img src="#lib/assets/projects/express-polar/cover.jpg" alt="" class="rounded-xl" />
		{/snippet}
	</Section>

	<Section heading="How do I plan randomness?" reverse>
		<p>
			I aimed to craft a distinct experience for every playthrough while staying true to
			speedrunning. To balance challenge and the predictability speedrunners expect, I used several
			key strategies.
		</p>
		<p>
			I built template train assets that load dynamically in a cardinal direction. This eliminates
			randomness that would cause frustrating backtracking, so players keep a consistent sense of
			direction throughout their runs. To add excitement and room for skill expression, occasional
			turns appear in the path.
		</p>
		{#snippet media()}
			<YouTube id="2dG6JJ-lnZM" title="Express: Polar train generation" />
		{/snippet}
	</Section>

	<Section heading="1. Tunable difficulty" level={3} stacked>
		<p>
			Players often find it hard to tailor a game's difficulty to their liking. I solved this with a
			C++ "Train Generator" that gives players more agency: on harder settings, the relentless
			conductor speeds up as time elapses and the number of train segments grows. The difficulty
			rating also controls how often turns appear, giving a dynamic experience that adapts to each
			player.
		</p>
		{#snippet media()}
			<enhanced:img
				src="#lib/assets/projects/express-polar/train-1.jpg"
				alt=""
				class="rounded-xl"
			/>
		{/snippet}
	</Section>

	<Section heading="2. Better together" level={3} stacked>
		<p>
			I wanted to strengthen the bonds with my friends through games, so this one needed to be
			cooperative. I implemented the EOS SDK, using "Buckets" to manage lobbies so players can start
			together and collaborate to reach the end of the train. I also made the setup templatable, so
			I can drop the EOS files from this project into future games to make them multiplayer-ready
			instantly.
		</p>
		{#snippet media()}
			<YouTube id="5zOFjNZDToA" title="Express: Polar multiplayer" />
		{/snippet}
	</Section>

	<Section heading="3. Rhythm minigame" level={3} stacked>
		<p>
			Train conductors sometimes interrupt your journey with a Disney Sing-Along-inspired minigame.
			At first it only worked at certain screen sizes. I fixed this by dynamically repositioning the
			bouncing ball above the text for any screen size, and added backend systems that measure how
			closely you match the conductor's tempo — making the minigame consistent and more engaging on
			every device.
		</p>
		{#snippet media()}
			<enhanced:img
				src="#lib/assets/projects/express-polar/train-2.jpg"
				alt=""
				class="rounded-xl"
			/>
		{/snippet}
	</Section>
</CaseStudy>
