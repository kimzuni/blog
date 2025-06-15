import { computed } from 'vue';
import { useData } from 'vitepress';

import { useSeries, type UseSeriesFilteredItem } from './useSeries';
import { useCurrentPost } from "../composables/useCurrentPost";



const setData = (item: UseSeriesFilteredItem | undefined, data: any) => {
	if (data === false) return;

	let text: string;
	let link: string | undefined = undefined;
	if (typeof data === "string") {
		if (!item) return;
		text = data;
		link = item.post.url;
	} else if (typeof data === "object") {
		if (!("text" in data)) return;
		text = data.text;
		if ("link" in data) link = data.link;
	} else if (!item) {
		return;
	} else {
		text = item.post.title;
		link = item.post.url;
	}

	return { text, link };
};

export const usePrevNext = () => {
	const { frontmatter } = useData();
	const post = useCurrentPost();
	const series = useSeries({
		currPage: computed(() => 1),
		seriesSlug: computed(() => post.value.series.slug),
	});

	const items = computed(() => series.paginated.value[0]?.items ?? []);
	const currIdx = computed(() => items.value.findIndex(x => x.post === post.value));
	return computed(() => ({
		prev: setData(items.value[currIdx.value + 1], frontmatter.value.prev),
		next: setData(items.value[currIdx.value - 1], frontmatter.value.next),
	}));
};
