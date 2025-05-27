<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import Pagination from "./Pagination.vue";
import { useSeries } from "../composables/useSeries";
import { PAGINATION } from "../../constants";

const { params } = useData();

const currPage = computed(() => Number(params.value?.page) || 1);

const { filtered, paginated, hasPrevious, hasNext } = useSeries({
	currPage: currPage,
	perPage: PAGINATION.SERIES,
	perSeries: PAGINATION.SERIES_PREVIEW,
});

</script>



<style scoped>

@reference "../styles/index.css";

.seriesbox {
	@apply my-8;
} .details {
	@apply shadow-lg bg-(--vp-c-bg-soft);
	@apply border-1 border-(--vp-c-divider);
	@apply px-0 pb-0;
} .details-summary {
	@apply px-4 pb-2;
} .summary-info {
	@apply px-2 text-subtle;
} .postbox {
	@apply border-t-1 border-(--vp-c-divider);
	@apply flex items-center flex-nowrap gap-1;
	@apply m-0 pl-8 pr-4 py-2.5;
	@apply no-underline;

	.title {
		@apply flex-1 break-all;
	}
}

</style>

<template>
	<Pagination
		page="Series"
		pathname="series"
		:total="filtered.length"
		:perPage="PAGINATION.POST"
		:currPage="currPage"
		:hasNext="hasNext"
		:hasPrevious="hasPrevious"
	>
		<article class="seriesbox" v-for="{ name, items } of paginated">
			<details class="details custom-block">
				<summary class="details-summary">{{ name }} <span class="summary-info">{{ items.length }} post{{ items.length === 1 ? "" : "s" }}</span></summary>
				<div class="details-content">
					<a class="postbox" v-for="item in items" :href="item.post.url">
						<span class="order">{{ item.order }}.</span>
						<span class="title">{{ item.post.title }}</span>
					</a>
				</div>
			</details>
		</article>
	</Pagination>
</template>
