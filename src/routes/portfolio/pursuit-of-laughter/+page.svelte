<script lang="ts">
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import YouTube from '#lib/components/YouTube.svelte';
	// Animated GIFs are served as-is (the image optimizer would flatten them).
	import maps from '#lib/assets/projects/pursuit-of-laughter/maps.gif';
	import players from '#lib/assets/projects/pursuit-of-laughter/players.gif';
</script>

<CaseStudy
	slug="pursuit-of-laughter"
	subtitle="Kill for the Jester God."
	specs={[
		{
			label: 'Itch.io',
			value: 'Store page',
			href: 'https://bigninjachicken.itch.io/pursuit-of-laughter'
		},
		{ label: 'My role', value: 'Lead Developer' },
		{ label: 'Engine', value: 'Unreal Engine 5.3' },
		{ label: 'Players', value: '1–15' },
		{ label: 'Genre', value: 'Rogue-lite, Story, Multiplayer' },
		{ label: 'Online', value: 'Steam' }
	]}
	repos={[
		{ label: 'Unreal Engine game', href: 'https://github.com/BigNinjaChicken/ProjectCompany' }
	]}
	next="rounds-on-me"
>
	<Section heading="Trailer" stacked>
		{#snippet media()}
			<YouTube id="1bjRaZUfqD0" title="Pursuit Of Laughter trailer" />
		{/snippet}
	</Section>

	<Section heading="Gameplay demo" stacked>
		{#snippet media()}
			<YouTube id="t75QsXLaVzo" title="Pursuit Of Laughter gameplay demo" />
		{/snippet}
	</Section>

	<Section heading="About the game">
		<p>
			Pursuit Of Laughter was built by a team of six under my leadership, with me handling all the
			programming. Players are a lost soul resurrected by the Jester God and sent back to the Earth
			Realm to collect souls on his behalf.
		</p>
		<p>
			The journey takes you through kingdoms where you confront knights and sacred bosses. Each
			victory brings you closer to your goal and grows your arsenal of items, preparing you for the
			challenges ahead.
		</p>
		<p><em>Began as a game jam (hackathon) game and kept improving afterwards.</em></p>
		{#snippet media()}
			<enhanced:img
				src="#lib/assets/projects/pursuit-of-laughter/armory-amusement.png"
				alt=""
				class="rounded-xl"
			/>
		{/snippet}
	</Section>

	<Section heading="Level creation" reverse>
		<p>
			We merged randomized levels with controlled design for a fair yet challenging experience. I
			built a tool for precise block placement that controls tile orientation and boss encounter
			starting points, directing the player's journey through the game.
		</p>
		<p>
			To improve multiplayer performance and minimize latency, each level is instantiated
			independently. Scripts in each tile allow flexible customization of boss, player, and enemy
			positions, level start points, and kill zones — enabling precise tuning of difficulty and
			playability.
		</p>
		{#snippet media()}
			<img src={maps} alt="Procedurally assembled level tiles" class="rounded-xl" loading="lazy" />
		{/snippet}
	</Section>

	<Section heading="1. Leading programming with teams" level={3} stacked>
		<p>
			As team lead and programmer, my goal was to maximize efficiency. I set up project management
			in Trello to keep everyone updated. While developing the AI, I realized enemies needed a basic
			punch, so I designed a modular "Bite" component that can be added to any enemy class. Working
			with our boss scripter, we found more uses for it — because it was modular and abstract, it
			slotted in effortlessly, adding depth to our AI.
		</p>
		{#snippet media()}
			<enhanced:img
				src="#lib/assets/projects/pursuit-of-laughter/group-pic.jpg"
				alt="The Pursuit Of Laughter team"
				class="rounded-xl"
			/>
		{/snippet}
	</Section>

	<Section heading="2. Multiplayer focus" level={3} stacked>
		<p>
			I've always been passionate about multiplayer, so I integrate component replication early. In
			playtests, starting a dialogue with the Jester God pulled in either every player or only the
			server player. I made dialogues local and used a delegate to notify the server on completion,
			smoothing the transition to the Earth raid and improving multiplayer sync.
		</p>
		{#snippet media()}
			<img
				src={players}
				alt="Several players in a level together"
				class="rounded-xl"
				loading="lazy"
			/>
		{/snippet}
	</Section>

	<Section heading="3. Modular combat design" level={3} stacked>
		<p>
			I built a combat system where allies and enemies share items and abilities across levels. When
			playtesters wanted the spear-throwing ability that only knight enemies had, the system's
			modularity let me adapt it for players by adjusting meshes, particle effects, and values in
			the class blueprint — adding "Spear Spit" to the player's arsenal.
		</p>
		{#snippet media()}
			<enhanced:img
				src="#lib/assets/projects/pursuit-of-laughter/wardens.png"
				alt=""
				class="mx-auto max-h-[70vh] w-auto rounded-xl"
			/>
		{/snippet}
	</Section>
</CaseStudy>
