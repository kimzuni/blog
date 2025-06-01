import { computed } from "vue";
import { useData } from "vitepress";

import { BASE } from "../../constants";
import { data as posts } from "../../data/posts.data";



export const useCurrentPost = () => {
	const { page } = useData();
	return computed(() => posts.find(x => `${x.url}index.md` === `${BASE}/${page.value.relativePath}`)!);
};
