import { parserPath } from "./parserPath";
import { stripPath } from "./stripPath";



export const parserSlug = (path: string) => {
	path = parserPath(path).pathname;
	path = stripPath(path);
	if (!path.startsWith("posts/") || path.includes("page/")) return undefined;
	return path.split("/").reverse()[0];
};
