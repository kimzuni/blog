import type { ContentData } from "vitepress";

import { BASE } from "../constants";
import { postsToSort } from "./postsToSort";
import { stripPath } from "./stripPath";
import { parserPath, type Series } from "./parserPath";
import { parserHeading } from "./parserHeading";
import { parserSlug } from "./parserSlug";
import { stripHTML } from "./stripHTML";
import { parserDatetimes } from "./parserDatetimes";

import { type PostDate } from "./toTimestamp";



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

const getThumbnail = (path?: string, string?: string, ext: "html" | "md" = "html") => {
	path = toPath(path)
	if (path) return path;

	if (ext === "html") {
		string = string?.split("<img")[1]?.split("src=")[1]?.trim();
		const qut = string?.slice(0, 1);
		if (!qut) return undefined;
		return toPath(string?.split(qut)[1]);
	} else {
		const src = string?.split("![")[1]?.split("](")[1]?.split(")")[0];
		return toPath(src);
	}
};

interface Frontmatter {
	pin: boolean;
	title: string;
	slug: string;
	thumbnail?: string;
	createdAt: PostDate | null;
	updatedAt: PostDate | null;
	tags?: string[];
}

export interface Post extends Omit<ContentData, "src" | "html" | "frontmatter">, Frontmatter {
	series: Series;
	filepath: string;
}

export declare const data: Post[];

export const rawToPostContent = (raw: ContentData[]): Post[] => raw.map(({ url, src, html, excerpt, frontmatter: post }) => {
	const filepath = `${stripPath(url, { keepIndex: true })}.md`;
	const { pathname, series } = parserPath(url, post);
	const heading = parserHeading(html);
	const thumbnail = getThumbnail(post.thumbnail, src, "md");
	excerpt = stripHTML(post.description || excerpt || html)?.slice(0, 150);

	return {
		excerpt,
		url: `${BASE}${pathname}`,
		pin: Boolean(post.pin),
		title: toString(post.title) || heading || "Untitled",
		slug: parserSlug(pathname)!,
		thumbnail: post.thumbnail !== false && thumbnail ? thumbnail : undefined,
		series: series!,
		tags: toArray(post.tags),
		filepath,
		...parserDatetimes(filepath, post),
	};
}).sort(postsToSort);
