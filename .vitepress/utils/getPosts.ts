import fs from "fs";

import { parserHeading } from "./parserHeading";
import { parserFrontmatter } from "./parserFrontmatter";


export type GetPostsReturnType = ReturnType<typeof getPosts>;
export const getPosts = (path: string) => fs
	.readdirSync(path, { recursive: true, encoding: "utf-8" })
	.filter(x => !x.startsWith("page/") && x.endsWith(".md"))
	.map(x => {
		const data = parserFrontmatter(`${path}/${x}`);
		return {
			title: data.frontmatter.title ?? parserHeading(data.content, "md"),
			...data,
			path: `posts/${x}`,
		};
	})
;
