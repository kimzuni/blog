import type { DefaultTheme } from "vitepress";



const items: DefaultTheme.NavItem[] = [
	{
		text: "Home",
		link: "/",
	},
	{
		text: "Posts",
		link: "/posts/",
		activeMatch: "/posts/",
	},
];

export default items;
