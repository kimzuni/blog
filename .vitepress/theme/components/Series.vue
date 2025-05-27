<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import Pagination from "./Pagination.vue";
import { BASE } from "../../constants";
import { toPathname } from "../../utils/toPathname";
import { useSeries } from "../composables/useSeries";
import { PAGINATION, LIMIT } from "../../constants";

const { params } = useData();

const currPage = computed(() => Number(params.value?.page) || 1);

const { filtered, paginated, hasPrevious, hasNext } = useSeries({
	currPage: currPage,
	perPage: PAGINATION.SERIES,
	perSeries: LIMIT.SERIES_POST,
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
	@apply no-underline text-(--vp-custom-block-details-text)! transition-[color];
	@apply hover:opacity-100 hover:text-(--vp-c-brand-1)!;

	.title {
		@apply flex-1;
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
		<article class="seriesbox" v-for="{ name, total, items } of paginated">
			<details class="details custom-block" open>
				<summary class="details-summary">{{ name }} <span class="summary-info">{{ total }} post{{ total === 1 ? "" : "s" }}</span></summary>
				<div class="details-content">
					<a class="postbox" v-for="item in items" :href="item.post.url">
						<span class="order">{{ item.order }}.</span>
						<span class="title">{{ item.post.title }}</span>
					</a>
					<a class="postbox" :href="`${BASE}/series/${toPathname(name)}`" v-if="LIMIT.SERIES_POST < total">
						<span class="title">View more</span>
					</a>
				</div>
			</details>
		</article>
	</Pagination>
</template>
