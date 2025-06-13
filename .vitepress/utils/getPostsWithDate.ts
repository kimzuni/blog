import { postsToSort } from "./postsToSort";
import { parserDatetimes } from "./parserDatetimes";
import { parserPath } from "./parserPath";
import type { GetPostsReturnType } from "./getPosts";



type GetPostsWithDateReturnType =
	& GetPostsReturnType[number]
	& ReturnType<typeof parserDatetimes>
	& {
		pathname: string;
	}
;

export const getPostsWithDate = (posts: GetPostsReturnType): GetPostsWithDateReturnType[] => posts.map(x => ({
	...x,
	...parserDatetimes(x.path, x.frontmatter),
	pathname: `/${parserPath(x.path).pathname}`,
})).toSorted(postsToSort);
