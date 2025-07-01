export type MetaKey = "LABEL" | "DESCRIPTION";



export const NUM_DELIMITER = "-";

export const META: Partial<Record<string, Partial<Record<MetaKey, string>>>> = {
	"baekjoon/step-1": {
		LABEL: "baekjoon/입출력과 사칙연산",
	},
	"baekjoon/step-2": {
		LABEL: "baekjoon/조건문",
	},
	"baekjoon/step-3": {
		LABEL: "baekjoon/반복문",
	},
	"baekjoon/step-4": {
		LABEL: "baekjoon/1차원 배열",
	},
	"baekjoon/step-5": {
		LABEL: "baekjoon/문자열",
	},
	"baekjoon/step-6": {
		LABEL: "baekjoon/심화 1",
	},
	"bun/elysia-api": {
		LABEL: "Bun + Elysia로 API 서버 만들기",
	},
};
