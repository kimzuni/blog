export interface PostDate {
	timestamp: number;
	string: string;
}

export const toTimestamp = (value: string, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): PostDate | null => {
	const date = new Date(value || "");
	const timestamp = date.getTime();
	const string = date.toLocaleString(locales, options);

	return isNaN(timestamp) ? null : {
		timestamp,
		string,
	};
};
