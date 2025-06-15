import { UNSERIES } from "../constants";
import { toPathname } from "../utils/toPathname";



export const checkSeries = (slug: string = UNSERIES.SLUG, postSeriesSlug: string = UNSERIES.SLUG, recursive: boolean = false) => {
	slug = toPathname(slug);
	postSeriesSlug = toPathname(postSeriesSlug);
	return slug === postSeriesSlug || (recursive && postSeriesSlug.startsWith(`${slug}/`) ? true : false);
};
