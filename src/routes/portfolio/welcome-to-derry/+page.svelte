<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';
	import InstagramFeed from '#lib/components/InstagramFeed.svelte';

	const acronymPage = 'https://acronym.lol/work/welcome-to-derry';

	const photos = import.meta.glob<Picture>('/src/lib/assets/projects/welcome-to-derry/*.jpg', {
		eager: true,
		query: '?enhanced',
		import: 'default'
	});
	const photo = (name: string) => photos[`/src/lib/assets/projects/welcome-to-derry/${name}.jpg`];

	const heroPanels = [
		{ image: photo('cover'), alt: 'The Derry house on the convention floor', focus: '30% 50%' },
		{ image: photo('red-room'), alt: 'The bedroom turns red', focus: '50% 50%' },
		{ image: photo('scared-guest'), alt: 'A guest walking out shaken', focus: '45% 50%' }
	];

	const gallery = [
		{ src: photo('cover'), caption: 'The Derry house on the convention floor' },
		{ src: photo('entrance'), caption: 'Welcome to Derry: Face Your Fears' },
		{ src: photo('window'), caption: 'A shadow at the bedroom window' },
		{ src: photo('bedroom'), caption: "The 1960s child's bedroom" },
		{ src: photo('red-room'), caption: 'The room turns red' },
		{ src: photo('screen-reveal'), caption: "A guest's fear revealed on screen" },
		{ src: photo('guest-reaction'), caption: 'Guests inside the experience' },
		{ src: photo('scared-guest'), caption: 'Walking out shaken' }
	];

	// "My part" is hidden until it's written up properly; set to true to show it.
	const showMyPart = false;
</script>

<CaseStudy
	slug="welcome-to-derry"
	subtitle="Face Your Fears — a generative horror experience for HBO's Welcome to Derry."
	specs={[
		{ label: 'Client', value: 'HBO' },
		{ label: 'Company', value: 'Acronym' },
		{ label: 'My role', value: 'Creative Technology Programmer' },
		{ label: 'Shown at', value: 'Culture Con & New York Comic Con 2025' },
		{ label: 'My focus', value: 'Programmed the full show, with one other programmer' },
		{ label: 'Case study', value: 'acronym.lol', href: acronymPage }
	]}
	next="google-io-2025"
	{heroPanels}
>
	{#snippet feature()}
		<h2 class="mb-3 text-lg font-bold text-muted">Behind the build</h2>
		<video
			class="w-full rounded-xl bg-surface"
			controls
			playsinline
			preload="none"
			poster="/video/welcome-to-derry-poster.jpg"
		>
			<source src="/video/welcome-to-derry.mp4" type="video/mp4" />
			<track kind="captions" />
		</video>
		<p class="mt-3 text-muted">
			A short documentary on how the show turned each guest's fear into a live, generated scare,
			narrated by Lead Producer Paul Elsberg.
		</p>
	{/snippet}

	<Lightbox class="space-y-16">
		<Section heading="The project">
			<p>
				Before stepping inside, guests answered one question: what are you afraid of? That answer
				fed everything that followed. Inside a 1960s-inspired child's bedroom, their fear was
				generated live, revealed on screen and woven into audio that began reshaping the room around
				them.
			</p>
			<p>
				No two runs played out the same. Each guest's input drove a modular audiovisual system, so
				sound, timing and atmosphere recomposed for every person instead of triggering one fixed
				scare sequence.
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
					I programmed the whole show together with one other programmer — the system that takes
					each guest's fear and turns it into what plays out in the room.
				</p>
				<!-- TODO: Your specific pieces of the show system, the tech stack (TouchDesigner? AI services?), how guest input flowed through it, and lessons from running it at two conventions. -->
				{#snippet media()}
					<enhanced:img
						src={photo('fear-input')}
						alt="A guest entering their fear on the iPad"
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
					code: 'DPorL80kew9',
					type: 'reel',
					title: 'From blueprint to nightmare'
				},
				{
					account: 'acronym.lol',
					code: 'DPcGygEjAJD',
					type: 'reel',
					title: 'Inside the 1960s bedroom'
				},
				{
					account: 'acronym.lol',
					code: 'DPaD73nEhSO',
					type: 'p',
					title: 'Welcome to Derry at Culture Con'
				}
			]}
		/>

		<Gallery heading="Gallery" images={gallery} credit={{ label: 'Acronym', href: acronymPage }} />
	</Lightbox>
</CaseStudy>
