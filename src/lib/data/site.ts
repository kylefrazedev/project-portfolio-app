import { version } from '$app/env';

export const site = {
	name: 'Frazier Kyle',
	title: "Frazier Kyle's Portfolio",
	description: 'Game developer and programmer — projects, case studies, and resume.',
	email: 'frazierkyle1235@gmail.com',
	phone: '(513) 882-6736',
	github: 'https://github.com/BigNinjaChicken',
	linkedin: 'https://www.linkedin.com/in/frazierkyle/',
	repo: 'https://github.com/kylefrazedev/project-portfolio-app',
	// Versioned per build so browsers never show a cached, outdated résumé.
	resume: `/resume.pdf?v=${version}`
};

export const nav = [
	{ href: '/#recent-projects', label: 'Featured' },
	{ href: '/portfolio', label: 'All Projects' },
	{ href: '/#about-me', label: 'About' },
	{ href: '/contacts', label: 'Contact / Resume' }
];
