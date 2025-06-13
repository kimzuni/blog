import { postsToSort } from "./postsToSort";
import { parserDatetimes } from "./parserDatetimes";
import { parserPath } from "./parserPath";
import type { GetPostsReturnType } from "./getPosts";



export const getPostsWithDate = (posts: GetPostsReturnType) => posts.map(x => ({
	...x,
	...parserDatetimes(x.path, x.frontmatter),
	pathname: `/${parserPath(x.path).pathname}`,
})).toSorted(postsToSort);
