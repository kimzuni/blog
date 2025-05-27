export const URL = "https://blog.kimzuni.com";

export const BASE: string = "";

export const SITE = {
	LANG: "ko",
	TITLE: "Zuniverse",
	DESCRIPTION: "My own Universe",
} as const;

export const PAGINATION = {
	POST: 12,
	SERIES: 5,
	SERIES_PREVIEW: 5,
	SERIES_POST: 15,
} as const;

export const SERIES = {
	NUM_DELIMITER: "-",
	DESCRIPTION: {
	} as Record<string, string>,
};

export const UNSERIES = "Unseries";
