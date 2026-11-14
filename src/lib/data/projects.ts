import type { Picture } from '@sveltejs/enhanced-img';

import progressBook from '#lib/assets/projects/progress-book.png?enhanced';
import xrOpening from '#lib/assets/projects/xr-opening/cover.jpg?enhanced';
import pursuitOfLaughter from '#lib/assets/projects/pursuit-of-laughter/cover.png?enhanced';
import roundsOnMe from '#lib/assets/projects/rounds-on-me/cover.png?enhanced';
import roundsOnMeExpo from '#lib/assets/projects/rounds-on-me/expo.webp?enhanced';
import thisSite from '#lib/assets/projects/this-site.png?enhanced';
import expressPolar from '#lib/assets/projects/express-polar/cover.png?enhanced';
import expressPolarThin from '#lib/assets/projects/express-polar/cover-thin.png?enhanced';
import noMind from '#lib/assets/projects/no-mind.png?enhanced';
import noHead from '#lib/assets/projects/no-head.jpg?enhanced';
import hotelAndMecha from '#lib/assets/projects/hotelandmecha.png?enhanced';
import slapStick from '#lib/assets/projects/slapstick.png?enhanced';
import windUp from '#lib/assets/projects/windup.png?enhanced';
import cooptapus from '#lib/assets/projects/COPano.png?enhanced';
import puttPutt from '#lib/assets/projects/puttputt.jpg?enhanced';
import pizza from '#lib/assets/projects/pizza.jpg?enhanced';
import tycoon from '#lib/assets/projects/tycoon.jpg?enhanced';
import hideAndSeek from '#lib/assets/projects/hideandseek.jpg?enhanced';
import petCity from '#lib/assets/projects/petcity.jpg?enhanced';
import midnightHeist from '#lib/assets/projects/midheist.png?enhanced';
import bolt from '#lib/assets/projects/bolt.png?enhanced';
import shortFuse from '#lib/assets/projects/shortfuse.jpg?enhanced';

export type Project = {
	/** Stable id; also the case-study route under /portfolio/<slug> when `caseStudy` is true. */
	slug: string;
	title: string;
	/** Short line shown under the title on featured cards. */
	tagline?: string;
	role: string;
	date: string;
	location: string;
	description: string;
	image: Picture;
	/** Alternate image for the wide featured card on the home page. */
	featureImage?: Picture;
	/** Has its own page at /portfolio/<slug>. */
	caseStudy?: boolean;
	/** External link used when there is no case study. */
	href?: string;
	/** Shown in the "Recent Projects" section on the home page, in this order. */
	featured?: number;
};

export const projects: Project[] = [
	{
		slug: 'progress-book',
		title: '2024 Miami University Project Book',
		role: 'Senior Design Project',
		date: '2024',
		location: 'College / MGDC',
		description:
			'This book displays all of the projects that my senior design team at Miami University brought to life at our local XR stage.',
		image: progressBook,
		caseStudy: true
	},
	{
		slug: 'xr-opening',
		title: 'Data Science XR Grand Opening',
		role: 'Unreal Engineer & XR Live Crew',
		date: 'March 2024',
		location: 'College / MGDC',
		description:
			'The immersive XR set I created for the live audience at the Grand Opening of the Miami University McVey Data Science Building.',
		image: xrOpening,
		caseStudy: true,
		featured: 2
	},
	{
		slug: 'pursuit-of-laughter',
		title: 'Pursuit Of Laughter',
		role: 'Project Lead & Programmer',
		date: 'March 2024',
		location: 'College / MGDC',
		description:
			'A multiplayer first-person rogue-lite about pleasing the Jester God by defeating hordes of enemies in the pursuit of laughter. Players navigate a treacherous, ever-changing world with a blend of skill, strategy, and humor.',
		image: pursuitOfLaughter,
		caseStudy: true,
		featured: 3
	},
	{
		slug: 'rounds-on-me',
		title: 'Rounds On Me',
		tagline: 'A Drinking Party Experience',
		role: 'Solo Developer',
		date: '2024',
		location: 'College / MGDC',
		description:
			'A 2–15 player party game built in Unreal Engine 5 where players use their phones as controllers over WebSockets. Players collaborate to create ridiculous stories while challenging friends to take shots for score multipliers.',
		image: roundsOnMe,
		featureImage: roundsOnMeExpo,
		caseStudy: true,
		featured: 1
	},
	{
		slug: 'portfolio-site',
		title: 'My Portfolio Site',
		role: 'Solo Developer',
		date: 'Ongoing',
		location: 'Personal',
		href: 'https://github.com/kylefrazedev/project-portfolio-app',
		description:
			'This site, built with SvelteKit and Tailwind CSS. It showcases my achievements and projects — I put a lot of work into my experiences, and it is only fair to give them a platform.',
		image: thisSite
	},
	{
		slug: 'express-polar',
		title: 'Express: Polar',
		tagline: 'Runaway in the Train',
		role: 'Solo Developer',
		date: 'May 2023',
		location: 'College / MGDC',
		description:
			'First-place winner in the MU Design Competition, shown at the Miami Game Design Senior Project Fair. A UE5 multiplayer game written in C++ where players speedrun a randomly generated train while a crazed conductor chases them, using Epic Online Services for online play.',
		image: expressPolar,
		featureImage: expressPolarThin,
		caseStudy: true
	},
	{
		slug: 'no-mind',
		title: 'No Mind',
		role: 'Programming & Design Lead',
		date: 'October 2022',
		location: 'College / MGDC',
		href: 'https://bigninjachicken.itch.io/no-mind',
		description:
			"An interrogation-style game I led at the Miami Game Design Club, where players use persuasion tactics to uncover the truth. With engaging dialogue and high-pressure gameplay, players feel like they're in the hot seat.",
		image: noMind
	},
	{
		slug: 'no-head',
		title: 'No Head',
		role: 'Programming & Design Lead',
		date: 'September 2022',
		location: 'College / MGDC',
		href: 'https://bigninjachicken.itch.io/no-head',
		description:
			'A puzzle game I led at the Miami Game Design Club where players navigate a zombie apocalypse without a body, choosing between carrying their own head or a weapon to fight robot zombies.',
		image: noHead
	},
	{
		slug: 'hotel-outage-mechaball',
		title: 'Hotel Outage & Mechaball',
		role: 'Programming & Design Lead',
		date: 'February 2022',
		location: 'College / MGDC',
		href: 'https://bigninjachicken.itch.io/mechaball',
		description:
			'Hotel Outage challenges players to keep guests satisfied in a haunted hotel full of dangerous ghosts, while Mechaball puts players in the cockpit of a mech for a futuristic game of soccer, built for VR in Unreal Engine 5.',
		image: hotelAndMecha
	},
	{
		slug: 'slapstick',
		title: 'SlapStick',
		role: '3D Modeling & Design Co-Lead',
		date: 'Global Game Jam "Duality", 2022',
		location: 'College / MGDC',
		href: 'https://thesmashers.itch.io/slapstick',
		description:
			'A fast-paced, hilarious game where players use their left hand to slap opponents and their right hand to fling a sticky hand and grapple onto objects — or enemies.',
		image: slapStick
	},
	{
		slug: 'wind-up',
		title: 'Wind-Up',
		role: '3D Modeling & Design Co-Lead',
		date: 'Area of Effect Game Jam "Signs of Life", September 2021',
		location: 'College / MGDC',
		href: 'https://thesmashers.itch.io/wind-up',
		description:
			'A charming puzzle game where you play a wind-up mouse that brings toys to life by touching them, then uses their abilities to solve puzzles. Placed on the podium with the creativity award.',
		image: windUp
	},
	{
		slug: 'cooptapus',
		title: 'Cooptapus',
		role: 'Programming & Design Lead',
		date: '2023',
		location: 'College / MGDC',
		description:
			'A co-op party game where you and your friends control a giant squid on a mission to destroy ships. Solo developed.',
		image: cooptapus
	},
	{
		slug: 'putt-putt-city',
		title: 'Putt-Putt City',
		role: 'Programming & Design Lead',
		date: 'May 2020',
		location: 'Nitric Concepts — Minecraft Marketplace',
		href: 'https://www.minecraft.net/en-us/marketplace/pdp?id=3d7e5c02-37a7-4105-99c7-2fe12436b78e',
		description:
			'Play over 27 courses while you travel the world and uncover new secrets in an adventure through time and space.',
		image: puttPutt
	},
	{
		slug: 'pizza-parlor',
		title: 'Pizza Parlor',
		role: 'Designer & 3D Modeling',
		date: 'August 2019',
		location: 'Nitric Concepts — Minecraft Marketplace',
		href: 'https://www.minecraft.net/en-us/marketplace/pdp?id=138b5797-9d67-4412-9d02-c33a71bd20b3',
		description:
			'A new pizza shop has opened up in town! Role-play as a pizza chef — or as a pizza. Craft furniture, decorate your house, or make your own adventure.',
		image: pizza
	},
	{
		slug: 'business-tycoon',
		title: 'Business Tycoon',
		role: 'Programming & 3D Modeling',
		date: 'August 2019',
		location: 'Nitric Concepts — Minecraft Marketplace',
		href: 'https://www.minecraft.net/en-us/marketplace/pdp?id=49dd60d0-517a-4349-ae23-0ee5796202d1',
		description: 'Own every building and become the best person in the city of Mineland.',
		image: tycoon
	},
	{
		slug: 'hide-and-seek-resort',
		title: 'Hide and Seek: Resort!',
		role: 'Programming & 3D Modeling',
		date: 'August 2019',
		location: 'Nitric Concepts — Minecraft Marketplace',
		href: 'https://www.minecraft.net/en-us/marketplace/pdp?id=e45aee86-2407-48f0-8cb1-98448b1fefba',
		description:
			'Play survival with custom mobs or a game of hide & seek with friends. Ride boats down icy mountains or discover sneaky hiding places in the cabin.',
		image: hideAndSeek
	},
	{
		slug: 'pet-city',
		title: 'Pet City',
		role: 'Designer & 3D Modeling',
		date: 'April 2019',
		location: 'Nitric Concepts — Minecraft Marketplace',
		href: 'https://www.minecraft.net/en-us/marketplace/pdp?id=9ab1ffea-4433-47ef-965f-b6ff182532ae',
		description:
			'The ideal place to raise your new pets. Take them to the park, an aquarium, or just around town.',
		image: petCity
	},
	{
		slug: 'midnight-heist',
		title: 'Midnight Heist',
		role: 'Project Lead, 3D Modeling, Gameplay Design',
		date: 'September 2020',
		location: 'Minecraft Realms Minigame',
		href: 'https://youtu.be/Wry8LcepWBU',
		description:
			'Join your friends on a heist to steal treasures from the wealthy, or play as a cop and hunt down the thieves. I led the project as 3D modeler and gameplay designer.',
		image: midnightHeist
	},
	{
		slug: 'bolt',
		title: 'Bolt',
		role: '3D Modeling, Design, Co-Project Lead',
		date: 'June 2019',
		location: 'Minecraft Realms Minigame',
		href: 'https://archive.crowdford.com/maps/bolt',
		description:
			'A fast-paced bow game where players shoot opponents to complete objectives across various game modes and maps.',
		image: bolt
	},
	{
		slug: 'short-fuse',
		title: 'Short Fuse',
		role: 'Design & 3D Modeling',
		date: 'February 2018',
		location: 'Minecraft Realms Minigame',
		href: 'https://www.youtube.com/watch?v=scNoeeoZaZo',
		description:
			'A Minecraft take on Bomberman with power-ups and reward-based progression. I helped craft the look and feel as designer and 3D modeler.',
		image: shortFuse
	}
];

export const featuredProjects = projects
	.filter((p) => p.featured)
	.sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

export function getProject(slug: string): Project {
	const project = projects.find((p) => p.slug === slug);
	if (!project) throw new Error(`Unknown project: ${slug}`);
	return project;
}

/** Where a project card links to. */
export function projectHref(project: Project): string | undefined {
	return project.caseStudy ? `/portfolio/${project.slug}` : project.href;
}
