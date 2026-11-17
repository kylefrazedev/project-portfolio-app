<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';
	import InstagramFeed from '#lib/components/InstagramFeed.svelte';

	const acronymPage = 'https://acronym.lol/work/netflix-house-eve-of-the-outcasts';

	const photos = import.meta.glob<Picture>(
		'/src/lib/assets/projects/netflix-house-eve-of-the-outcasts/*.jpg',
		{
			eager: true,
			query: '?enhanced',
			import: 'default'
		}
	);
	const photo = (name: string) =>
		photos[`/src/lib/assets/projects/netflix-house-eve-of-the-outcasts/${name}.jpg`];

	const heroPanels = [
		{ image: photo('cover'), alt: 'The festival carousel', focus: '40% 50%' },
		{ image: photo('guillotine'), alt: 'The guillotine game in the arcade', focus: '45% 50%' },
		{ image: photo('wheel-of-doom'), alt: 'Wheel of Doom', focus: '50% 45%' }
	];

	const gallery = [
		{ src: photo('cover'), caption: 'The festival carousel' },
		{ src: photo('carousel'), caption: 'The carousel under the night sky' },
		{ src: photo('nevermore-gate'), caption: 'The Nevermore Academy gates' },
		{ src: photo('outcasts-tent'), caption: 'The Eve of the Outcasts tent' },
		{ src: photo('arcade'), caption: 'The arcade' },
		{ src: photo('wheel-of-doom'), caption: 'Wheel of Doom' },
		{ src: photo('piranha-pursuit'), caption: 'Piranha Pursuit' }
	];

	// "My part" is hidden until it's written up properly; set to true to show it.
	const showMyPart = false;
</script>

<CaseStudy
	slug="netflix-house-eve-of-the-outcasts"
	subtitle="Wednesday Season 2 — a traveling gothic festival anchoring the first Netflix House."
	specs={[
		{ label: 'Client', value: 'Netflix' },
		{ label: 'Company', value: 'Acronym' },
		{ label: 'My role', value: 'Creative Technology Programmer' },
		{ label: 'Venue', value: 'Netflix House' },
		{ label: 'My focus', value: 'The guillotine game in the arcade' },
		{ label: 'Case study', value: 'acronym.lol', href: acronymPage }
	]}
	next="adobe-max-2025"
	{heroPanels}
>
	<Lightbox class="space-y-16">
		<Section heading="The project">
			<p>
				Netflix House's first location set out to prove that Netflix worlds could become real,
				repeatable destinations. Eve of the Outcasts brought Wednesday Season 2 into the physical
				world as a semi-permanent, traveling experience.
			</p>
			<p>
				Guests start in Enid and Wednesday's dorm room before entering a gothic festival of themed
				rooms and custom carnival games that twist familiar mechanics into something darker. Every
				room and game was built as a self-contained module that can be packed up and rebuilt in the
				next city.
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
				<p>I programmed the guillotine game in the festival's arcade.</p>
				<!-- TODO: How the guillotine game plays, the hardware it runs on, how it was built to travel with the experience, and any numbers. -->
				{#snippet media()}
					<enhanced:img
						src={photo('guillotine')}
						alt="The guillotine game in the arcade"
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
					code: 'DSfuzvSAvrA',
					type: 'reel',
					title: 'Step inside the world of Wednesday'
				},
				{
					account: 'acronym.lol',
					code: 'DRNt4ZIkibx',
					type: 'reel',
					title: 'Our team has been working on something big'
				},
				{
					account: 'acronym.lol',
					code: 'DR5ZUUMEo4Y',
					type: 'p',
					title: 'Wednesday at Netflix House'
				}
			]}
		/>

		<Gallery heading="Gallery" images={gallery} credit={{ label: 'Acronym', href: acronymPage }} />
	</Lightbox>
</CaseStudy>
