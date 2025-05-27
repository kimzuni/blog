import { posts } from "../../.vitepress/data/posts";
import { PAGINATION } from "../../.vitepress/constants";



const totalPage = Math.ceil(posts.length / PAGINATION.PER);

export default {
	paths: () => Array.from({ length: totalPage }).map((_, i) => ({
		params: {
			page: i + 1,
		},
	})),
}
