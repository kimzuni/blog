import fs from "fs";



export const posts = fs
	.readdirSync("posts/", { recursive: true, encoding: "utf-8" })
	.filter(x => !x.startsWith("page/") && x.endsWith(".md"))
	.map(x => `posts/${x}`)
;
