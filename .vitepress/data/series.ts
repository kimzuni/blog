import { parserSeries } from "../utils/parserPath";
import { posts } from "./posts";



export const series = [
	...new Set(posts.map(x => x.frontmatter.series !== false && parserSeries(x.path)!.name).flat()),
].filter(x => x !== false).map(x => x.trim());
