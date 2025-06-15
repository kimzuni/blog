import { type ComputedRef, computed } from "vue";

import { data, type Post } from "../../data/posts.data";
import { checkSeries } from "../../utils/series";
import { toPathname } from "../../utils/toPathname";



export interface UsePostsProps {
	posts?: Post[];
	seriesSlug?: ComputedRef<string | undefined>;
	tagName?: ComputedRef<string>;
	pinned?: ComputedRef<boolean>;
	currPage: ComputedRef<number>;
	perPage?: number;
}

export const usePosts = ({
	posts=data,
	seriesSlug,
	tagName,
	pinned,
	perPage=0,
	currPage,
}: UsePostsProps) => {
	const filtered = computed(() => posts.filter(post => (
		(!seriesSlug || checkSeries(seriesSlug.value, post.series?.slug))
		&&
		(!tagName || post.tags?.map(toPathname).includes(toPathname(tagName.value)))
		&&
		(pinned === undefined || post.pin === (typeof pinned === "boolean" ? pinned : pinned.value))
	)));
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
