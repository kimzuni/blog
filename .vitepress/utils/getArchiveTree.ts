import { archives } from "../constants";
import type { Post } from "../data/posts.data";
import type { PostDate } from "../utils/toTimestamp";



export type ArchivesItemType = "post" | "event" | "notice";

export interface AddItem<T extends ArchivesItemType = ArchivesItemType> {
	type: T;
	url?: string;
	title: string;
	timestamp: number;
}

export interface TreeItem {
	type: "post" | "event" | "notice";
	url?: string;
	title: string;
	date: PostDate;
};

export type Tree = Array<[number, Array<[number, Array<[number, TreeItem[]]>]>]>;

export type RequiredKeys = {
	url?: string;
	title: string;
} & (
	| { createdAt: PostDate }
	| { timestamp: number }
);



interface UseArchivesProps {
	posts: Array<Post | AddItem<"post">>;
	addItems?: {
		posts?: Array<AddItem<"post">>;
		events?: Array<AddItem<"event">>;
		notices?: Array<AddItem<"notice">>;
	},
}

const defaultPosts = archives.filter((x): x is AddItem<"post"> => { return x.type === "post" });
const defaultEvents = archives.filter((x): x is AddItem<"event"> => { return x.type === "event" });
const defaultNotices = archives.filter((x): x is AddItem<"notice"> => { return x.type === "notice" });

export const getArchiveTree = ({
	posts,
	addItems: {
		posts: addPosts = defaultPosts,
		events=defaultEvents,
		notices=defaultNotices,
	} = {},
}: UseArchivesProps) => {
	const all = [...posts, ...addPosts, ...events, ...notices];

	const tree = all.reduce<Tree>((acc, cur) => {
		const isPost = "createdAt" in cur;
		const { timestamp } = isPost ? (cur.createdAt ?? {}) : { timestamp: cur.timestamp };
		if (timestamp) {
			const date = new Date(timestamp);
			const [year, month, day] = date.toISOString().split(/-|T/g).map(x => parseInt(x));
			if (day && month && year) {
				if (!acc[year]) acc[year] = [year, []];
				if (!acc[year][1][month]) acc[year][1][month] = [month, []];
				if (!acc[year][1][month][1][day]) acc[year][1][month][1][day] = [day, []];
				acc[year][1][month][1][day][1].push({
					type: isPost ? "post" : cur.type,
					url: cur.url,
					title: cur.title,
					date: {
						string: new Date(timestamp).toLocaleDateString(),
						timestamp,
					},
				});
			}
		}
		return acc;
	}, [])
		.filter(Boolean).toReversed()
		.map(([year, yearItems]) => {
			const items = yearItems.filter(Boolean).toReversed().map(([month, monthItems]) => {
				const items = monthItems.filter(Boolean).toReversed().map(([day, dayItems]) => {
					const items = dayItems.toSorted((a, b) => b.date!.timestamp - a.date!.timestamp);
					return [day, items] as const;
				});
				return [month, items] as const;
			});
			return [year, items] as const;
		}) as Tree;

	const items = tree.map(x => x[1].map(x => x[1].map(x => x[1]))).flat().flat().flat();

	return [tree, items] as const;
};
