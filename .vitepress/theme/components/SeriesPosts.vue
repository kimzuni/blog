<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import Page from "./Page.vue";
import Pagination from "./Pagination.vue";
import Postboxes from "./Postboxes.vue";
import { useSeries } from "../composables/useSeries";
import { SERIES, PAGINATION } from "../../constants";

const { params } = useData();

const seriesSlug = computed(() => params.value?.series as string);
const currPage = computed(() => Number(params.value?.page) || 1);

const { filtered, paginated, hasPrevious, hasNext } = useSeries({
	currPage: currPage,
	seriesSlug: seriesSlug,
	perPage: PAGINATION.SERIES_POST,
});

const data = computed(() => paginated.value.find(x => x.slug === seriesSlug.value)!);

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
	<Page :badge="data.label">
		<Pagination
			page="Posts"
			:description="SERIES.META[data.slug]?.DESCRIPTION"
			:pathname="`series/${seriesSlug}`"
			:total="filtered[0]!.items.length"
			:perPage="PAGINATION.SERIES_POST"
			:currPage="currPage"
			:hasNext="hasNext"
			:hasPrevious="hasPrevious"
		>
			<Postboxes
				:posts="paginated[0]!.items.map(x => x.post)"
				:grid="true"
			/>
		</Pagination>
	</Page>
</template>
