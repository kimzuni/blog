import type { DefaultTheme } from "vitepress";



const items: DefaultTheme.Sidebar = [
	{
		text: "Posts",
		items: [
			{
				text: "Markdown Examples",
				link: "/posts/markdown-examples/",
			},
			{
				text: "Runtime API Examples",
				link: "/posts/api-examples/"
			},
		],
	},
];

export default items;
