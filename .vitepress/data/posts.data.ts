import { createContentLoader } from "vitepress";
import type { ContentData } from "vitepress";

import { BASE } from "../constants";
import { parserPath, type Series } from "../utils/parserPath";
import { parserHeading } from "../utils/parserHeading";
import { parserSlug } from "../utils/parserSlug";
import { stripHTML } from "../utils/stripHTML";

import { getGitUpdatedTime } from "../utils/getGitUpdatedTime";
import { toTimestamp, type PostDate } from "../utils/toTimestamp";



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

interface Frontmatter {
	pin: boolean;
	title: string;
	slug: string;
	description?: string;
	thumbnail?: string;
	createdAt: PostDate | null;
	updatedAt: PostDate | null;
	tags?: string[];
}

export interface Post extends Omit<ContentData, "html" | "frontmatter">, Frontmatter {
	series: Series;
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
		const { pathname, series } = parserPath(url, post);
		const heading = parserHeading(html);
		const thumbnail = getThumbnail(post.thumbnail, html);
		excerpt = stripHTML(excerpt || html)?.slice(0, 120);

		const createdAt = post.createdAt ?? post.date;
		const updatedAt = post.updatedAt ?? post.last_modified_at;
		return {
			src, excerpt,
			url: `${BASE}${pathname}`,
			pin: Boolean(post.pin),
			title: toString(post.title) || heading || "Untitled",
			slug: parserSlug(pathname)!,
			description: toString(post.description),
			thumbnail: post.thumbnail === false || !thumbnail ? noImage : thumbnail,
			createdAt: toTimestamp(createdAt) || getGitUpdatedTime(filepath, true),
			updatedAt: updatedAt === false ? null : toTimestamp(updatedAt) || getGitUpdatedTime(filepath, false),
			series: series!,
			tags: toArray(post.tags),
		};
	}).sort((a, b) => {
		const at = a.updatedAt?.timestamp ?? a.createdAt?.timestamp ?? Infinity;
		const bt = b.updatedAt?.timestamp ?? b.createdAt?.timestamp ?? Infinity;
		return bt - at;
	}),
});
