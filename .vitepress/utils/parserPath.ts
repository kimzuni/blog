import { BASE } from "../constants";



export interface Series {
	name: string;
	order?: number;
}

export const parserPath = (path: string) => {
	const prefix = BASE && path.startsWith(BASE) ? `${BASE}/` : path.startsWith("/") ? "/" : "";
	const suffix = path.endsWith(".md") ? ".md" : path.endsWith(".html") ? ".html" : path.endsWith("/") ? "/" : "";
	let series: Series | undefined = undefined;
	path = path.slice(prefix.length, suffix ? -suffix.length : Infinity);

	if (path !== "index" && !path.endsWith("index")) {
		path = `${path}/index`
	}

	if (path.includes("page/1/index")) {
		path = path.replace("page/1/index", "index");
	} else if (path.startsWith("posts/") && !path.startsWith("posts/page/")) {
		const paths = path.split("/");
		const name = paths.splice(1, paths.length - 3).join("/");
		if (name) {
			series = { name };
			const filename = paths[1]?.split(".")!;
			if (filename.length !== 1 && /^\d+$/.test(`${filename[0]}`)) {
				series.order = Number(filename[0]) || undefined;
				paths[1] = filename.slice(1).join(".")!;
			}
		}
		path = paths.join("/");
	}

	const rewrite = `${prefix}${path}${suffix === "/" ? "" : suffix}`;
	const pathname = path === "index" ? rewrite : rewrite.slice(0, -5);

	return {
		rewrite,
		pathname,
		series,
	};
};
