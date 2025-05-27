export const isInSeries = (series?: string, postSeries?: string) => {
	return series && postSeries && (series === postSeries || postSeries.startsWith(`${series}/`)) ? true : false;
};
