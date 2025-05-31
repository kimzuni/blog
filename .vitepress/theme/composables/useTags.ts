import { type ComputedRef, computed } from "vue";

import { data, type Post } from "../../data/posts.data";
import { toPathname } from "../../utils/toPathname";



export interface UseTagsFiltered {
	name: string;
	total: number;
	posts: Post[];
}

export interface UseSeriesProps {
	posts?: Post[];
	tagNames?: ComputedRef<string[]>;
	perTag?: number;
	perPage?: number;
	currPage: ComputedRef<number>;
}

export const useTags = ({
	posts=data,
	tagNames,
	perTag=0,
	perPage=0,
	currPage,
}: UseSeriesProps) => {
	const filtered = computed<UseTagsFiltered[]>(() => {
		const names = 
			posts.map(post => post.tags).flat()
			.filter(x => x !== undefined)
			.filter(name => !tagNames || tagNames.value.map(toPathname).includes(toPathname(name)))
			.reduce<string[]>((acc, cur) => {
				if (!acc.map(toPathname).includes(toPathname(cur))) {
					acc.push(cur);
				}
				return acc;
			}, [])
		;
		return names.map(name => {
			const items = posts.filter(post => post.tags?.includes(name));
			const total = items.length;
			return {
				name,
				total,
				posts: items.slice(0, perTag ? perTag : Infinity),
			};
		}).sort((a, b) => b.posts.length - a.posts.length);
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
