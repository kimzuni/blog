import type { DefaultTheme } from "vitepress";

import { LIMIT } from "../constants";
import { toPathname } from "../utils/toPathname";
import { posts } from "../data/posts";
import { series as seriesNames } from "../data/series";



const pinned = posts.filter(x => x.pin).map(post => ({
	text: post.title,
	link: `/posts/${post.slug}/`,
})).slice(0, LIMIT.SIDEBAR_PINNED);

const unpublished = posts.filter(x => !x.createdAt).map(post => ({
	text: post.title,
	link: `/posts/${post.slug}/`,
}));

const recent = posts.filter(x => x.createdAt || x.updatedAt).map(post => ({
	text: post.title,
	link: `/posts/${post.slug}/`,
})).slice(0, LIMIT.SIDEBAR_LATEST);

const series = seriesNames.map(name => ({
	text: name,
	link: `/series/${toPathname(name)}/`,
})).slice(0, LIMIT.SIDEBAR_SERIES);



const items: DefaultTheme.Sidebar = [
	...(
		!unpublished.length ? [] : [{
			collapsed: false,
			text: "Unpublished Posts",
			items: unpublished,
		}]
	),
	...(
		!pinned.length ? [] : [{
			collapsed: false,
			text: "Pinned Posts",
			items: pinned,
		}]
	),
	...(
		!recent.length ? [] : [{
			collapsed: false,
			text: "Recently Updated Posts",
			items: recent,
		}]
	),
	...(
		!series.length ? [] : [{
			collapsed: false,
			text: "Recently Updated Series",
			items: series,
		}]
	),
];

export default items;
