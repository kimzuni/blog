import fs from "fs";

import { parserHeading } from "./parserHeading";
import { parserFrontmatter } from "./parserFrontmatter";
import { rawToPostContent } from "./rawToPostContent";



export type GetPostsReturnType = ReturnType<typeof getPosts>;
export const getPosts = (path: string) => {
	const posts = fs
		.readdirSync(path, { recursive: true, encoding: "utf-8" })
		.filter(x => !x.startsWith("page/") && x.endsWith(".md"))
		.map(x => {
			const data = parserFrontmatter(`${path}/${x}`);
			return {
				...data,
				title: data.frontmatter.title ?? parserHeading(data.content, "md"),
				path: `posts/${x}`,
			};
		})
	;
	return rawToPostContent(posts.map(x => ({
		url: x.path,
		src: x.orig,
		html: undefined,
		frontmatter: x.frontmatter,
		excerpt: x.excerpt,
	})));
}
