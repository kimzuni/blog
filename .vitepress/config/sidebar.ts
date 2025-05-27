import type { DefaultTheme } from "vitepress";

import { UNSERIES } from "../constants";
import { parserFrontmatter } from "../utils/parserFrontmatter";
import { parserHeading } from "../utils/parserHeading";
import { parserPath } from "../utils/parserPath";
import { posts } from "../data/posts";
import { series } from "../data/series";



const items: DefaultTheme.Sidebar = [
	{
		text: "Pinned",
		items: posts.map(post => {
			const { frontmatter, content } = parserFrontmatter(post) ?? {};
			if (frontmatter?.pin !== "true") return undefined;
			const title = frontmatter.title ?? parserHeading(content, "md");
			const { pathname } = parserPath(post);
			return {
				text: title,
				link: `/${pathname}`,
			};
		}).filter(Boolean) as DefaultTheme.SidebarItem["items"],
	},
	{
		text: "Series",
		items: [
			...series.filter(x => x !== UNSERIES).sort((a, b) => a.localeCompare(b)).map(name => ({
				text: name,
				link: `/series/${name.toLowerCase()}/`,
			})),
			{
				text: UNSERIES,
				link: `/series/${UNSERIES.toLowerCase()}/`,
			},
		],
	},
];

export default items;
