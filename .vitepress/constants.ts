import type { GiscusProps } from "@giscus/vue";

export { default as archives } from "./archivess";



export const TIME_ZONE = "Asia/Seoul";

export const URL = "https://blog.kimzuni.com";

export const BASE: string = "";

export const ASSETS_DIR = "assets/";

export const SITE = {
	LANG: "ko",
	TITLE: "Zuniverse",
	DESCRIPTION: "My own Universe",
} as const;

export const PAGINATION = {
	POST: 12,
	SERIES: 6,
	SERIES_POST: 15,
	TAG: 35,
	TAG_POST: 15,
} as const;

export const LIMIT = {
	HOME_PINNED: 4,
	SERIES_POST: 5,
	SIDEBAR_PINNED: 5,
	SIDEBAR_LATEST: 5,
} as const;

export const SERIES = {
	NUM_DELIMITER: "-",
	DESCRIPTION: {
	} as Record<string, string>,
} as const;

export const UNSERIES = {
	INCLUDE: true,
	LABEL: "Unseries",
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
