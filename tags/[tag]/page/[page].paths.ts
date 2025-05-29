import { PAGINATION } from "../../../.vitepress/constants";

import { posts } from "../../../.vitepress/data/posts";
import { tags } from "../../../.vitepress/data/tags";



const paths = () => tags.map(name => {
	const count = posts.filter(x => x.frontmatter.tags?.includes(name)).length;
	return Array.from({ length: Math.ceil(count/PAGINATION.TAG_POST) }).map((_, i) => ({
		params: {
			page: i + 1,
			tag: name,
		},
	}))
}).flat().filter(x => x.params.page !== 0);

export default {
	paths: paths,
}
