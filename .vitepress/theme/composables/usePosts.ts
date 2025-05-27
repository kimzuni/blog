import { ref, computed, watch } from "vue";

import { data, type Post } from "../../data/posts.data";



export interface UsePostsProps {
	posts?: Post[];
	series?: string;
	perPage?: number;
	currPage?: number;
}

export const usePosts = ({
	posts=data,
	series,
	perPage=0,
	currPage,
}: UsePostsProps = {}) => {
	const _currPage = ref(currPage || 1);

	const setPage = (page: number) => {
		_currPage.value = page || 1;
	};

	watch(_currPage, (page) => {
		if (!page || page < 1) _currPage.value = 1
		else if (page > totalPages.value) _currPage.value = totalPages.value;
	});

	const filtered = computed(() => series ? posts.filter(x => x.series === series) : posts);
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
