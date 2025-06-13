import { UNSERIES } from "../constants";
import { parserSeries } from "./parserPath";
import type { GetPostsReturnType } from "./getPosts";



export const getSeries = (posts: GetPostsReturnType) => [
	...new Set(posts.map(x => parserSeries(x.path, x.frontmatter)!.name).flat()),
].filter(x => UNSERIES.INCLUDE || x !== UNSERIES.LABEL).map(x => x.trim());
