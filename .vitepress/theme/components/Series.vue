<script setup lang="ts">

import { watchEffect } from "vue";
import { useData } from "vitepress";

import Pagination from "./Pagination.vue";
import { useSeries } from "../composables/useSeries";
import { PAGINATION } from "../../constants";

const { params } = useData();

const { filtered, paginated, hasPrevious, hasNext, currPage, setPage } = useSeries({
	perPage: PAGINATION.SERIES_PREVIEW,
	perSeries: PAGINATION.SERIES,
});

watchEffect(() => {
	setPage(Number(params.value?.page));
});

</script>



<style scoped>

@reference "../styles/index.css";

.seriesbox {
	@apply my-8;
} .details {
	@apply shadow-lg;
	@apply border-1 border-(--vp-c-border);
	@apply px-0 pb-0;
} .details-summary {
	@apply px-4 pb-2;
} .summary-info {
	@apply px-2 text-subtle;
} .postbox {
	@apply border-t-1 border-(--vp-c-border);
	@apply m-0 px-8 py-2.5;

	a {
		@apply no-underline;
	}
}

</style>

<template>
	<Pagination
		page="Series"
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
					<p class="postbox" v-for="item in items">
						<a :href="item.post.url">{{ item.order }}. {{ item.post.title }}</a>
					</p>
				</div>
			</details>
		</article>
	</Pagination>
</template>
