import type { DefaultTheme } from "vitepress";

import { UNSERIES, LIMIT } from "../constants";
import { parserPath } from "../utils/parserPath";
import { toPathname } from "../utils/toPathname";
import { getGitUpdatedTime } from "../utils/getGitUpdatedTime";
import { posts } from "../data/posts";
import { series as seriesNames } from "../data/series";



const pinned = posts.map(post => {
	const { path, title, frontmatter, content } = post;
	if (frontmatter.pin !== true) return undefined;
	const { pathname } = parserPath(path);
	return {
		text: title,
		link: `/${pathname}`,
	};
}).filter(x => x !== undefined).slice(0, LIMIT.SIDEBAR_PINNED);

const recont = posts.map(x => ({
	...x,
	updatedAt: getGitUpdatedTime(x.path)?.timestamp,
})).filter(x => x.updatedAt).toSorted(x => x.updatedAt!).map(post => ({
	text: post.title,
	link: `/${parserPath(post.path).pathname}`,
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
		!pinned.length ? [] : [{
			collapsed: false,
			text: "Pinned Posts",
			items: pinned,
		}]
	),
	...(
		!recont.length ? [] : [{
			collapsed: false,
			text: "Recently Updated",
			items: recont,
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
