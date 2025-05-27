export const stripHTML = (string?: string | null) => string
	?.replace(/\<\/?[^>]+(>|$)/g, "")
	?.replace(/\&ZeroWidthSpace\;/g, "")
	?.trim()
;
