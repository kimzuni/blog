import type { DefaultTheme } from "vitepress";



const items: DefaultTheme.NavItem[] = [
	{
		text: "Home",
		link: "/",
	},
	{
		text: "Posts",
		link: "/posts/",
		activeMatch: "/posts/$|/posts/page/",
	},
	{
		text: "Series",
		link: "/series/",
		activeMatch: "/series/",
	},
	{
		text: "Tags",
		link: "/tags/",
		activeMatch: "/tags/",
	},
];

export default items;
