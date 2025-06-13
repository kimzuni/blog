import { parserPath } from "./parserPath";
import type { GetPostsReturnType } from "./getPosts";



export const getPinnedPosts = (posts: GetPostsReturnType) => posts.map(post => {
	const { path, title, frontmatter } = post;
	if (frontmatter.pin !== true) return undefined;
	const { pathname } = parserPath(path);
	return {
		text: title,
		link: `/${pathname}`,
	};
}).filter(x => x !== undefined);
