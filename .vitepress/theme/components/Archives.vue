<script setup lang="ts">

import Page from "./Page.vue";
import { data as posts, type Post } from "../../data/posts.data";

type Group = Record<string, Record<string, Record<string, Array<{
	url: Post["url"];
	title: Post["title"];
	date: Exclude<Post["createdAt"], null>;
}>>>>;

const group = posts.reduce<Group>((acc, cur) => {
	const { timestamp } = cur.createdAt ?? {};
	if (timestamp) {
		const date = new Date(timestamp);
		const [year, month, day] = date.toISOString().split(/-|T/g);
		if (day && month && year) {
			if (!(year in acc)) acc[year] = {};
			if (!(month in acc[year]!)) acc[year]![month] = {};
			if (!(day in acc[year]![month]!)) acc[year]![month]![day] = [];
			acc[year]![month]![day]!.push({
				url: cur.url,
				title: cur.title,
				date: cur.createdAt!,
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

	& ~ ul {
		@apply ml-2 pl-2;
		@apply border-l-2 border-(--vp-c-brand-soft);
	}
} .month {
	@apply text-xl font-semibold;

	& ~ ul {
		@apply ml-2 pl-2;
		@apply border-l-2 border-(--vp-c-brand-1);
	}
} .day {
	@apply hidden;
} .item {
	@apply relative;
	@apply flex items-center-safe gap-2;

	&:before {
		@apply block content-[""];
		@apply absolute -left-3;
		@apply w-2 h-2 bg-(--vp-c-brand-1) rounded-full;
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
} .year-line-hidden, .month-line-hidden {
	@apply relative;

	&:before {
		@apply block content-[""];
		@apply absolute bottom-0 z-1;
		@apply w-0 h-3;
		@apply border-l-4 border-(--vp-c-bg);
	} &.year-line-hidden:before {
		@apply left-1.75;
	} &.month-line-hidden:before {
		@apply left-3.75;
	}
}

</style>

<template>
	<Page>
		<ul class="container">
			<li class="year-line-hidden" v-for="year in Object.keys(group).sort((a, b) => Number(b) - Number(a))">
				<p class="year">{{ year }}</p>
				<ul class="month-line-hidden" v-for="month in Object.keys(group[year]!).sort((a, b) => Number(b) - Number(a))">
					<li>
						<p class="month">{{ month }}</p>
						<ul v-for="day in Object.keys(group[year]![month]!).sort((a, b) => Number(b) - Number(a))">
							<li>
								<p class="day">{{ day }}</p>
								<ul v-for="post in group[year]![month]![day]!.sort((a, b) => b.date!.timestamp - a.date!.timestamp)">
									<li class="item">
										<a class="title" :href="post.url">{{ post.title }}</a>
										<span class="dashed"></span>
										<time :datetime="new Date(post.date.timestamp).toISOString()">{{ post.date.string.split(",")[0] }}</time>
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
