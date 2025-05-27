import { execSync } from "child_process";
import { createContentLoader } from "vitepress";
import type { ContentData } from "vitepress";

import { BASE, SITE } from "../constants";
import { parserPath, type Series } from "../utils/parserPath";
import { stripHTML } from "../utils/stripHTML";



const noImage = "data:image/svg+xml;base64," + btoa(`
	<svg xmlns="http://www.w3.org/2000/svg" height="160" width="160">
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image :(</text>
	</svg>
`.replace(/\s+/g, " ").trim());



const toString = (string?: any) => {
	return !string ? undefined : String(string);
};

const toArray = (item?: string | string[]) => {
	if (!item) return undefined;
	const arr = typeof item !== "string" ? item : item.split(",");
	return arr.map(x => x.trim());
};

const toTimestamp = (value?: string): PostDate | null => {
	const date = new Date(value || "");
	const timestamp = date.getTime();
	const string = date.toLocaleString(SITE.LANG);

	return isNaN(timestamp) ? null : {
		timestamp,
		string,
	};
};

const toPath = (path?: string) => {
	if (!path) return undefined;
	if (path.startsWith("http")) return path;
	if (!path.startsWith("/")) return path;
	return `${BASE}${path}`;
};

const getThumbnail = (path?: string, html?: string) => {
	path = toPath(path)
	if (path) return path;

	html = html?.split("<img")[1]?.split("src=")[1]?.trim();
	const qut = html?.slice(0, 1);
	if (!qut) return undefined;
	return toPath(html?.split(qut)[1]);
};

const getGitUpdatedTime = (path: string, createdAt=true) => {
	try {
		const time = execSync(`git log --diff-filter=${createdAt ? "A" : "M"} --follow --format=%cI -1 "${path}"`, { encoding: "utf-8" }).trim();
		return toTimestamp(time) || null;
	} catch {
		return null
	}
};

interface PostDate {
	timestamp: number;
	string: string;
}

interface Frontmatter {
	pin?: boolean;
	title: string;
	description?: string;
	thumbnail?: string;
	createdAt: PostDate | null;
	updatedAt: PostDate | null;
	categories?: string | string[];
	tags?: string | string[];
}

export interface Post extends Omit<ContentData, "frontmatter">, Frontmatter {
	series?: Series;
}

export declare const data: Post[];

export default createContentLoader([
	"posts/!(index).md",
	"posts/!(page)/**/*.md",
], {
	render: true,
	excerpt: true,
	includeSrc: true,
	transform: (raw): Post[] => raw.map(({ url, src, html, excerpt, frontmatter: post }) => {
		const filepath = `${url.endsWith("/") ? `${url}index` : url}.md`.slice(1);
		const { pathname, series } = parserPath(url);
		const heading = stripHTML(html?.slice(html.indexOf("<h1 "), html.indexOf("</h1>")+5));
		excerpt = stripHTML(excerpt);

		return {
			src, html, excerpt,
			url: `${BASE}${pathname}`,
			pin: Boolean(post.pin),
			title: toString(post.title) || heading || "Untitled",
			description: toString(post.description),
			thumbnail: getThumbnail(post.thumbnail, html) || noImage,
			createdAt: toTimestamp(post.createdAt) || getGitUpdatedTime(filepath, true),
			updatedAt: toTimestamp(post.updatedAt) || getGitUpdatedTime(filepath, false),
			series: series,
			categories: toArray(post.categories),
			tags: toArray(post.categories),
		};
	}).sort((a, b) => {
		const at = a.updatedAt?.timestamp ?? a.createdAt?.timestamp ?? Infinity;
		const bt = b.updatedAt?.timestamp ?? b.createdAt?.timestamp ?? Infinity;
		return bt - at;
	}),
});
