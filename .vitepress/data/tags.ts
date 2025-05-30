import { toPathname } from "../utils/toPathname";
import { posts } from "./posts";



export const tags = [...new Set(posts
	.map(x => x.frontmatter.tags)
	.flat()
	.filter(Boolean)
	.map(x =>
		`${x}`
		.trim()
	)
	.map(toPathname)
)];
