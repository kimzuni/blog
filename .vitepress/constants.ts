import type { GiscusProps } from "@giscus/vue";



export const URL = "https://blog.kimzuni.com";

export const BASE: string = "/base";

export const SITE = {
	LANG: "ko",
	TITLE: "Zuniverse",
	DESCRIPTION: "My own Universe",
} as const;

export const PAGINATION = {
	POST: 12,
	SERIES: 5,
	SERIES_POST: 15,
	TAG: 35,
	TAG_POST: 15,
} as const;

export const LIMIT = {
	HOME_PINNED: 5,
	SERIES_POST: 5,
	SIDEBAR_PINNED: 5,
	SIDEBAR_LATEST: 5,
} as const;

export const SERIES = {
	NUM_DELIMITER: "-",
	DESCRIPTION: {
	} as Record<string, string>,
} as const;

export const UNSERIES = "Unseries";



export const GISCUS: Omit<GiscusProps, "theme"> = {
	repo: "jh1950/giscus-test",
	repoId: "R_kgDOOxdddA",
	category: "Announcements",
	categoryId: "DIC_kwDOOxdddM4CqpRt",
	mapping: "pathname",
	reactionsEnabled: "1",
	inputPosition: "top",
} as const;
