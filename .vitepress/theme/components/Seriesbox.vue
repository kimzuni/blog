<script setup lang="ts">

import { BASE } from "../../constants";
import { toPathname } from "../../utils/toPathname";
import type { UseSeriesFiltered } from "../composables/useSeries";

const { series, open=false, viewMore=false } = defineProps<{
	series: UseSeriesFiltered;
	open?: boolean;
	viewMore?: boolean;
}>();

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
	@apply flex items-start flex-nowrap gap-1;
	@apply m-0 pl-8 pr-4 py-2.5;
	@apply no-underline text-(--vp-custom-block-details-text)! transition-[color];
	@apply hover:opacity-100 hover:text-(--vp-c-brand-1)!;

	@apply before:block;
	@apply before:content-[attr(data-order)"."];
}
</style>

<template>
	<article class="seriesbox">
		<details class="details custom-block" :open="open || undefined">
			<summary class="details-summary">{{ series.name }} <span class="summary-info">{{ series.total }} post{{ series.total === 1 ? "" : "s" }}</span></summary>
			<div class="details-content">
				<a class="postbox" v-for="item in series.items" :href="item.post.url" :data-order="item.order">
					{{ item.post.title }}
				</a>
				<a class="postbox" :href="`${BASE}/series/${toPathname(series.name)}/`" v-if="viewMore">
					<span class="title">View more</span>
				</a>
			</div>
		</details>
	</article>
</template>
