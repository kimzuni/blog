import { UNSERIES } from "../constants";
import { postsToSort } from "./postsToSort";
import type { GetPostsReturnType } from "./getPosts";



export const getSeries = (posts: GetPostsReturnType) => {
	const seriesList = new Set<string>(UNSERIES.INCLUDE ? [] : [UNSERIES.LABEL]);
	return posts.toSorted(postsToSort).filter(post => {
		const name = post.series.name;
		if (seriesList.has(name)) return false;
		seriesList.add(name);
		return true;
	}).map(x => x.series.name.trim());
};
