export type MetaKey = "LABEL" | "DESCRIPTION";



export const NUM_DELIMITER = "-";

export const META: Partial<Record<string, Partial<Record<MetaKey, string>>>> = {
	"bun/elysia-api": {
		LABEL: "Bun + Elysia로 API 서버 만들기",
	},
};
