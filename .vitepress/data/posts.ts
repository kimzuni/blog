import fs from "fs";

import { parserHeading } from "../utils/parserHeading";
import { parserFrontmatter } from "../utils/parserFrontmatter";



export const posts = fs
	.readdirSync("posts/", { recursive: true, encoding: "utf-8" })
	.filter(x => !x.startsWith("page/") && x.endsWith(".md"))
	.map(x => {
		const data = parserFrontmatter(`posts/${x}`);
		return {
			title: data.frontmatter.title ?? parserHeading(data.content, "md"),
			...data,
		};
	})
;
