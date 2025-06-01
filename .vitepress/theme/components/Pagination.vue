<script setup lang="ts">

import { computed } from "vue";

import { BASE } from "../../constants";

export interface Props {
	page: string;
	description?: string;
	pathname?: string;
	total?: number;
	perPage?: number;
	currPage?: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

const props = defineProps<Props>();
const pathname = computed(() => props.pathname ?? "");
const total = computed(() => props.total ?? 1);
const perPage = computed(() => props.perPage ?? 0);
const currPage = computed(() => props.currPage ?? 1);

const start = computed(() => perPage.value === 0 ? 1 : perPage.value * currPage.value - perPage.value + 1);
const end = computed(() => perPage.value === 0 ? total.value : Math.min(start.value + perPage.value - 1, total.value));

</script>



<style scoped>

@reference "../styles/index.css";

.page-description {
	@apply my-8 px-2;
	@apply text-center;
} .page-info {
	@apply px-2;
	@apply text-subtle text-right;
} .no-items {
	@apply text-subtle text-center text-xl;
} .pagination-controls {
	@apply flex justify-center-safe gap-4;
	@apply pt-6 text-subtle-style;

	a, span {
		@apply px-2 py-2;
	} a {
		@apply hover:text-(--vp-c-brand-1);
	} span {
		@apply text-subtle-color;
	}
}

</style>

<template>
	<p v-if="description" class="page-description">{{ description }}</p>
	<p v-if="total !== 0" class="page-info">Showing {{ start }}~{{ end }} of {{ total }} {{ page?.toLowerCase() }}</p>
	<div>
		<slot v-if="total !== 0"></slot>
		<div v-else class="no-items" role="status" aria-live="polite">
			{{ page }} Not Found
		</div>
	</div>
	<div v-if="hasNext || hasPrevious" class="pagination-controls">
		<component
			:is="hasPrevious ? 'a' : 'span'"
			:aria-label="!hasPrevious ? undefined : 'Go to previous page'"
			:href="!hasPrevious ? undefined : currPage === 2 ? `${BASE}/${pathname}/` : `${BASE}/${pathname}/page/${currPage - 1}/`"
		>&lt; PREV</component>
		<component
			:is="hasNext ? 'a' : 'span'"
			:aria-label="!hasNext ? undefined : 'Go to next page'"
			:href="!hasNext ? undefined : `${BASE}/${pathname}/page/${currPage + 1}/`"
		>NEXT &gt;</component>
	</div>
</template>
