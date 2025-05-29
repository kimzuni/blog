import type { DefaultTheme } from "vitepress";

import { UNSERIES, LIMIT } from "../constants";
import { parserHeading } from "../utils/parserHeading";
import { parserPath } from "../utils/parserPath";
import { toPathname } from "../utils/toPathname";
import { posts } from "../data/posts";
import { series } from "../data/series";



const items: DefaultTheme.Sidebar = [
	{
		collapsed: false,
		text: "Pinned",
		items: posts.map(post => {
			const { path, frontmatter, content } = post;
			if (frontmatter.pin !== true) return undefined;
			const title = frontmatter.title ?? parserHeading(content, "md");
			const { pathname } = parserPath(path);
			return {
				text: title,
				link: `/${pathname}`,
			};
		}).filter(Boolean).slice(0, LIMIT.SIDEBAR_PINNED) as DefaultTheme.SidebarItem["items"],
	},
	{
		collapsed: false,
		text: "Series",
		items: [
			...series.filter(x => x !== UNSERIES).sort((a, b) => a.localeCompare(b)).map(name => ({
				text: name,
				link: `/series/${toPathname(name)}/`,
			})),
			{
				text: UNSERIES,
				link: `/series/${toPathname(UNSERIES)}/`,
			},
		],
	},
];

export default items;
