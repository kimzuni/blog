import { type ComputedRef, computed } from "vue";

import { data, type Post } from "../../data/posts.data";
import { isInSeries } from "../../utils/series";



export interface UseSeriesProps {
	posts?: Post[];
	perSeries?: number;
	perPage?: number;
	currPage: ComputedRef<number>;
}

export const useSeries = ({
	posts=data,
	perSeries=0,
	perPage=0,
	currPage,
}: UseSeriesProps) => {
	const filtered = computed(() => {
		const names = [...new Set(posts.map(post => post.series.name).filter(Boolean))] as string[];
		const series = names.map(name => {
			const items = [...posts].filter(post => isInSeries(name, post.series.name));
			return {
				name,
				items: items.sort((a, b) => {
					const ao = a.series?.order ?? 0;
					const bo = b.series?.order ?? 0;
					return bo - ao;
				}).map((post, idx) => ({
					order: items.length - idx,
					post: post,
				})).slice(0, perSeries ? perSeries : Infinity),
			};
		});
		return series;
	});
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
