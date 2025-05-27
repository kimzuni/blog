<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import Postbox from "./Postbox.vue";
import Pagination from "./Pagination.vue";
import { usePosts } from "../composables/usePosts";
import { PAGINATION } from "../../constants";

const { params } = useData();

const currPage = computed(() => Number(params.value?.page) || 1);

const { filtered, paginated, hasPrevious, hasNext } = usePosts({
	currPage: currPage,
	perPage: PAGINATION.POST,
});

const unpublished = computed(() => [...paginated.value].filter(x => !x.createdAt));
const published = computed(() => [...paginated.value].filter(x => x.createdAt).sort((a, b) => a.pin && !b.pin ? -1 : !a.pin && b.pin ? 1 : 0));

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
		<Postbox
		 	v-for="post in [...unpublished, ...published]"
			:post="post"
		/>
	</Pagination>
</template>
