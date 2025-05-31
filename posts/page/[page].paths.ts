import { posts } from "../../.vitepress/data/posts";
import { PAGINATION } from "../../.vitepress/constants";



const totalPage = Math.ceil(posts.length / PAGINATION.POST);

export default {
	paths: () => Array.from({ length: totalPage || 1 }).map((_, i) => ({
		params: {
			page: i + 1,
		},
	})),
}
