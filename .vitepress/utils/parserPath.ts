import { BASE, UNSERIES, SERIES } from "../constants";
import { stripPath } from "./stripPath";
import type { Frontmatter } from "./parserFrontmatter";



export interface Series {
	name: string;
	order?: number;
}

export const splitSeriesNum = (name: string) => {
	const data: {
		num?: number;
		name: string;
	} = { name };

	const split = name.split(SERIES.NUM_DELIMITER);
	if (1 < split.length && /^\d+$/.test(split[0]!)) {
		data.num = Number(split[0]) || undefined;
		data.name = split.slice(1).join(SERIES.NUM_DELIMITER)!;
	}

	return data;
};

export const parserSeries =  (path: string, frontmatter?: Frontmatter): Series | undefined => {
	path = stripPath(path);
	if (!path.startsWith("posts/")) return undefined;
	path = path.slice(6);

	const series: Partial<Series> = {};
	if (frontmatter?.series !== undefined) {
		if (typeof frontmatter.series === "boolean") {
			series.name = UNSERIES.LABEL;
		} else if (typeof frontmatter.series === "string") {
			series.name = frontmatter.series;
		} else if (typeof frontmatter.series === "number") {
			series.order = frontmatter.series;
		} else {
			series.name = frontmatter.series.include === false ? UNSERIES.LABEL : frontmatter.series.name ? String(frontmatter.series.name) : undefined;
			series.order = Number(frontmatter.series.order) || undefined;
		}
	}

	const paths = path.split("/");
	const filename = paths.pop();
	if (!series.name) {
		const idx = paths.findIndex(value => value.startsWith("_"));
		series.name = paths.slice(0, idx !== -1 ? idx : Infinity).map(x => splitSeriesNum(x).name).join("/");
	}

	if (series.name && series.order === undefined) {
		const { num } = splitSeriesNum(filename!);
		series.order = Number(num) || undefined;
	}

	return {
		name: (series.name || UNSERIES.LABEL).replace(/_/g, " "),
		order: series.order,
	};
};

export const parserPath = (path: string, frontmatter?: Frontmatter) => {
	const prefix = BASE && path.startsWith(BASE) ? `${BASE}/` : path.startsWith("/") ? "/" : "";
	const suffix = path.endsWith(".md") ? ".md" : path.endsWith(".html") ? ".html" : "";
	let series: Series | undefined = undefined;
	path = stripPath(path);

	if (path.includes("page/1")) {
		path = path.replace("page/1", "index");
	} else if (path.startsWith("posts/") && !path.startsWith("posts/page/")) {
		series = parserSeries(path, frontmatter);
		const paths = path.split("/");
		paths.splice(1, paths.length - 2);
		if (series?.order) {
			paths[1] = paths[1]!.split(`${series.order}${SERIES.NUM_DELIMITER}`).slice(1).join(`${series.order}${SERIES.NUM_DELIMITER}`);
		}
		path = paths.join("/");
	}

	if (!path) {
		path = "index";
	} else if (!path.endsWith("index")) {
		path = `${path}/index`;
	}

	const rewrite = `${prefix}${path}${suffix}`.toLowerCase().replace(/_| /g, "-");
	const pathname = path === "index" ? rewrite : rewrite.slice(0, -(5 + suffix.length));

	return {
		rewrite,
		pathname,
		series,
	};
};
