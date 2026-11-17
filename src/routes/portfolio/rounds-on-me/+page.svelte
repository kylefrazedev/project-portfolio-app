<script lang="ts">
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import heroLobby from '#lib/assets/projects/rounds-on-me/image-1.jpg?enhanced';
	import heroExpo from '#lib/assets/projects/rounds-on-me/expo.webp?enhanced';
	import Section from '#lib/components/Section.svelte';
	import YouTube from '#lib/components/YouTube.svelte';
</script>

<CaseStudy
	slug="rounds-on-me"
	heroPanels={[
		{ image: heroLobby, alt: 'The Rounds On Me lobby screen', focus: '50% 40%' },
		{ image: heroExpo, alt: 'Showing Rounds On Me at the expo', focus: '40% 40%' }
	]}
	subtitle="A drinking party game."
	specs={[
		{ label: 'Itch.io', value: 'Store page', href: 'https://bigninjachicken.itch.io/rounds-on-me' },
		{ label: 'My role', value: 'Solo Developer' },
		{ label: 'Engine', value: 'Unreal Engine 5.3' },
		{ label: 'Players', value: '2–15' },
		{ label: 'Genre', value: 'Casual, Party Game, Multiplayer' },
		{ label: 'Web app', value: 'SvelteKit, hosted on Render' }
	]}
	repos={[
		{ label: 'Unreal Engine game', href: 'https://github.com/BigNinjaChicken/PartyGameOne' },
		{ label: 'Web app', href: 'https://github.com/BigNinjaChicken/party-game-one' }
	]}
	next="express-polar"
>
	<Section heading="Short trailer" stacked>
		<p>A gameplay demo video.</p>
		{#snippet media()}
			<YouTube id="RG8Sua8vprQ" title="Rounds On Me short trailer" />
		{/snippet}
	</Section>

	<Section heading="Full game demo" stacked>
		<p>This gameplay video includes explicit language (suitable for audiences 18 and older).</p>
		{#snippet media()}
			<YouTube id="v5IXmLyw68g" title="Rounds On Me full game demo" />
		{/snippet}
	</Section>

	<h2 class="text-center text-3xl font-bold sm:text-4xl">Experience breakdown</h2>

	<Section heading="Phone 🤝 Unreal">
		<p>
			In crafting a dynamic party game, accessibility is key. It's about making sure everyone,
			regardless of their tech-savviness, can jump right in and feel confident.
		</p>
		<p>
			To achieve this, I devised a solution using Unreal Engine 5 that seamlessly connects to the
			web. When a new game lobby is created in UE5, it automatically links up with my server through
			WebSockets, so anyone using the web version can easily join in. These lobbies operate
			independently, allowing multiple games to run at once without one affecting another, even if
			errors occur.
		</p>
		<p>
			I selected a tech stack focused on efficiency. By integrating parallel rendering in Svelte and
			employing optimized code, I ensure real-time data transmission. Players get instant feedback
			for every move they make, heightening their experience and providing timely guidance,
			particularly for newcomers.
		</p>
		{#snippet media()}
			<enhanced:img src="#lib/assets/projects/rounds-on-me/image-1.jpg" alt="" class="rounded-xl" />
		{/snippet}
	</Section>

	<Section heading="Merging drinking and video games" reverse>
		<p>
			In the early development phase, I experimented with a unique twist on party game dynamics.
			Rather than penalizing the lowest-ranked player with a shot, as is common, I flipped the
			script.
		</p>
		<p>
			Players can nominate a competitor to take a shot; in exchange, the selected player gains a
			point multiplier for the next round. Taking a drink became a strategic move, benefiting
			players in the hot seat. The result? Both parties were satisfied — the shot-taker received a
			boost, while the chooser enjoyed some mischievous camaraderie among friends.
		</p>
		{#snippet media()}
			<enhanced:img src="#lib/assets/projects/rounds-on-me/image-2.jpg" alt="" class="rounded-xl" />
		{/snippet}
	</Section>

	<Section heading="1. Server feedback" level={3} stacked>
		<p>
			Essential information is always available to players: the remaining time to input their
			responses is periodically streamed to their devices. The game also features multiple "Ready
			Up" sections that check whether players have real-world tasks, like taking a shot, and stream
			their readiness status to the screen.
		</p>
		{#snippet media()}
			<enhanced:img
				src="#lib/assets/projects/rounds-on-me/image-4.png"
				alt=""
				class="mx-auto max-h-[70vh] w-auto rounded-xl"
			/>
		{/snippet}
	</Section>

	<Section heading="2. Encouraging conversation" level={3} stacked>
		<p>
			The game is a team-based experience where players are paired with new partners to
			collaboratively create a story within each act. Initially, players had a single teammate for
			the entire game, crafting a "Mad-Lib" story together. In response to feedback, I changed the
			system to provide a fresh teammate each round, using weighted randomness to maintain fairness
			based on the scoreboard. Every player now works on several stories in a single game.
		</p>
		{#snippet media()}
			<enhanced:img src="#lib/assets/projects/rounds-on-me/image-5.jpg" alt="" class="rounded-xl" />
		{/snippet}
	</Section>

	<Section heading="3. Mathematically interesting" level={3} stacked>
		<p>
			I wanted the game to follow a three-act structure, like a magician performing a trick:
			retention ➜ retention ➜ reveal. Each round, a score is stored for every sentence in the story,
			based on how players rate each other's contributions. As the game progresses, the system
			learns which story contains the funniest elements, so in the final act the narrator recounts
			the highest-scoring story — incorporating a bit of everyone's input.
		</p>
		{#snippet media()}
			<enhanced:img src="#lib/assets/projects/rounds-on-me/image-3.jpg" alt="" class="rounded-xl" />
		{/snippet}
	</Section>
</CaseStudy>
