import { series } from "../../.vitepress/data/series";
import { PAGINATION } from "../../.vitepress/constants";



const totalPage = Math.ceil(series.length / PAGINATION.SERIES);

export default {
	paths: () => Array.from({ length: totalPage }).map((_, i) => ({
		params: {
			page: i + 1,
		},
	})),
}
