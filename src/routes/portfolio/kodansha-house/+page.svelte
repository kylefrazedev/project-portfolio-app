<script lang="ts">
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import Section from '#lib/components/Section.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';
	import InstagramFeed from '#lib/components/InstagramFeed.svelte';
	import MangaHero from '#lib/components/MangaHero.svelte';
	import type { Snippet } from 'svelte';
	import heroAkira from '#lib/assets/projects/kodansha-house/la/akira-bike.jpg?enhanced';
	import heroGhost from '#lib/assets/projects/kodansha-house/la/ghost-major.jpg?enhanced';
	import heroTitan from '#lib/assets/projects/kodansha-house/la/aot-diorama.jpg?enhanced';

	const takeaways = [
		{ zone: 'Akira', count: 4340 },
		{ zone: 'Attack on Titan', count: 3602 },
		{ zone: 'Blue Lock', count: 2818 }
	];
	const total = takeaways.reduce((sum, t) => sum + t.count, 0);

	const acronymPage = 'https://acronym.lol/work/kodansha-house-2026';

	/** Official Kodansha and Acronym reels about the House. */
	const instagramReels = [
		{ account: 'kodanshamanga', code: 'Dee3o2yjIop', title: 'Blue Lock at Kodansha House NY' },
		{ account: 'kodanshamanga', code: 'DejyOkGEy17', title: 'Recreate the legendary Akira slide' },
		{ account: 'kodansha_en', code: 'DeeAvWrNwxK', title: 'Kodansha House New York walkthrough' },
		{ account: 'acronym.lol', code: 'Dec55n7i1zf', title: 'We built a house for manga' },
		{ account: 'acronym.lol', code: 'Da52rRmipav', title: 'Kodansha House LA, the first chapter' },
		{ account: 'kodanshamanga', code: 'De404pkD2VZ', title: 'Looking back on Kodansha House NYC' }
	];
</script>

<CaseStudy
	slug="kodansha-house"
	subtitle="An immersive manga experience in Los Angeles and New York, built for Kodansha."
	specs={[
		{ label: 'Client', value: 'Kodansha' },
		{ label: 'Company', value: 'Acronym (formerly VT Pro Design)' },
		{ label: 'My role', value: 'Creative Technology Programmer — lead programmer' },
		{ label: 'Los Angeles', value: 'Little Tokyo · July 2–12, 2026' },
		{ label: 'New York', value: 'Hudson Yards, beside the Javits Center · October 9–18, 2026' },
		{ label: 'Show control', value: 'TouchDesigner' },
		{ label: 'Web & iPad UI', value: 'SvelteKit' },
		{ label: 'NYC takeaways', value: `${total.toLocaleString('en-US')} through our system` },
		{ label: 'Case study', value: 'acronym.lol', href: acronymPage }
	]}
	next="mcdonalds-worldwide-2026"
>
	{#snippet hero(header: Snippet)}
		<MangaHero
			panels={[
				{ image: heroAkira, alt: "Kaneda's bike in front of the AKIRA LED wall", focus: '45% 60%' },
				{
					image: heroGhost,
					alt: "The Major's eyes filling the transparent LED wall",
					focus: '50% 35%'
				},
				{
					image: heroTitan,
					alt: 'Guests leaning into the Attack on Titan miniature city',
					focus: '42% 50%'
				}
			]}
		>
			{@render header()}
		</MangaHero>
	{/snippet}

	{#snippet feature()}
		<h2 class="mb-3 text-lg font-bold text-muted">NYC highlight reel</h2>
		<video
			class="w-full rounded-xl bg-surface"
			controls
			playsinline
			preload="none"
			poster="/video/kodansha-house-poster.jpg"
		>
			<source src="/video/kodansha-house.mp4" type="video/mp4" />
			<track kind="captions" />
		</video>
		<p class="mt-3 text-muted">
			A walkthrough of the New York space, from Ghost in the Shell to the Blue Lock locker room.
		</p>
	{/snippet}

	<Lightbox class="space-y-16">
		<InstagramFeed
			accounts={['kodanshamanga', 'acronym.lol']}
			blurb="Kodansha House as Kodansha and Acronym shared it."
			reels={instagramReels}
		/>

		<Section heading="My part">
			<p>
				Kodansha hired Acronym to build Kodansha House: a free, drop-in home for the brand
				celebrating its manga — Ghost in the Shell, Akira, Attack on Titan, Witch Hat Atelier, Blue
				Lock and more. It ran as one program across two cities: Little Tokyo, Los Angeles alongside
				Anime Expo in July, then New York for the New York Comic Con weekend and the week after in
				October.
			</p>
			<p>
				I was the lead programmer for the project, working as its creative technology programmer in
				both cities. I programmed the Blue Lock game, its scoreboard and stats collection, every
				iPad UI, and the Witch Hat Atelier experience. I ran all show control in TouchDesigner —
				audio routing, lighting cues, and controls so producers and the client could power the space
				up and down and set audio levels — and I managed the tech layout: where every piece of
				hardware lived and how it all connected across five zones.
			</p>
			{#snippet media()}
				<enhanced:img
					src="#lib/assets/projects/kodansha-house/akira-wall.jpg"
					alt="The Akira zone, lit red, with manga panel walls and Kaneda's bike"
					class="mx-auto max-h-[70vh] w-auto rounded-xl"
				/>
			{/snippet}
		</Section>

		<section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-labelledby="takeaway-heading">
			<div class="rounded-2xl bg-surface p-6 text-center sm:p-10">
				<h2 id="takeaway-heading" class="text-3xl font-bold sm:text-4xl">
					{total.toLocaleString('en-US')} takeaways
				</h2>
				<p class="mx-auto mt-3 max-w-2xl text-muted">
					New York guests who captured a photo or video at our three custom takeaway stations, all
					delivered through a custom takeaway management system (TMS).
				</p>
				<dl class="mt-8 grid gap-4 sm:grid-cols-3">
					{#each takeaways as t (t.zone)}
						<div class="rounded-xl border border-border p-4">
							<dt class="text-sm text-muted">{t.zone}</dt>
							<dd class="text-gradient font-display text-3xl font-bold">
								{t.count.toLocaleString('en-US')}
							</dd>
						</div>
					{/each}
				</dl>
			</div>
		</section>

		<Section heading="Blue Lock: impact-screen shooting game" reverse>
			<p>
				Guests take a real shot at a projected goal. Piezo sensors hidden in the corners of the
				impact screen detect the exact moment the ball hits; that trigger fires a high-frame-rate
				camera beside the projector, and the frame is analyzed to find where the ball struck. The
				game scores the shot from that position.
			</p>
			<p>
				A second camera on the side captures each player's takeaway, every shot's stats feed the
				scoreboard and the leaderboards in the locker room, and the iPad UIs that run the experience
				are SvelteKit web apps.
			</p>
			{#snippet media()}
				<div class="grid grid-cols-2 gap-4">
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/bluelock-target.jpg"
						alt="Projected goal with targets on the Blue Lock impact screen"
						class="rounded-xl"
					/>
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/bluelock-score.jpg"
						alt="A 100-point hit animation on the impact screen"
						class="rounded-xl"
					/>
				</div>
			{/snippet}
		</Section>

		<Section heading="Blue Lock: locker room & leaderboards">
			<p>
				Stats collected from every round flow into the locker room displays — overall and daily
				rankings — so players could see where they placed the moment they walked out of the cage.
			</p>
			{#snippet media()}
				<enhanced:img
					src="#lib/assets/projects/kodansha-house/bluelock-leaderboard.jpg"
					alt="Blue Lock locker room with leaderboard screens"
					class="mx-auto max-h-[70vh] w-auto rounded-xl"
				/>
			{/snippet}
		</Section>

		<Section heading="Akira: riding Kaneda's bike" reverse>
			<p>
				Built with another programmer: a camera, an LED wall driven by a NovaStar processor, and a
				sync box keep the camera and the LED wall locked together through a Blackmagic capture card.
				As the content on the wall zooms out, the camera zooms in digitally — so on the final video
				it looks like you're sliding into frame on the bike.
			</p>
			{#snippet media()}
				<enhanced:img
					src="#lib/assets/projects/kodansha-house/akira-bike.jpg"
					alt="Kaneda's red bike in front of the Kodansha House LED wall"
					class="mx-auto max-h-[70vh] w-auto rounded-xl"
				/>
			{/snippet}
		</Section>

		<Section heading="Attack on Titan: diorama takeaway">
			<p>
				A camera built into the set photographs guests at the walled-city diorama. A brand
				ambassador starts the countdown from an iPad; afterwards a Python pipeline cuts the guest's
				footage together with audio and footage from the Attack on Titan show and sends it to our
				custom takeaway management system, which delivered every takeaway in the space.
			</p>
			{#snippet media()}
				<div class="grid grid-cols-2 gap-4">
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/aot-wall.jpg"
						alt="The walled-city diorama with the Attack on Titan manga wall behind it"
						class="rounded-xl"
					/>
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/aot-diorama.jpg"
						alt="Close-up of the miniature walled city"
						class="rounded-xl"
					/>
				</div>
			{/snippet}
		</Section>

		<Section heading="Witch Hat Atelier: cast a spell" reverse>
			<p>
				An iPad hidden inside a scenic spell book lets guests draw a magic circle just like in the
				series. When the circle is complete, projection-mapped content plays across the scenic
				workshop and the back scrim so it looks like the spell comes to life around you.
			</p>
			{#snippet media()}
				<div class="grid grid-cols-2 gap-4">
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/wha-spellbook.jpg"
						alt="Drawing a spell circle on the iPad inside the scenic book"
						class="rounded-xl"
					/>
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/wha-workshop.jpg"
						alt="The projection-mapped Witch Hat Atelier workshop"
						class="rounded-xl"
					/>
				</div>
			{/snippet}
		</Section>

		<Section heading="Ghost in the Shell: transparent LED">
			<p>
				A transparent LED wall lets guests stand behind and beside life-size characters, with video
				and overhead speakers, all part of the TouchDesigner show control that ran the rest of the
				space.
			</p>
			{#snippet media()}
				<div class="grid grid-cols-2 gap-4">
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/ghost-major.jpg"
						alt="The Major displayed life-size on the transparent LED wall"
						class="rounded-xl"
					/>
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/ghost-batou.jpg"
						alt="Batou on the transparent LED wall under blue neon"
						class="rounded-xl"
					/>
				</div>
			{/snippet}
		</Section>
		<h2 class="text-center text-3xl font-bold sm:text-4xl">Development &amp; testing</h2>

		<Section heading="Finding the right shot detection">
			<p>
				My first approach to tracking the ball in the Blue Lock cage was a 2D LiDAR scanner from
				Orbbec, sweeping a plane in front of the screen. It worked in the shop — until we tested
				with stronger soccer players. The sensor couldn't scan fast enough to catch a ball moving
				faster than about 30 mph.
			</p>
			<p>
				That's what testing is for. It led to the final design: piezo sensors on the corners of the
				impact screen to detect the exact moment of the hit, triggering a high-frame-rate camera to
				find where the ball landed.
			</p>
			{#snippet media()}
				<div class="grid grid-cols-[2fr_1fr] items-center gap-4">
					<video
						class="w-full rounded-xl bg-bg"
						src="/video/dev/lidar-test.mp4"
						poster="/video/dev/lidar-test.jpg"
						autoplay
						muted
						loop
						playsinline
						preload="metadata"
						aria-label="Throwing a soccer ball through the LiDAR scan plane in the shop"
					></video>
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/dev/lidar-sensor.jpg"
						alt="The Orbbec LiDAR sensor that was tested and ruled out"
						class="rounded-xl"
					/>
				</div>
			{/snippet}
		</Section>

		<Section heading="Prototyping the Blue Lock game" reverse>
			<p>
				Before the cage was built, the game ran on a projection screen in the shop — targets, hit
				detection, the score burst and point values all tuned here first.
			</p>
			{#snippet media()}
				<video
					class="mx-auto max-h-[70vh] w-auto rounded-xl bg-bg"
					src="/video/dev/bluelock-prototype.mp4"
					poster="/video/dev/bluelock-prototype.jpg"
					autoplay
					muted
					loop
					playsinline
					preload="metadata"
					aria-label="The Blue Lock game prototype registering a 30-point hit on a projection screen"
				></video>
			{/snippet}
		</Section>

		<Section heading="Hardware, DMX & show control" stacked>
			<p>
				The rest was testing every piece of hardware before load-in: bringing up the transparent LED
				panels for Ghost in the Shell, pixel-mapping LED tubes, working out the best way to send DMX
				to the lighting, setting up the audio interfaces, and building the systems that tie it all
				together in TouchDesigner.
			</p>
			{#snippet media()}
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<video
						class="w-full rounded-xl bg-bg"
						src="/video/dev/transparent-led-test.mp4"
						poster="/video/dev/transparent-led-test.jpg"
						autoplay
						muted
						loop
						playsinline
						preload="metadata"
						aria-label="Testing content on transparent LED panels laid on the floor"
					></video>
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/dev/transparent-led-panels.jpg"
						alt="Transparent LED panels on the shop floor before install"
						class="w-full rounded-xl"
					/>
					<video
						class="w-full rounded-xl bg-bg"
						src="/video/dev/led-tube-mapping.mp4"
						poster="/video/dev/led-tube-mapping.jpg"
						autoplay
						muted
						loop
						playsinline
						preload="metadata"
						aria-label="A blue chase running down a pixel-mapped LED tube"
					></video>
					<enhanced:img
						src="#lib/assets/projects/kodansha-house/dev/audio-interface.jpg"
						alt="An RME Fireface UFX audio interface on the bench during setup"
						class="w-full rounded-xl"
					/>
				</div>
			{/snippet}
		</Section>

		<section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-labelledby="la-heading">
			<div class="rounded-2xl bg-surface p-6 sm:p-10">
				<h2 id="la-heading" class="text-3xl font-bold sm:text-4xl">Los Angeles · July 2026</h2>
				<p class="mt-4 max-w-3xl text-lg text-muted">
					The House opened first in Little Tokyo alongside Anime Expo, with the same interactive
					systems — Blue Lock, Akira, Attack on Titan, Witch Hat Atelier and Ghost in the Shell —
					that later moved to New York.
				</p>
				<p class="mt-4 max-w-3xl text-lg text-muted">
					As the first install, LA is where most of the integration work happened. I worked closely
					with the audio and lighting vendor, LunaLux, to get our systems talking to theirs:
					TouchDesigner driving their Q-SYS for Dante audio routing and sending cues to their
					grandMA lighting console, so one show control ran the whole House.
				</p>
				<div class="mt-8 gap-4 sm:columns-2 lg:columns-3">
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/exterior-line.jpg"
							alt="The line outside Kodansha House in Little Tokyo"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							The line outside Kodansha House in Little Tokyo
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/exterior-akira.jpg"
							alt="Akira storefront graphics on the building’s exterior"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							Akira storefront graphics on the building’s exterior
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/entrance.jpg"
							alt="The entry tunnel into the House"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">The entry tunnel into the House</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/ghost-tachikoma.jpg"
							alt="A Tachikoma on the Ghost in the Shell transparent LED"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							A Tachikoma on the Ghost in the Shell transparent LED
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/akira-ride.jpg"
							alt="A guest “riding” Kaneda’s bike — camera and LED wall in sync"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							A guest “riding” Kaneda’s bike — camera and LED wall in sync
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/akira-ipad.jpg"
							alt="The Akira takeaway playing back on the iPad"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							The Akira takeaway playing back on the iPad
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/wha-spellbook.jpg"
							alt="“Complete the Circle” on the iPad inside the spell book"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							“Complete the Circle” on the iPad inside the spell book
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/wha-drawing.jpg"
							alt="A guest drawing a rune in the Witch Hat Atelier tent"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							A guest drawing a rune in the Witch Hat Atelier tent
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/wha-spell.jpg"
							alt="The spell projection-mapped across the apothecary"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							The spell projection-mapped across the apothecary
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/bluelock-kick.jpg"
							alt="A player mid-shot at the Blue Lock impact screen"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							A player mid-shot at the Blue Lock impact screen
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/bluelock-cage.jpg"
							alt="Fans watching a round in the Blue Lock cage"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							Fans watching a round in the Blue Lock cage
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/bluelock-rankings.jpg"
							alt="Live rankings and recent players on the Blue Lock wall"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							Live rankings and recent players on the Blue Lock wall
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/aot-ipad.jpg"
							alt="The Attack on Titan takeaway countdown on the iPad"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							The Attack on Titan takeaway countdown on the iPad
						</figcaption>
					</figure>
					<figure class="mb-4 break-inside-avoid">
						<enhanced:img
							src="#lib/assets/projects/kodansha-house/la/creator-event.jpg"
							alt="A packed creator appearance at the House"
							class="w-full rounded-xl"
							sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
						/>
						<figcaption class="mt-2 text-sm text-muted">
							A packed creator appearance at the House
						</figcaption>
					</figure>
				</div>
				<p class="mt-4 text-sm text-muted">
					Photos: <a
						href={acronymPage}
						class="text-accent hover:underline"
						target="_blank"
						rel="noopener">Acronym</a
					>
				</p>
			</div>
		</section>
	</Lightbox>
</CaseStudy>
