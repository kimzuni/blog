import { PAGINATION } from "../../../.vitepress/constants";
import { parserSeries } from "../../../.vitepress/utils/parserPath";
import { checkSeries } from "../../../.vitepress/utils/series";

import { posts } from "../../../.vitepress/data/posts";
import { series } from "../../../.vitepress/data/series";



const paths = () => series.map(name => {
	const count = posts.filter(x => checkSeries(name, parserSeries(x.path)?.name)).length;
	return Array.from({ length: Math.ceil(count/PAGINATION.SERIES_POST) }).map((_, i) => ({
		params: {
			page: i + 1,
			series: name,
		},
	}))
}).flat().filter(x => x.params.page !== 0);

export default {
	paths: paths,
}
