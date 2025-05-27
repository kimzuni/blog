<script setup lang="ts">

import type { Post } from "../../data/posts.data";
import { Pen, Pin } from "lucide-vue-next";



defineProps<{
	post: Post;
}>();

</script>



<style scoped>

@reference "../styles/index.css";

.postbox-wrapper {
	@apply my-8;
} .postbox {
	@apply @container/postbox;
	@apply flex flex-col gap-4 p-6;
	@apply rounded-2xl shadow-(--vp-shadow-2);
	@apply bg-(--vp-c-bg-soft) border-1 border-(--vp-c-bg-soft);
	@apply hover:border-(--vp-c-brand-1) transition-[border-color];
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
} .postbox-icon {
	@apply absolute top-2 right-2;
	@apply p-0.75;

	&.unpublished {
		@apply text-(--vp-c-text-2);
	} &.pin {
		@apply text-(--vp-c-brand-1);
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
	<article class="postbox-wrapper">
		<a :href="post.url" class="postbox">
			<div class="postbox-thumbnail">
				<Pen v-if="!post.createdAt" class="postbox-icon unpublished"/>
				<Pin v-if="post.pin" class="postbox-icon pin"/>
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
</template>
