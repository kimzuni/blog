import { UNSERIES } from "../constants";
import { parserSeries } from "../utils/parserPath";
import { posts } from "./posts";



export const series = [
	...new Set(posts.map(x => parserSeries(x.path, x.frontmatter)!.name).flat()),
].filter(x => UNSERIES.INCLUDE || x !== UNSERIES.LABEL).map(x => x.trim());
