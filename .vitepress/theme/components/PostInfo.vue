<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import { BASE, UNSERIES } from "../../constants";
import { data as postsData } from "../../data/posts.data";
import { useSeries } from "../composables/useSeries";
import Seriesbox from "../components/Seriesbox.vue";

const { page } = useData();

const post = computed(() => postsData.find(x => `${x.url}index.md` === `${BASE}/${page.value.relativePath}`)!);
const seriesName = computed(() => post.value.series.name)

const { paginated } = useSeries({
	seriesName: seriesName,
	currPage: computed(() => 1),
	sort: "oldest",
});

</script>



<style scoped>

@reference "../styles/index.css";

.post-title {
	@apply mb-8;
	@apply text-center font-semibold;
	@apply leading-10 -tracking-[0.02em];
	@apply text-[28px] md:text-[32px];
} .post-date {
	@apply grid grid-cols-[1fr_auto] gap-x-1;
	@apply mb-8 text-right text-subtle;
}

</style>

<template>
	<div class="post-info">
		<h1 class="post-title">{{ post.title }}</h1>
		<dl class="post-date">
			<dt :class="post.updatedAt ? '' : 'sr-only'">Published</dt>
			<dd>
				<time :datetime="new Date(post.createdAt?.timestamp || 0).toISOString()">
					{{ post.createdAt?.string ?? "Unpublished" }}
				</time>
			</dd>
			<template v-if="post.updatedAt">
				<dt>Last Modified</dt>
				<dd>
					<time :datetime="new Date(post.updatedAt.timestamp || 0).toISOString()">
						{{ post.updatedAt.string }}
					</time>
				</dd>
			</template>
		</dl>
	</div>
	<div v-if="seriesName !== UNSERIES.LABEL">
		<Seriesbox
			v-for="series in paginated"
			:key="series.name"
			:series="series"
		/>
	</div>
</template>
