<script setup lang="ts">

import { useData } from "vitepress";

export interface Props {
	title?: string;
	badge?: string;
}

defineProps<Props>();
const { frontmatter } = useData();

</script>

<style scoped>

@reference "../styles/index.css";

.page-content-wrapper {
	@apply px-6 sm:px-12 vp:px-16!;
	@apply mb-24 md:mb-32;
} .page-content {
	@apply mx-auto max-w-[1152px];
} .page-title {
	@apply my-12 leading-10;
	@apply flex flex-col flex-wrap justify-center-safe items-center-safe gap-y-3;
	@apply text-[28px] md:text-[32px];
	@apply text-center font-semibold;
}

</style>

<template>
	<main class="page-content-wrapper">
		<div class="page-content">
			<h1 class="page-title">
				<Badge v-if="badge" type="tip" :text="badge" role="text"/>
				<span>{{ frontmatter.title ?? title }}</span>
			</h1>
			<slot></slot>
		</div>
	</main>
</template>
