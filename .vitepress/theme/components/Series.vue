<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import Page from "./Page.vue";
import Pagination from "./Pagination.vue";
import Seriesbox from "./Seriesbox.vue";
import { PAGINATION, LIMIT } from "../../constants";
import { useSeries } from "../composables/useSeries";

const { params } = useData();

const currPage = computed(() => Number(params.value?.page) || 1);

const { filtered, paginated, hasPrevious, hasNext } = useSeries({
	currPage: currPage,
	perPage: PAGINATION.SERIES,
	perSeries: LIMIT.SERIES_POST,
});

</script>



<template>
	<Page>
		<Pagination
			page="Series"
			pathname="series"
			:total="filtered.length"
			:perPage="PAGINATION.SERIES"
			:currPage="currPage"
			:hasNext="hasNext"
			:hasPrevious="hasPrevious"
		>
			<Seriesbox
				v-for="series in paginated"
				:key="series.name"
				:series="series"
				:open="false"
				:viewMore="LIMIT.SERIES_POST < series.total"
				headingTagName="h2"
			/>
		</Pagination>
	</Page>
</template>
