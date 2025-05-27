import { UNSERIES } from "../constants";
import { parserSeries } from "../utils/parserPath";
import { posts } from "./posts";



export const series = [
	...new Set(posts.map(x => parserSeries(x)?.name).flat()),
	UNSERIES,
].filter(Boolean) as string[];
