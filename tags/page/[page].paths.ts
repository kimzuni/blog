import { PAGINATION } from "../../.vitepress/constants";
import { tags } from "../../.vitepress/data/tags";



const totalPage = Math.ceil(tags.length / PAGINATION.TAG);

export default {
	paths: () => Array.from({ length: totalPage || 1 }).map((_, i) => ({
		params: {
			page: i + 1,
		},
	})),
}
