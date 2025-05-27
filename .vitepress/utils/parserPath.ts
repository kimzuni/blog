import { BASE, UNSERIES, SERIES } from "../constants";



const stripPath = (path: string) => {
	if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
	if (path.startsWith("/")) path = path.slice(1);
	if (path.endsWith(".md")) path = path.slice(0, -3);
	if (path.endsWith(".html")) path = path.slice(0, -5);
	if (path.endsWith("index")) path = path.slice(0, -5);
	if (path.endsWith("/")) path = path.slice(0, -1);
	return path;
};



export interface Series {
	name: string;
	order?: number;
}

export const parserSeries =  (path: string) => {
	path = stripPath(path);
	if (!path.startsWith("posts/")) return undefined;
	path = path.slice(6);

	const paths = path.split("/");
	const filename = paths.pop()?.split(SERIES.NUM_DELIMITER);
	const idx = paths.findIndex(value => value.startsWith("_"));
	const seriesName = paths.slice(0, idx !== -1 ? idx : Infinity).join("/") || UNSERIES;
	const series: Series = { name: seriesName };
	if (filename && filename.length !== 1 && /^\d+$/.test(`${filename[0]}`)) {
		series.order = Number(filename[0]) || undefined;
		paths[1] = filename.slice(1).join(SERIES.NUM_DELIMITER)!;
	}
	return series;
};

export const parserPath = (path: string) => {
	const prefix = BASE && path.startsWith(BASE) ? `${BASE}/` : path.startsWith("/") ? "/" : "";
	const suffix = path.endsWith(".md") ? ".md" : path.endsWith(".html") ? ".html" : "";
	let series: Series | undefined = undefined;
	path = stripPath(path);

	if (path.includes("page/1")) {
		path = path.replace("page/1", "index");
	} else if (path.startsWith("posts/") && !path.startsWith("posts/page/")) {
		series = parserSeries(path);
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

	const rewrite = `${prefix}${path}${suffix}`.toLowerCase();
	const pathname = path === "index" ? rewrite : rewrite.slice(0, -(5 + suffix.length));

	return {
		rewrite,
		pathname,
		series,
	};
};
