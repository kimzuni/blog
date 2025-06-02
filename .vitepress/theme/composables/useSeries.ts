import { type ComputedRef, computed } from "vue";

import { UNSERIES } from "../../constants";
import { data, type Post } from "../../data/posts.data";
import { checkSeries } from "../../utils/series";



export interface UseSeriesFilteredItem {
	order: number;
	post: Post,
}

export interface UseSeriesFiltered {
	name: string;
	total: number;
	items: UseSeriesFilteredItem[];
}

export interface UseSeriesProps {
	posts?: Post[];
	seriesName?: ComputedRef<string>;
	perSeries?: number;
	perPage?: number;
	currPage: ComputedRef<number>;
	sort?: "newest" | "oldest";
}

export const useSeries = ({
	posts=data,
	seriesName,
	perSeries=0,
	perPage=0,
	currPage,
	sort="newest",
}: UseSeriesProps) => {
	const filtered = computed<UseSeriesFiltered[]>(() => {
		const names = [...new Set(posts.map(post => post.series.name).filter(name => !seriesName || checkSeries(seriesName.value, name)))].filter(x => UNSERIES.INCLUDE || x !== UNSERIES.LABEL);
		return names.map(name => {
			const items = posts.filter(post => checkSeries(name, post.series.name));
			const total = items.length;
			const sorted = items.sort((a, b) => {
				const ao = a.series?.order ?? 0;
				const bo = b.series?.order ?? 0;
				return bo - ao;
			});
			if (sort === "oldest") sorted.reverse();
			return {
				name,
				total,
				items: sorted.map((post, idx) => ({
					order: sort === "oldest" ? idx+1 : items.length - idx,
					post: post,
				})).slice(0, perSeries ? perSeries : Infinity),
			};
		});
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
