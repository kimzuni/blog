import type { GetPostsReturnType } from "./getPosts";



export const getTags = (posts: GetPostsReturnType) => [...new Set(posts
	.map(x => x.tags)
	.flat()
	.filter(Boolean)
	.map(x =>
		`${x}`
		.trim()
	)
)];
