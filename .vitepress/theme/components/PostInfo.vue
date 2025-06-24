<script setup lang="ts">

import { computed } from "vue";

import { UNSERIES } from "../../constants";
import { useCurrentPost } from "../composables/useCurrentPost";
import { useSeries } from "../composables/useSeries";
import Seriesbox from "../components/Seriesbox.vue";

const post = useCurrentPost();
const seriesSlug = computed(() => post.value.series.slug);

const { paginated } = useSeries({
	seriesSlug: seriesSlug,
	currPage: computed(() => 1),
	sort: "oldest",
});

const tsToString = (timestamp?: number) => new Date(timestamp || 0).toISOString();
const dsToOnAt = (datestring?: string) => !datestring ? "Not yet published" : `on ${datestring.split(", ").join(" at ")}`;

</script>



<style scoped>

@reference "../styles/index.css";

.post-title, .post-date {
	@apply mb-8;
} .post-title {
	@apply text-center font-semibold;
	@apply leading-10 -tracking-[0.02em];
	@apply text-[28px] md:text-[32px];
} .post-date {
	@apply text-subtle text-right;
	
	p {
		@apply flex justify-end-safe gap-1;
		@apply [&>span]:flex-1;
	}
}

</style>

<template>
	<div class="post-info">
		<h1 class="post-title">{{ post.title }}</h1>
		<div class="post-date">
			<p>
				<span v-if="post.createdAt">Posted</span>
				<time :datetime="tsToString(post.createdAt?.timestamp)">
					{{ dsToOnAt(post.createdAt?.string) }}
				</time>
			</p>
			<p v-if="post.updatedAt">
				<span>Last updated</span>
				<time :datetime="tsToString(post.updatedAt.timestamp)">
					{{ dsToOnAt(post.updatedAt.string) }}
				</time>
			</p>
		</div>
	</div>
	<div v-if="seriesSlug !== UNSERIES.SLUG" class="seriesbox-container">
		<Seriesbox
			v-for="series in paginated"
			:key="series.slug"
			:series="series"
		/>
	</div>
</template>
