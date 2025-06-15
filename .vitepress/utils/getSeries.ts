import { UNSERIES } from "../constants";
import { postsToSort } from "./postsToSort";
import type { GetPostsReturnType } from "./getPosts";



export const getSeries = (posts: GetPostsReturnType) => {
	const seriesList = new Set<string>(UNSERIES.INCLUDE ? [] : [UNSERIES.SLUG]);
	return posts.toSorted(postsToSort).filter(post => {
		const { slug } = post.series;
		if (seriesList.has(slug)) return false;
		seriesList.add(slug);
		return true;
	}).map(x => x.series.slug);
};
