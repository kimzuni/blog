<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import { PAGINATION } from "../../constants";
import { useTags } from "../composables/useTags";
import Pagination from "./Pagination.vue";
import Tagbox from "./Tagbox.vue";

const { params } = useData();
const currPage = computed(() => Number(params.value?.page) || 1);

const { paginated, hasNext, hasPrevious } = useTags({
	currPage: currPage,
	perPage: PAGINATION.TAG,
});

</script>



<style scoped>

@reference "../styles/index.css";

.tagbox-container {
	@apply flex justify-center-safe items-center-safe flex-wrap;
	@apply mt-8 gap-4;

	a {
		@apply hover:text-(--vp-c-brand-1);
	}
}

</style>

<template>
	<Pagination
		page="Tags"
		pathname="tags"
		:total="paginated.length"
		:perPage="PAGINATION.TAG"
		:currPage="currPage"
		:hasNext="hasNext"
		:hasPrevious="hasPrevious"
	>
		<div class="tagbox-container">
			<Tagbox
				:tagName="tag.name"
				:number="tag.posts.length"
				v-for="tag in paginated"
			/>
		</div>
	</Pagination>
</template>
