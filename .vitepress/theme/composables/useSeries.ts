import { ref, computed, watch } from "vue";

import { UNSERIES } from "../../constants";
import { data, type Post } from "../../data/posts.data";
import { isInSeries } from "../../utils/series";



export interface UseSeriesProps {
	posts?: Post[];
	perSeries?: number;
	perPage?: number;
	currPage?: number;
}

export const useSeries = ({
	posts=data,
	perSeries=0,
	perPage=0,
	currPage,
}: UseSeriesProps = {}) => {
	const _currPage = ref(currPage || 1);

	const setPage = (page: number) => {
		_currPage.value = page || 1;
	};

	watch(_currPage, (page) => {
		if (!page || page < 1) _currPage.value = 1
		else if (page > totalPages.value) _currPage.value = totalPages.value;
	});

	const filtered = computed(() => {
		const names = [...new Set(posts.map(post => post.series?.name ?? UNSERIES).filter(Boolean))] as string[];
		const series = names.map(name => {
			const items = [...posts].filter(post => isInSeries(name, post.series?.name ?? UNSERIES));
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
	const paginated = computed(() => perPage === 0 ? filtered.value : filtered.value.slice((_currPage.value-1) * perPage, _currPage?.value * perPage));

	return {
		posts,
		filtered,
		paginated,
		totalPages,
		currPage: _currPage,
		hasPrevious: computed(() => _currPage.value > 1),
		hasNext: computed(() => _currPage.value < totalPages.value),
		setPage: setPage,
	};
};
