<script setup lang="ts">

import { archives } from "../../constants";
import Page from "./Page.vue";
import { data as posts } from "../../data/posts.data";
import type { PostDate } from "../../utils/toTimestamp";

export interface GroupItem {
	type: "post" | "event" | "notice";
	url?: string;
	title: string;
	date: PostDate;
}

export interface AddUserItem extends Omit<GroupItem, "date"> {
	timestamp: number;
};

export type Group = Array<[number, Array<[number, Array<[number, Array<GroupItem>]>]>]>;
const group = [...posts, ...archives].reduce<Group>((acc, cur) => {
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
				type: isPost ? "post" : "event",
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
	});

const onlyItems = group.map(x => x[1].map(x => x[1].map(x => x[1]))).flat().flat().flat();

</script>



<style scoped>

@reference "../styles/index.css";

.container, .colors {
	--post: var(--vp-c-brand-1);
	--event: var(--vp-c-important-2);
	--notice: var(--vp-c-warning-2);
}

.container {
	@apply flex flex-col gap-4;
} .year {
	@apply text-2xl font-bold;
} .month {
	@apply text-xl font-semibold;
} .day {
	@apply hidden;
} ul:not(.container,.item-container) > li {
	@apply ml-2 pl-2;
	@apply relative;
} .line {
	@apply [&.short]:before:h-[calc(100%-8px)];
	@apply last-of-type:before:rounded-b-full;
	&:before {
		@apply content-[""];
		@apply absolute bottom-3 -left-[2.5px];
		@apply bg-(--vp-c-brand-soft);
		@apply w-0.5 h-full;
	} .item:before {
		@apply -left-[10.5px];
		@apply bg-(--color);
		@apply bg-linear-to-t from-(--color) to-(--to);
	} .item.short:before {
		@apply to-(--color);
	}
} .item {
	@apply relative pl-1;
	@apply flex items-center-safe gap-2;

	&:after {
		@apply block content-[""];
		@apply absolute -left-[13.5px];
		@apply w-2 h-2 bg-(--color) rounded-full;
	}

	a.title {
		@apply hover:text-(--vp-c-brand-1);
	} .title {
		@apply leading-8;
		@apply text-ellipsis-singleline;
		@apply font-semibold;
	} .dashed {
		@apply flex-1;
		@apply border-t-1 border-dashed border-(--vp-c-divider);
	} time {
		@apply text-nowrap text-(--vp-c-text-3);
	}
} .colors {
	@apply flex flex-wrap gap-2;
	@apply text-sm font-bold;
	@apply my-4 [&_*]:text-(--color);
} .post {
	--color: var(--post);
} .event {
	--color: var(--event);
} .notice {
	--color: var(--notice);
}

</style>

<template>
	<Page>
		<div class="colors">
			<span class="post">POST</span>
			<span class="event">EVENT</span>
			<span class="notice">NOTICE</span>
		</div>
		<ul class="container">
			<li v-for="[year, yearItems] of group">
				<h2 class="year">{{ year }}</h2>
				<ul>
					<li v-for="[month, monthItems], monthItemIdx in yearItems" :class="`line ${monthItemIdx ? '' : 'short'}`.trim()">
						<h3 class="month">{{ `0${month}`.slice(-2) }}</h3>
						<ul>
							<li v-for="[day, dayItems], dayItemIdx in monthItems">
								<h4 class="day">{{ day }}</h4>
								<ul class="item-container">
									<li
										v-for="item, itemIdx in dayItems"
										:class="`
											item line ${item.type}
											${dayItemIdx || itemIdx ? '' : 'short'}
										`.replace(/\s+/g, ' ').trim()"
										:style="`--to: var(--${onlyItems[onlyItems.indexOf(item)-1]?.type})`"
									>
										<span class="sr-only">{{ item.type }}</span>
										<component
											:is="item.url ? 'a' : 'span'" class="title"
											:href="item.url"
											tabindex="0"
											:aria-label="`${item.type}: ${item.title}`"
										>{{ item.title }}</component>
										<span class="dashed"></span>
										<time :datetime="new Date(item.date.timestamp).toISOString()">{{ item.date.string }}</time>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</Page>
</template>
