import fs from "fs";

import { parserFrontmatter } from "../utils/parserFrontmatter";



export const posts = fs
	.readdirSync("posts/", { recursive: true, encoding: "utf-8" })
	.filter(x => !x.startsWith("page/") && x.endsWith(".md"))
	.map(x => parserFrontmatter(`posts/${x}`))
;
