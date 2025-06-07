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

export type Group = Record<string, Record<string, Record<string, GroupItem[]>>>;

const group = [...posts, ...archives].reduce<Group>((acc, cur) => {
	const isPost = "createdAt" in cur;
	const { timestamp } = isPost ? (cur.createdAt ?? {}) : { timestamp: cur.timestamp };
	if (timestamp) {
		const date = new Date(timestamp);
		const [year, month, day] = date.toISOString().split(/-|T/g);
		if (day && month && year) {
			if (!(year in acc)) acc[year] = {};
			if (!(month in acc[year]!)) acc[year]![month] = {};
			if (!(day in acc[year]![month]!)) acc[year]![month]![day] = [];
			acc[year]![month]![day]!.push({
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
}, {});

</script>



<style scoped>

@reference "../styles/index.css";

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

	@apply last-of-type:before:h-[calc(100%-12px)];
	@apply [.month~ul>li]:before:border-(--vp-c-brand-1);
	&:before {
		@apply content-[""];
		@apply absolute top-0 -left-[2.5px];
		@apply w-0 h-full;
		@apply border-l-2 border-(--vp-c-brand-soft);
	}
} .item {
	@apply relative pl-1;
	@apply flex items-center-safe gap-2;

	&:before {
		@apply block content-[""];
		@apply absolute -left-[13.5px];
		@apply w-2 h-2 bg-(--color) rounded-full;
	}

	a {
		@apply leading-8;
		@apply text-ellipsis-singleline;
		@apply hover:text-(--vp-c-brand-1);
	} .title {
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
	--color: var(--vp-c-brand-1);
} .event {
	--color: var(--vp-c-important-2);
} .notice {
	--color: var(--vp-c-warning-2);
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
			<li v-for="year in Object.keys(group).sort((a, b) => Number(b) - Number(a))">
				<h2 class="year">{{ year }}</h2>
				<ul>
					<li v-for="month in Object.keys(group[year]!).sort((a, b) => Number(b) - Number(a))">
						<h3 class="month">{{ month }}</h3>
						<ul>
							<li v-for="day in Object.keys(group[year]![month]!).sort((a, b) => Number(b) - Number(a))">
								<h4 class="day">{{ day }}</h4>
								<ul class="item-container">
									<li v-for="post in group[year]![month]![day]!.sort((a, b) => b.date!.timestamp - a.date!.timestamp)" :class="`item ${post.type}`">
										<span class="sr-only">{{ post.type }}</span>
										<component
											:is="post.url ? 'a' : 'span'" class="title"
											:href="post.url"
											tabindex="0"
											:aria-label="`${post.type}: ${post.title}`"
										>{{ post.title }}</component>
										<span class="dashed"></span>
										<time :datetime="new Date(post.date.timestamp).toISOString()">{{ post.date.string }}</time>
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
