<script lang="ts">
	import CaseStudy from '#lib/components/CaseStudy.svelte';
	import heroStage from '#lib/assets/projects/xr-opening/xr1.webp?enhanced';
	import heroCameras from '#lib/assets/projects/xr-opening/xr2.jpg?enhanced';
	import heroExtension from '#lib/assets/projects/xr-opening/xr5.jpg?enhanced';
	import Section from '#lib/components/Section.svelte';
	import YouTube from '#lib/components/YouTube.svelte';
</script>

<CaseStudy
	slug="xr-opening"
	heroPanels={[
		{ image: heroStage, alt: 'On the XR stage before the show', focus: '45% 50%' },
		{ image: heroCameras, alt: 'Cameras rolling on the XR set', focus: '50% 50%' },
		{ image: heroExtension, alt: 'The in-camera set extension', focus: '50% 50%' }
	]}
	heading="McVey Data Science Building XR Opening"
	subtitle="Bringing the opening show to life with design, new technology, and programming."
	specs={[
		{ label: 'My role', value: 'Unreal Engineer & XR Live Crew' },
		{ label: 'Tools', value: 'Unreal Engine 5.3 & Disguise' }
	]}
	next="rounds-on-me"
>
	<Section heading="Grand opening trailer" stacked>
		{#snippet media()}
			<YouTube id="zP6qHePyVs0" title="McVey Data Science Building grand opening" />
		{/snippet}
	</Section>

	<Section heading="My part in the show">
		<p>
			I developed the main XR background for Miami's president, Gregory Crawford, for his keynote
			speech, and collaborated on additional XR backdrops for the show. I also worked with the
			camera crew to keep the experience immersive throughout the event, showing how XR stage
			technology can extend beyond the LED screens into real life.
		</p>
		<p>
			The project deepened my understanding of live production and client satisfaction. I crafted
			"special moments" for the audience — like an effect that expanded the Unreal Engine scene into
			an immersive expanse as the president gestured.
		</p>
		{#snippet media()}
			<figure>
				<enhanced:img src="#lib/assets/projects/xr-opening/xr1.webp" alt="" class="rounded-xl" />
				<figcaption class="mt-2 text-center text-sm text-muted italic">
					Me in front of one of the scenes a couple of days before the show.
				</figcaption>
			</figure>
		{/snippet}
	</Section>

	<Section heading="See more" stacked>
		<p>Some of the shots I helped create for the show.</p>
		{#snippet media()}
			<div class="space-y-6">
				<enhanced:img src="#lib/assets/projects/xr-opening/xr2.jpg" alt="" class="rounded-xl" />
				<enhanced:img
					src="#lib/assets/projects/xr-opening/xr3.jpg"
					alt=""
					class="w-full rounded-xl"
				/>
				<figure>
					<enhanced:img src="#lib/assets/projects/xr-opening/xr5.jpg" alt="" class="rounded-xl" />
					<figcaption class="mt-2 text-center text-sm text-muted italic">
						The in-camera set extension I helped bring to life.
					</figcaption>
				</figure>
			</div>
		{/snippet}
	</Section>
</CaseStudy>
