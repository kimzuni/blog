import type { DefaultTheme } from "vitepress";

import { UNSERIES, LIMIT } from "../constants";
import { parserPath } from "../utils/parserPath";
import { toPathname } from "../utils/toPathname";
import { postsToSort } from "../utils/postsToSort";
import { parserDatetimes } from "../utils/parserDatetimes";
import { posts } from "../data/posts";
import { series as seriesNames } from "../data/series";



const pinned = posts.map(post => {
	const { path, title, frontmatter } = post;
	if (frontmatter.pin !== true) return undefined;
	const { pathname } = parserPath(path);
	return {
		text: title,
		link: `/${pathname}`,
	};
}).filter(x => x !== undefined).slice(0, LIMIT.SIDEBAR_PINNED);

const postsWithDate = posts.map(x => ({
	...x,
	...parserDatetimes(x.path, x.frontmatter),
	pathname: `/${parserPath(x.path).pathname}`,
}));

const unpublished = postsWithDate.filter(x => !x.createdAt).map(post => ({
	text: post.title,
	link: post.pathname,
}));

const recent = postsWithDate.filter(x => x.createdAt || x.updatedAt).toSorted(postsToSort).map(post => ({
	text: post.title,
	link: post.pathname,
})).slice(0, LIMIT.SIDEBAR_LATEST);

const series = [
	...seriesNames.filter(x => x !== UNSERIES.LABEL).toSorted((a, b) => a.localeCompare(b)).map(name => ({
		text: name,
		link: `/series/${toPathname(name)}/`,
	})),
	(!UNSERIES.INCLUDE || !seriesNames.find(x => x === UNSERIES.LABEL) ? {} : {
		text: UNSERIES.LABEL,
		link: `/series/${toPathname(UNSERIES.LABEL)}/`,
	}),
];



const items: DefaultTheme.Sidebar = [
	...(
		!unpublished.length ? [] : [{
			collapsed: false,
			text: "Unpublished",
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
			text: "Recently Updated",
			items: recent,
		}]
	),
	...(
		!series.length ? [] : [{
			collapsed: false,
			text: "All Series",
			items: series,
		}]
	),
];

export default items;
