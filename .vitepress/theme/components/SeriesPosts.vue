<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import Postbox from "./Postbox.vue";
import Pagination from "./Pagination.vue";
import { usePosts } from "../composables/usePosts";
import { SERIES, UNSERIES, PAGINATION } from "../../constants";

const { params } = useData();

const series = computed(() => params.value?.series as string ?? UNSERIES);
const currPage = computed(() => Number(params.value?.page) || 1);

const { filtered, paginated, hasPrevious, hasNext } = usePosts({
	series: series,
	currPage: currPage,
	perPage: PAGINATION.SERIES_POST,
});

</script>



<style scoped>

@reference "../styles/index.css";

.postbox-wrapper {
	@apply my-8;
} .postbox {
	@apply flex gap-4 p-6;
	@apply rounded-2xl shadow-(--vp-shadow-2);
	@apply bg-(--vp-c-bg-soft) border-1 border-(--vp-c-bg-soft);
	@apply hover:border-(--vp-c-brand-1) transition-[border-color];
} .postbox-title {
	@apply flex-1 text-ellipsis-singleline;
} .postbox-date {
	@apply text-subtle;
}

</style>

<template>
	<Pagination
		page="Posts"
		:titleAfter="`: ${series}`"
		:description="SERIES.DESCRIPTION[series.toLowerCase()]"
		:pathname="`series/${series.toLowerCase()}`"
		:total="filtered.length"
		:perPage="PAGINATION.POST"
		:currPage="currPage"
		:hasNext="hasNext"
		:hasPrevious="hasPrevious"
	>
		<Postbox
		 	v-for="post in paginated"
			:post="post"
		/>
	</Pagination>
</template>
