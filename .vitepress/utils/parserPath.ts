import { BASE, UNSERIES, SERIES } from "../constants";
import { stripPath } from "./stripPath";
import type { Frontmatter } from "./parserFrontmatter";



export interface Series {
	name: string;
	order?: number;
}

export const parserSeries =  (path: string, frontmatter?: Frontmatter): Series | undefined => {
	path = stripPath(path);
	if (!path.startsWith("posts/")) return undefined;
	path = path.slice(6);

	const series: Partial<Series> = {};
	if (frontmatter?.series) {
		if (typeof frontmatter.series === "string") {
			series.name = frontmatter.series;
		} else if (typeof frontmatter.series === "number") {
			series.order = frontmatter.series;
		} else {
			series.name = frontmatter.series.name;
			series.order = frontmatter.series.order;
		}
	}

	const paths = path.split("/");
	const filename = paths.pop()?.split(SERIES.NUM_DELIMITER);
	if (!series.name) {
		const idx = paths.findIndex(value => value.startsWith("_"));
		series.name = paths.slice(0, idx !== -1 ? idx : Infinity).join("/");
	}

	if (series.name && series.order === undefined && filename && filename.length !== 1 && /^\d+$/.test(`${filename[0]}`)) {
		series.order = Number(filename[0]) || undefined;
		paths[1] = filename.slice(1).join(SERIES.NUM_DELIMITER)!;
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
