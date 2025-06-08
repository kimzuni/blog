import type { AddUserItem } from "./theme/components/Archives.vue";



const archives: AddUserItem[] = [
	{
		type: "event",
		title: "Jekyll 기반 블로그 개설",
		timestamp: new Date("2023-01-25").getTime(),
	},
	{
		type: "event",
		title: "블로그 시스템 개편 (Jekyll -> VitePress)",
		timestamp: new Date("2025-06-03").getTime(),
	},
];

export default archives;
