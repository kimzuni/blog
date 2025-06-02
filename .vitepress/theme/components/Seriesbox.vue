<script setup lang="ts">

import { useData } from "vitepress";

import { BASE } from "../../constants";
import { toPathname } from "../../utils/toPathname";
import type { UseSeriesFiltered } from "../composables/useSeries";

export interface Props {
	series: UseSeriesFiltered;
	open?: boolean;
	viewMore?: boolean;
	headingTagName?: string;
}

const data = useData();
const { headingTagName="p", series, open=false, viewMore=false } = defineProps<Props>();

</script>



<style scoped>

@reference "../styles/index.css";

.seriesbox {
	@apply my-8;
} .details {
	@apply shadow-lg bg-(--vp-c-bg-soft);
	@apply border-1 border-(--vp-c-divider);
	@apply p-0;
} .details-summary {
	@apply mb-0! p-4;
	@apply hover:text-(--vp-c-brand-1) transition-[color];
} .summary-info {
	@apply px-2 text-subtle;
} .postbox {
	@apply border-t-1 border-(--vp-c-divider);
	@apply flex items-start flex-nowrap gap-1;
	@apply m-0 pl-8 pr-4 py-2.5;
	@apply no-underline text-(--vp-custom-block-details-text)! transition-[color];
	@apply hover:opacity-100 [&:hover,&.active]:text-(--vp-c-brand-1)!;

	@apply before:block [&.view-more]:before:hidden;
	@apply before:content-[attr(data-order)"."];
}
</style>

<template>
	<section class="seriesbox" :aria-labelledby="`series-${series.name}`">
		<component :is="headingTagName" :id="`series-${series.name}`" class="sr-only">Series: {{ series.name }}</component>
		<details class="details custom-block" :open="open || undefined" aria-live="polite">
			<summary class="details-summary">
				{{ series.name }}
				<span class="summary-info" aria-hidden="true">{{ series.total }} post{{ series.total === 1 ? "" : "s" }}</span>
				<span class="sr-only">contains {{ series.total }}</span>
			</summary>
			<ul class="details-content">
				<li
					v-for="item in series.items"
					:key="item.post.url"
				>
					<a
						:class="`postbox ${`${BASE}/${toPathname(data.page.value.relativePath)}/` === item.post.url ? 'active' : ''}`.trim()"
						:href="item.post.url"
						:data-order="item.order"
					>{{ item.post.title }}</a>
				</li>
				<li v-if="viewMore">
					<a class="postbox view-more" :href="`${BASE}/series/${toPathname(series.name)}/`">
						<span class="title">View more</span>
					</a>
				</li>
			</ul>
		</details>
	</section>
</template>
