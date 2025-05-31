<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import Postboxes from "./Postboxes.vue";
import Pagination from "./Pagination.vue";
import { usePosts } from "../composables/usePosts";
import { PAGINATION } from "../../constants";

const { params } = useData();

const currPage = computed(() => Number(params.value?.page) || 1);

const { filtered, paginated, hasPrevious, hasNext } = usePosts({
	currPage: currPage,
	perPage: PAGINATION.POST,
});

const sorted = computed(() => paginated.value.toSorted((a, b) => a.pin && !b.pin ? -1 : !a.pin && b.pin ? 1 : 0));
const unpublished = computed(() => sorted.value.filter(x => !x.createdAt));
const published = computed(() => sorted.value.filter(x => x.createdAt));

</script>



<template>
	<Pagination
		page="Posts"
		pathname="posts"
		:total="filtered.length"
		:perPage="PAGINATION.POST"
		:currPage="currPage"
		:hasNext="hasNext"
		:hasPrevious="hasPrevious"
	>
		<Postboxes
			:posts="[...unpublished, ...published]"
			:grid="true"
		/>
	</Pagination>
</template>
