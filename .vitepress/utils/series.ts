import { UNSERIES } from "../constants";



export const isInSeries = (series: string = UNSERIES, postSeries: string = UNSERIES) => {
	series = series.toLowerCase();
	postSeries = postSeries.toLowerCase();
	return series === postSeries || postSeries.startsWith(`${series}/`) ? true : false;
};
