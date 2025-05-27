import { parserSeries } from "../utils/parserPath";
import { posts } from "./posts";



export const series = [
	...new Set(posts.map(x => parserSeries(x)!.name).flat()),
].filter(Boolean) as string[];
