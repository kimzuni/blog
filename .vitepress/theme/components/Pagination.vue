<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import { BASE } from "../../constants";

const { frontmatter } = useData();

const props = defineProps({
	page: String,
	titleBefore: String,
	titleAfter: String,
	description: String,
	pathname: {
		type: String,
		default: "",
	},
	total: {
		type: Number,
		default: 1,
	},
	perPage: {
		type: Number,
		default: 0,
	},
	currPage: {
		type: Number,
		default: 1,
	},
	hasNext: Boolean,
	hasPrevious: Boolean,
});

const start = computed(() => props.perPage === 0 ? 1 : props.perPage * props.currPage - props.perPage + 1);
const end = computed(() => props.perPage === 0 ? props.total : Math.min(start.value + props.perPage - 1, props.total));

</script>



<style scoped>

@reference "../styles/index.css";

.page-content {
	@apply px-6 sm:px-12 vp:px-16!;
	@apply mb-24 md:mb-32;
	@apply mx-auto max-w-[1152px];
} .page-title {
	@apply my-12;
	@apply text-[28px] md:text-[32px];
	@apply text-center font-semibold;
} .page-description {
	@apply my-8 px-2;
	@apply text-center;
} .page-info {
	@apply px-2;
	@apply text-subtle text-right;
} .pagination-controls {
	@apply flex justify-center-safe gap-4;
	@apply pt-6 text-subtle-style;

	a {
		@apply px-2 py-2;
		@apply hover:text-(--vp-c-brand-1);

		&[tabindex="-1"] {
			@apply text-subtle-color;
			@apply pointer-events-none;
		}
	}
}

</style>

<template>
	<div class="page-content">
		<h1 class="page-title">{{ titleBefore }}{{ frontmatter.title ?? `List of ${page}`}}{{ titleAfter }}</h1>
		<p v-if="description" class="page-description">{{ description }}</p>
		<p class="page-info">{{ `${start}~${end}` }} of {{ total }} {{ page?.toLowerCase() }}</p>
		<main>
			<slot></slot>
		</main>
		<div v-if="hasNext || hasPrevious" class="pagination-controls">
			<a
				:aria-disabled="!hasPrevious || undefined"
				:tabindex="hasPrevious ? undefined : -1"
				:href="!hasPrevious ? undefined : currPage === 2 ? `${BASE}/${pathname}/` : `${BASE}/${pathname}/page/${currPage - 1}/`"
			>&lt; PREV</a>
			<a
				:aria-disabled="!hasNext || undefined"
				:tabindex="hasNext ? undefined : -1"
				:href="!hasNext ? undefined : `${BASE}/${pathname}/page/${currPage + 1}/`"
			>NEXT &gt;</a>
		</div>
	</div>
</template>
