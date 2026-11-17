<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';
	import InstagramFeed from '#lib/components/InstagramFeed.svelte';

	const acronymPage = 'https://acronym.lol/work/mcdonalds-worldwide-2026';

	const photos = import.meta.glob<Picture>(
		'/src/lib/assets/projects/mcdonalds-worldwide-2026/*.jpg',
		{
			eager: true,
			query: '?enhanced',
			import: 'default'
		}
	);
	const photo = (name: string) =>
		photos[`/src/lib/assets/projects/mcdonalds-worldwide-2026/${name}.jpg`];

	const heroPanels = [
		{ image: photo('fifa-zone'), alt: 'The FIFA Zone soccer game', focus: '50% 55%' },
		{ image: photo('cover'), alt: 'The portal into the NEXT pavilion', focus: '45% 50%' },
		{ image: photo('photo-booth'), alt: 'Guests in the real-time photo booth', focus: '45% 50%' }
	];

	const gallery = [
		{ src: photo('cover'), caption: 'The portal into the NEXT pavilion' },
		{ src: photo('fifa-zone'), caption: 'The FIFA Zone soccer game' },
		{ src: photo('fifa-zone-wide'), caption: 'The FIFA Zone on the convention floor' },
		{ src: photo('soccer-balls'), caption: 'Match balls ready at the FIFA Zone' },
		{ src: photo('prototype-restaurant'), caption: 'The prototype restaurant of the future' },
		{
			src: photo('crew-chandelier'),
			caption: 'The crew portrait chandelier in the People pavilion'
		},
		{ src: photo('photo-booth'), caption: 'The real-time photo capture booth' },
		{ src: photo('order-taking'), caption: 'Ordering-technology demos in the Restaurant pavilion' },
		{ src: photo('spin-for-pins'), caption: 'Spin for Pins' },
		{ src: photo('convention-center'), caption: 'Las Vegas Convention Center, West Hall' }
	];

	// "My part" is hidden until it's written up properly; set to true to show it.
	const showMyPart = false;
</script>

<CaseStudy
	slug="mcdonalds-worldwide-2026"
	subtitle="NEXT — a pavilion world for McDonald's global franchisee convention in Las Vegas."
	specs={[
		{ label: 'Client', value: "McDonald's" },
		{ label: 'Company', value: 'Acronym' },
		{ label: 'My role', value: 'Creative Technology Programmer' },
		{ label: 'Event', value: 'Worldwide Convention 2026 · Las Vegas Convention Center' },
		{ label: 'My focus', value: 'Show control · FIFA Zone soccer game' },
		{ label: 'Case study', value: 'acronym.lol', href: acronymPage }
	]}
	next="netflix-house-eve-of-the-outcasts"
	{heroPanels}
>
	<Lightbox class="space-y-16">
		<Section heading="The project">
			<p>
				Every year McDonald's brings its global franchisee community together — people who know the
				brand better than anyone. For Worldwide 2026 in Las Vegas, Acronym designed NEXT, a pavilion
				world built around one idea: show, don't tell.
			</p>
			<p>
				A full prototype restaurant of the future anchored the floor, surrounded by four pavilion
				chapters — Menu, Restaurant, Consumer and People — with multiplayer trivia, a crew portrait
				chandelier and a real-time photo booth. Beyond the pavilion, the FIFA Zone and Spin for Pins
				brought competition to the wider show floor.
			</p>
			{#snippet media()}
				<enhanced:img
					src={photo('cover')}
					alt=""
					class="rounded-xl"
					sizes="(min-width: 768px) 560px, 100vw"
				/>
			{/snippet}
		</Section>

		{#if showMyPart}
			<Section heading="My part" reverse>
				<p>
					I worked on the show control across the space, and built the FIFA Zone soccer game from
					start to finish.
				</p>
				<!-- TODO: How the soccer game worked (shot detection, scoring, UI), the show control setup, tools used, and any numbers. -->
				{#snippet media()}
					<enhanced:img
						src={photo('soccer-shot')}
						alt="A guest takes a shot at the FIFA Zone"
						class="rounded-xl"
						sizes="(min-width: 768px) 560px, 100vw"
					/>
				{/snippet}
			</Section>
		{/if}

		<InstagramFeed
			accounts={['acronym.lol']}
			blurb="How Acronym shared the project."
			reels={[
				{
					account: 'acronym.lol',
					code: 'DZIrkWaFNUM',
					type: 'p',
					title: "A glimpse into what's NEXT"
				}
			]}
		/>

		<Gallery heading="Gallery" images={gallery} credit={{ label: 'Acronym', href: acronymPage }} />
	</Lightbox>
</CaseStudy>
