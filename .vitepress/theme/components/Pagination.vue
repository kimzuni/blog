<script setup lang="ts">

import { watchEffect } from "vue";
import { useData } from "vitepress";
import { Pin } from "lucide-vue-next";

import { usePosts } from "../composables/usePosts";
import { BASE, PAGINATION } from "../../constants";

const { params } = useData();

const { totalPages, currPage, paginated, hasPrevious, hasNext, setPage } = usePosts({
	perPage: PAGINATION.PER,
});

watchEffect(() => {
	setPage(Number(params.value?.page));
});

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
} .postbox-wrapper {
	@apply my-8;
} .postbox {
	@apply @container/postbox;
	@apply flex flex-col gap-4 p-6;
	@apply rounded-2xl shadow-(--vp-shadow-2);
	@apply bg-(--vp-c-bg-soft) border-1 border-(--vp-c-bg-soft);
	@apply hover:border-theme-primary transition-[border-color];
} .postbox-thumbnail {
	@apply relative bg-(--vp-c-default-soft);
	@apply w-full aspect-[3/2];
	@apply rounded-md overflow-hidden;

	img {
		@apply size-full;
		@apply object-cover object-center;
	}
} .postbox-content {
	@apply flex flex-col justify-between gap-2;
} .postbox-title {
	@apply font-semibold;
	@apply text-ellipsis-multiline-2;
} .postbox-excerpt, .postbox-info {
	@apply text-sm font-medium text-(--vp-c-text-2);
} .postbox-excerpt {
	@apply text-ellipsis-multiline-3;
} .postbox-pin {
	@apply absolute top-2 right-2 text-theme-primary;
} #pagination-controls {
	@apply flex justify-center-safe gap-4;
	@apply pt-6 text-subtle-style;

	a {
		@apply px-2 py-2;
		@apply hover:text-theme-primary transition-[color];

		&[tabindex="-1"] {
			@apply text-subtle-color;
			@apply pointer-events-none;
		}
	}
} @media (width >= 640px) {
	.postbox {
		@apply flex-row-reverse;
	} .postbox-thumbnail {
		@apply w-32 aspect-[1/1];
	} .postbox-content {
		@apply flex-1;
	} .postbox-excerpt {
		@apply flex-1;
	}
}

</style>

<template>
	<div class="page-content">
		<p class="page-title">List of Posts</p>
		<p class="page-info">Page: {{ currPage }}/{{ totalPages }}</p>
		<main class="postbox-container">
			<article v-for="post in paginated" class="postbox-wrapper">
				<a :href="post.url" class="postbox">
					<div class="postbox-thumbnail">
						<Pin v-if="post.pin" class="postbox-pin"/>
						<img :src="post.thumbnail"/>
					</div>
					<div class="postbox-content">
						<h2 class="postbox-title">{{ post.title }}</h2>
						<p v-if="post.excerpt" class="postbox-excerpt">{{ post.excerpt }}</p>
						<div class="postbox-info">
							<time>{{  post.updatedAt?.string ?? post.createdAt?.string ?? "Unpublished" }}</time>
						</div>
					</div>
				</a>
			</article>
		</main>
		<div id="pagination-controls">
			<a
				:aria-disabled="!hasPrevious || undefined"
				:tabindex="hasPrevious ? undefined : -1"
				:href="!hasPrevious ? undefined : currPage === 2 ? `${BASE}/posts/` : `${BASE}/posts/page/${currPage - 1}`"
			>&lt; PREV</a>
			<a
				:aria-disabled="!hasNext || undefined"
				:tabindex="hasNext ? undefined : -1"
				:href="!hasNext ? undefined : `${BASE}/posts/page/${currPage + 1}`"
			>NEXT &gt;</a>
		</div>
	</div>
</template>
