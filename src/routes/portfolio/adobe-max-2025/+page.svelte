<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';
	import InstagramFeed from '#lib/components/InstagramFeed.svelte';

	const acronymPage = 'https://acronym.lol/work/adobe-max-2025';

	const photos = import.meta.glob<Picture>('/src/lib/assets/projects/adobe-max-2025/*.jpg', {
		eager: true,
		query: '?enhanced',
		import: 'default'
	});
	const photo = (name: string) => photos[`/src/lib/assets/projects/adobe-max-2025/${name}.jpg`];

	const heroPanels = [
		{ image: photo('cover'), alt: 'Café Express-O at Adobe MAX', focus: '50% 50%' },
		{ image: photo('designing'), alt: 'Designing in Adobe Express', focus: '45% 50%' },
		{ image: photo('drinks'), alt: 'Branded Café Express-O drinks', focus: '50% 55%' }
	];

	const gallery = [
		{ src: photo('cover'), caption: 'Café Express-O at Adobe MAX' },
		{ src: photo('cafe-floor'), caption: 'The café floor' },
		{ src: photo('designing'), caption: 'Designing in Adobe Express' },
		{ src: photo('sticker'), caption: 'A finished sticker takeaway' },
		{ src: photo('sticker-bar'), caption: 'Picking up printed stickers' },
		{ src: photo('merch-shelves'), caption: 'Merch designed in Adobe Express' },
		{ src: photo('drinks'), caption: 'Branded Café Express-O drinks' }
	];

	// "My part" is hidden until it's written up properly; set to true to show it.
	const showMyPart = false;
</script>

<CaseStudy
	slug="adobe-max-2025"
	subtitle="Café Express-O — Adobe Express as a café you could sit in, sip and create."
	specs={[
		{ label: 'Client', value: 'Adobe' },
		{ label: 'Company', value: 'Acronym' },
		{ label: 'My role', value: 'Creative Technology Programmer' },
		{ label: 'Event', value: 'Adobe MAX 2025' },
		{ label: 'My focus', value: "Tech install & setup · sticker printing via Adobe's API" },
		{ label: 'Case study', value: 'acronym.lol', href: acronymPage }
	]}
	next="welcome-to-derry"
	{heroPanels}
>
	<Lightbox class="space-y-16">
		<Section heading="The project">
			<p>
				For Acronym's third year bringing Adobe Express to MAX, the booth became Café Express-O: not
				a booth or a demo, but a place you actually wanted to hang out — Adobe Express as part of a
				daily creative ritual.
			</p>
			<p>
				At the center, attendees designed stickers on demo laptops in Adobe Express and printed them
				on the spot as takeaways. All around them, props, packaging, merch and signage — every piece
				designed in Adobe Express — turned the space into a working café, complete with branded
				drinks and latte art.
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
					I handled the install and setup of the café's tech, working with our production team and
					the Adobe team to use Adobe's API to print a sticker for every coffee the booth served.
				</p>
				<!-- TODO: How the sticker printing pipeline worked (API to printer), the hardware, how many coffees and stickers went out, and anything that broke and how you fixed it. -->
				{#snippet media()}
					<enhanced:img
						src={photo('design-stations')}
						alt="Attendees designing at the demo stations"
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
					code: 'DQcr8Dykm1o',
					type: 'p',
					title: 'Café Express-O at Adobe MAX 2025'
				}
			]}
		/>

		<Gallery heading="Gallery" images={gallery} credit={{ label: 'Acronym', href: acronymPage }} />
	</Lightbox>
</CaseStudy>
