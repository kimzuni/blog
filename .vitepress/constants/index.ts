import type { GiscusProps } from "@giscus/vue";

export * as SERIES from "./series";
export { default as archives } from "./archivess";



export const TIME_ZONE = "Asia/Seoul";

export const GITHUB_REPO = "kimzuni/blog";

export const URL = "https://blog.kimzuni.com";

export const BASE: string = "";

export const ASSETS_DIR = "assets/";

export const SITE = {
	LANG: "ko",
	TITLE: "Zuniverse",
	DESCRIPTION: "My own Universe",
} as const;

export const PAGINATION = {
	POST: 15,
	SERIES: 10,
	SERIES_POST: 15,
	TAG: 35,
	TAG_POST: 15,
} as const;

export const LIMIT = {
	HOME_PINNED: 4,
	SERIES_POST: 5,
	SIDEBAR_PINNED: 5,
	SIDEBAR_LATEST: 5,
	SIDEBAR_SERIES: 5,
} as const;

export const UNSERIES = {
	INCLUDE: true,
	SLUG: "unseries",
	LABEL: "Unseries",
} as const;

export const TAGS = {
	DESCRIPTION: {
	} as Partial<Record<string, string>>,
} as const;



export const GISCUS: Omit<GiscusProps, "theme"> = {
	repo: "kimzuni/comments",
	repoId: "R_kgDOHtCl5Q",
	category: "Blog",
	categoryId: "DIC_kwDOHtCl5c4CQZlo",
	mapping: "pathname",
	strict: "1",
	reactionsEnabled: "0",
	emitMetadata: "1",
	inputPosition: "top",
	lang: "en",
	loading: "lazy",
} as const;



export const NO_IMAGE = "data:image/svg+xml;base64," + btoa(`
	<svg xmlns="http://www.w3.org/2000/svg" height="160" width="160">
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image :(</text>
	</svg>
`.replace(/\s+/g, " ").trim());
