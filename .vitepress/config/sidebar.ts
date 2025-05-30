import type { DefaultTheme } from "vitepress";

import { UNSERIES, LIMIT } from "../constants";
import { parserPath } from "../utils/parserPath";
import { toPathname } from "../utils/toPathname";
import { getGitUpdatedTime } from "../utils/getGitUpdatedTime";
import { posts } from "../data/posts";
import { series } from "../data/series";



const items: DefaultTheme.Sidebar = [
	{
		collapsed: false,
		text: "Pinned Posts",
		items: posts.map(post => {
			const { path, title, frontmatter, content } = post;
			if (frontmatter.pin !== true) return undefined;
			const { pathname } = parserPath(path);
			return {
				text: title,
				link: `/${pathname}`,
			};
		}).filter(Boolean).slice(0, LIMIT.SIDEBAR_PINNED) as DefaultTheme.SidebarItem["items"],
	},
	{
		collapsed: false,
		text: "Latest Posts",
		items: posts.map(x => ({
			...x,
			updatedAt: getGitUpdatedTime(x.path)?.timestamp,
		})).filter(x => x.updatedAt).toSorted(x => x.updatedAt!).map(post => ({
			text: post.title,
			link: `/${parserPath(post.path).pathname}`,
		})).slice(0, LIMIT.SIDEBAR_LATEST)
	},
	{
		collapsed: false,
		text: "Series",
		items: [
			...series.filter(x => x !== UNSERIES).toSorted((a, b) => a.localeCompare(b)).map(name => ({
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
