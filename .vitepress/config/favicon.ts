import type { HeadConfig } from "vitepress";



const item: HeadConfig[] = [
	[
		"link",
		{
			rel: "icon",
			type: "image/png",
			href: "/favicons/favicon-96x96.png",
			sizes: "96x96",
		},
	],
	[
		"link",
		{
			rel: "icon",
			type: "image/svg+xml",
			href: "/favicons/favicon.svg",
		},
	],
	[
		"link",
		{
			rel: "shortcut",
			href: "/favicons/favicon.ico",
		},
	],
	[
		"link",
		{
			rel: "apple-touch-icon",
			href: "/favicons/apple-touch-icon.png",
			sizes: "180x180",
		},
	],
	[
		"meta",
		{
			name: "apple-mobile-web-app-title",
			content: "Zuniverse",
		},
	],
	[
		"link",
		{
			rel: "manifest",
			href: "/favicons/site.webmanifest",
		},
	],
];

export default item;
