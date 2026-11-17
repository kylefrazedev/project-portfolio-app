<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';
	import InstagramFeed from '#lib/components/InstagramFeed.svelte';

	const acronymPage = 'https://acronym.lol/work/adobe-max-2024';

	const photos = import.meta.glob<Picture>('/src/lib/assets/projects/adobe-max-2024/*.jpg', {
		eager: true,
		query: '?enhanced',
		import: 'default'
	});
	const photo = (name: string) => photos[`/src/lib/assets/projects/adobe-max-2024/${name}.jpg`];

	const heroPanels = [
		{ image: photo('cover'), alt: "Inside Jen Stark's LED installation", focus: '40% 50%' },
		{ image: photo('led-dance'), alt: 'A guest playing with the LED wall', focus: '45% 40%' },
		{ image: photo('demo-stations'), alt: 'Designing totes in Adobe Express', focus: '50% 50%' }
	];

	const gallery = [
		{ src: photo('cover'), caption: "Inside Jen Stark's LED installation" },
		{ src: photo('led-dance'), caption: 'A guest playing with the LED wall' },
		{ src: photo('led-wall'), caption: 'The LED wall between moments' },
		{ src: photo('exit-photo'), caption: 'The exit photo moment' },
		{ src: photo('demo-stations'), caption: 'Designing totes in Adobe Express' },
		{ src: photo('tote'), caption: 'A finished tote' },
		{ src: photo('selfie'), caption: 'Selfies in the LED room' },
		{ src: photo('booth'), caption: 'The Adobe Express booth at MAX' }
	];

	// "My part" is hidden until it's written up properly; set to true to show it.
	const showMyPart = false;
</script>

<CaseStudy
	slug="adobe-max-2024"
	subtitle="Adobe Express × Jen Stark — stepping inside the artist's work."
	specs={[
		{ label: 'Client', value: 'Adobe' },
		{ label: 'Company', value: 'Acronym' },
		{ label: 'My role', value: 'Creative Technology Programmer' },
		{ label: 'Event', value: 'Adobe MAX 2024 · Miami' },
		{ label: 'My focus', value: 'LED wall interactivity · takeaway tech' },
		{ label: 'Totes', value: '3,500 custom and pre-printed totes' },
		{ label: 'Case study', value: 'acronym.lol', href: acronymPage }
	]}
	next="xr-opening"
	{heroPanels}
>
	<Lightbox class="space-y-16">
		<Section heading="The project">
			<p>
				For Acronym's second year bringing Adobe Express to MAX, artist Jen Stark co-authored the
				booth's visual identity, and her kaleidoscopic, radiating forms shaped every surface.
			</p>
			<p>
				At the entrance, a floor-to-ceiling LED installation used a body-tracking camera to put each
				guest's silhouette inside Stark's animation, rippling and distorting her shapes, with
				proximity-based sound. Guests then designed totes from remixable Stark templates at fifteen
				demo stations, and finished at an interactive LED photo wall.
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
					I built the LED wall interactivity, and some of the takeaway tech in other areas of the
					booth.
				</p>
				<!-- TODO: How the body tracking drove the animation, the LED/media server setup, which takeaway systems you built, and tools used. -->
				{#snippet media()}
					<enhanced:img
						src={photo('led-photo')}
						alt="Guests inside the interactive LED installation"
						class="rounded-xl"
						sizes="(min-width: 768px) 560px, 100vw"
					/>
				{/snippet}
			</Section>
		{/if}

		<InstagramFeed
			accounts={['acronym.lol']}
			blurb="Follow Acronym for more of the team's work."
			reels={[]}
		/>

		<Gallery heading="Gallery" images={gallery} credit={{ label: 'Acronym', href: acronymPage }} />
	</Lightbox>
</CaseStudy>
