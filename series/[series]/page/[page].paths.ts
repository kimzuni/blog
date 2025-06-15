import { PAGINATION } from "../../../.vitepress/constants";
import { checkSeries } from "../../../.vitepress/utils/series";

import { posts } from "../../../.vitepress/data/posts";
import { series } from "../../../.vitepress/data/series";



const paths = () => series.map(slug => {
	const count = posts.filter(x => checkSeries(slug, x.series.slug)).length;
	return Array.from({ length: Math.ceil(count/PAGINATION.SERIES_POST) }).map((_, i) => ({
		params: {
			page: i + 1,
			series: slug,
		},
	}))
}).flat().filter(x => x.params.page !== 0);

export default {
	paths: paths,
}
