import { SITE } from "../constants";



export interface ToTimestampOptions {
	lang?: string
}

export interface PostDate {
	timestamp: number;
	string: string;
}

export const toTimestamp = (value: string, options?: ToTimestampOptions): PostDate | null => {
	const date = new Date(value || "");
	const timestamp = date.getTime();
	const string = date.toLocaleString(options?.lang ?? SITE.LANG);

	return isNaN(timestamp) ? null : {
		timestamp,
		string,
	};
};
