<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';
	import InstagramFeed from '#lib/components/InstagramFeed.svelte';

	const photos = import.meta.glob<Picture>('/src/lib/assets/projects/google-io-2025/*.jpg', {
		eager: true,
		query: '?enhanced',
		import: 'default'
	});
	const photo = (name: string) => photos[`/src/lib/assets/projects/google-io-2025/${name}.jpg`];

	const heroPanels = [
		{
			image: photo('cover'),
			alt: 'Video Generation, Gemini on Glasses and AI in Search',
			focus: '35% 50%'
		},
		{ image: photo('basketball-coach'), alt: 'The AI Basketball Coach cage', focus: '55% 50%' },
		{ image: photo('gemini-robotics'), alt: 'Gemini Robotics: ALOHA robot arms', focus: '30% 60%' }
	];

	const gallery = [
		{ src: photo('cover'), caption: 'Video Generation, Gemini on Glasses and AI in Search' },
		{ src: photo('video-generation'), caption: 'Video Generation and the AI Basketball Coach' },
		{ src: photo('create-with-flow'), caption: 'Create with Flow' },
		{ src: photo('all-stars'), caption: 'The All-Stars leaderboard' },
		{ src: photo('talk-it-out-live'), caption: 'Talk it out Live' },
		{ src: photo('talk-it-out-sign'), caption: 'The Talk it out Live sign' },
		{ src: photo('collaborate-gemini'), caption: 'Collaborate with Gemini: Try Gemini Canvas' },
		{ src: photo('gemini-robotics'), caption: 'Gemini Robotics: ALOHA robot arms' },
		{ src: photo('home-set'), caption: 'A home set inside the section' }
	];

	// "My part" is hidden until it's written up properly; set to true to show it.
	const showMyPart = false;
</script>

<CaseStudy
	slug="google-io-2025"
	subtitle="The future of AI, hands-on — Google's developer conference at Shoreline Amphitheatre."
	specs={[
		{ label: 'Client', value: 'Google' },
		{ label: 'Company', value: 'Acronym' },
		{ label: 'My role', value: 'Creative Technology Programmer' },
		{ label: 'Event', value: 'Google I/O 2025 · Shoreline Amphitheatre, Mountain View' },
		{
			label: 'My focus',
			value: 'All show programming & tech integration for the future-of-AI section'
		}
	]}
	next="adobe-max-2024"
	{heroPanels}
>
	<Lightbox class="space-y-16">
		<Section heading="The project">
			<p>
				At Google I/O 2025, the future-of-AI section turned Google's newest models into things
				attendees could try for themselves, zone by zone: Video Generation with Flow, an AI
				Basketball Coach, Talk it out Live, Collaborate with Gemini, Gemini Robotics, Gemini on
				Glasses and AI in Search.
			</p>
			<p>
				Each zone paired live demos with custom-built fixtures — screens set into rounded wooden
				frames, a yellow basketball cage with a live All-Stars leaderboard, and robot arms working
				side by side.
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
					I did all of the show programming and tech integration for the future-of-AI section,
					connecting every zone's demos, screens and systems so they ran together as one show.
				</p>
				<!-- TODO: Per-zone details (e.g. how the basketball coach tracked shots and fed the All-Stars board), the show control setup, tools used, and any numbers. -->
				{#snippet media()}
					<enhanced:img
						src={photo('basketball-coach')}
						alt="The AI Basketball Coach cage"
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
					code: 'DLQaYcYTNxB',
					type: 'p',
					title: 'Google I/O 2025 in the Sandbox'
				}
			]}
		/>

		<Gallery heading="Gallery" images={gallery} />
	</Lightbox>
</CaseStudy>
