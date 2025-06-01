<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import Page from "./Page.vue";
import Pagination from "./Pagination.vue";
import Tagboxes from "./Tagboxes.vue";
import { PAGINATION } from "../../constants";
import { useTags } from "../composables/useTags";

const { params } = useData();
const currPage = computed(() => Number(params.value?.page) || 1);

const { paginated, hasNext, hasPrevious } = useTags({
	currPage: currPage,
	perPage: PAGINATION.TAG,
});

</script>



<template>
	<Page>
		<Pagination
			page="Tags"
			pathname="tags"
			:total="paginated.length"
			:perPage="PAGINATION.TAG"
			:currPage="currPage"
			:hasNext="hasNext"
			:hasPrevious="hasPrevious"
		>
			<Tagboxes
				:items="paginated.map(x => ({
					tagName: x.name,
					number: x.total,
				}))"
			/>
		</Pagination>
	</Page>
</template>
