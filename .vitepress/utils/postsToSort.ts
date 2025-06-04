import type { Post as Base } from "../data/posts.data";

type Post = Pick<Base, "createdAt" | "updatedAt">;



export const postsToSort = (a: Post, b: Post) => {
	const at = a.updatedAt?.timestamp ?? a.createdAt?.timestamp ?? Infinity;
	const bt = b.updatedAt?.timestamp ?? b.createdAt?.timestamp ?? Infinity;
	return bt - at;
};
