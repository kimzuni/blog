<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import { BASE } from "../../constants";

const { frontmatter } = useData();

const props = defineProps({
	page: String,
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

const pageLower = computed(() => props.page?.toLowerCase());
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
		<h1 class="page-title">{{ frontmatter.title ?? `List of ${page}`}}</h1>
		<p class="page-info">{{ `${start}~${end}` }} of {{ total }} {{ pageLower }}</p>
		<main>
			<slot></slot>
		</main>
		<div class="pagination-controls">
			<a
				:aria-disabled="!hasPrevious || undefined"
				:tabindex="hasPrevious ? undefined : -1"
				:href="!hasPrevious ? undefined : currPage === 2 ? `${BASE}/${pageLower}/` : `${BASE}/${pageLower}/page/${currPage - 1}`"
			>&lt; PREV</a>
			<a
				:aria-disabled="!hasNext || undefined"
				:tabindex="hasNext ? undefined : -1"
				:href="!hasNext ? undefined : `${BASE}/${pageLower}/page/${currPage + 1}`"
			>NEXT &gt;</a>
		</div>
	</div>
</template>
