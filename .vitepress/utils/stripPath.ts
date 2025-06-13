import { BASE } from "../constants";



interface StripPathOptions {
	keepExt?: boolean;
	keepIndex?: boolean;
}

export const stripPath = (path: string, {
	keepExt=false,
	keepIndex=false,
}: StripPathOptions = {}) => {
	if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
	if (path.startsWith("/")) path = path.slice(1);
	if (!keepExt) {
		if (path.endsWith(".md")) path = path.slice(0, -3);
		if (path.endsWith(".html")) path = path.slice(0, -5);
	}
	if (!keepIndex) {
		if (path.endsWith("index")) path = path.slice(0, -5);
	}
	if (path.endsWith("/")) path = path.slice(0, -1);
	return path;
};
