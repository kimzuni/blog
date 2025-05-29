import { UNSERIES } from "../constants";



export const checkSeries = (series: string = UNSERIES, postSeries: string = UNSERIES, recursive: boolean = false) => {
	series = series.toLowerCase();
	postSeries = postSeries.toLowerCase();
	return series === postSeries || (recursive && postSeries.startsWith(`${series}/`) ? true : false);
};
