import { BASE } from "../constants";



export const stripPath = (path: string) => {
	if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
	if (path.startsWith("/")) path = path.slice(1);
	if (path.endsWith(".md")) path = path.slice(0, -3);
	if (path.endsWith(".html")) path = path.slice(0, -5);
	if (path.endsWith("index")) path = path.slice(0, -5);
	if (path.endsWith("/")) path = path.slice(0, -1);
	return path;
};
