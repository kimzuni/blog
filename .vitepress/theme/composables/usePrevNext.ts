import { computed } from 'vue';
import { useData } from 'vitepress';

import type { Post } from '../../data/posts.data';
import { usePosts } from './usePosts';
import { useCurrentPost } from "../composables/useCurrentPost";



const setData = (post: Post | undefined, data: any) => {
	if (data === false) return;

	let text: string;
	let link: string | undefined = undefined;
	if (typeof data === "string") {
		if (!post) return;
		text = data;
		link = post.url;
	} else if (typeof data === "object") {
		if (!("text" in data)) return;
		text = data.text;
		if ("link" in data) link = data.link;
	} else if (!post) {
		return;
	} else {
		text = post.title;
		link = post.url;
	}

	return { text, link };
};

export const usePrevNext = () => {
	const { frontmatter } = useData();
	const post = useCurrentPost();
	const posts = usePosts({
		currPage: computed(() => 1),
		seriesName: computed(() => post.value.series.name),
	});

	const currIdx = computed(() => posts.paginated.value.indexOf(post.value));
	return computed(() => ({
		prev: setData(posts.paginated.value[currIdx.value + 1], frontmatter.value.prev),
		next: setData(posts.paginated.value[currIdx.value - 1], frontmatter.value.next),
	}));
};
