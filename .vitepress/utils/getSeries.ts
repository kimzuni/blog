import { UNSERIES } from "../constants";
import type { GetPostsReturnType } from "./getPosts";



export const getSeries = (posts: GetPostsReturnType) => [
	...new Set(posts.map(x => x.series.name).flat()),
].filter(x => x !== undefined).filter(x => UNSERIES.INCLUDE || x !== UNSERIES.LABEL).map(x => x.trim());
