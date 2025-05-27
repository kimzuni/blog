import { type ComputedRef, computed } from "vue";

import { data, type Post } from "../../data/posts.data";
import { isInSeries } from "../../utils/series";



export interface UsePostsProps {
	posts?: Post[];
	series?: ComputedRef<string | undefined>;
	perPage?: number;
	currPage: ComputedRef<number>;
}

export const usePosts = ({
	posts=data,
	series,
	perPage=0,
	currPage,
}: UsePostsProps) => {
	const filtered = computed(() => series ? posts.filter(x => isInSeries(series.value, x.series?.name)) : posts);
	const totalPages = computed(() => perPage === 0 ? 1 : Math.ceil(filtered.value.length / perPage));
	const paginated = computed(() => perPage === 0 ? filtered.value : filtered.value.slice((currPage.value-1) * perPage, currPage.value * perPage));

	return {
		posts,
		filtered,
		paginated,
		totalPages,
		hasPrevious: computed(() => currPage.value > 1),
		hasNext: computed(() => currPage.value < totalPages.value),
	};
};
