import { UNSERIES } from "../constants";
import { toPathname } from "../utils/toPathname";



export const checkSeries = (series: string = UNSERIES.LABEL, postSeries: string = UNSERIES.LABEL, recursive: boolean = false) => {
	series = toPathname(series);
	postSeries = toPathname(postSeries);
	return series === postSeries || (recursive && postSeries.startsWith(`${series}/`) ? true : false);
};
