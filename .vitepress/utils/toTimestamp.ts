import { TIME_ZONE } from "../constants";



export interface PostDate {
	timestamp: number;
	string: string;
}

export const toTimestamp = (value: string, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): PostDate | null => {
	const date = new Date(value || "");
	const timestamp = date.getTime();
	const string = date.toLocaleString(locales, {
		timeZone: TIME_ZONE,
		...options,
	});

	return isNaN(timestamp) ? null : {
		timestamp,
		string,
	};
};
