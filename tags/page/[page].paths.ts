import { tags } from "../../.vitepress/data/tags";
import { PAGINATION } from "../../.vitepress/constants";



const totalPage = Math.ceil(tags.length / PAGINATION.TAG);

export default {
	paths: () => Array.from({ length: totalPage }).map((_, i) => ({
		params: {
			page: i + 1,
		},
	})),
}
