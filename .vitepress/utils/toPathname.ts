import { stripPath } from "./stripPath";



export const toPathname = (path: string) => stripPath(path.toLowerCase().replace(/_| /g, "-"));
