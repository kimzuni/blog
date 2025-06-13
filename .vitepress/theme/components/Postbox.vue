<script setup lang="ts">

import { computed } from "vue";
import { Pen, Pin } from "lucide-vue-next";

import { BASE, NO_IMAGE } from "../../constants";
import { data as posts, type Post } from "../../data/posts.data";

export type Props = {
	post?: Post;
	title?: string;
	direction?: "row" | "col" | "auto";
	headingTagName?: string;
};

const props = withDefaults(defineProps<Props>(), {
	headingTagName: "p",
});
const direction = computed(() => props.direction ?? "row");

const post = props.post !== undefined ? props.post : props.title === undefined ? undefined : posts.find(x => [x.title, x.slug, x.url.slice(BASE.length, -1), `${x.url.slice(BASE.length)}`].includes(props.title!));
const postDate = computed(() => post?.updatedAt ?? post?.createdAt);

</script>



<style scoped>

@reference "../styles/index.css";

.postbox-wrapper {
	@apply my-8;
} .postbox {
	@apply @container/postbox;
	@apply h-full no-underline;
	@apply flex gap-4 p-6;
	@apply rounded-2xl shadow-(--vp-shadow-2);
	@apply bg-(--vp-c-bg-soft) border-1 border-(--vp-c-bg-soft);
	@apply not-[&.not-found]:hover:border-(--vp-c-brand-1) transition-[border-color];

	@apply flex-row-reverse group-[:not(.row)]:flex-col sm:group-[:not(.col)]:flex-row-reverse;
} .postbox-thumbnail {
	@apply relative bg-(--vp-c-default-soft);
	@apply rounded-md overflow-hidden;

	@apply w-30 group-[:not(.row)]:w-full sm:group-[:not(.col)]:w-30;
	@apply aspect-square group-[:not(.row)]:aspect-video sm:group-[:not(.col)]:aspect-square;

	img {
		@apply size-full;
		@apply object-cover object-center;
	}
} .postbox-content {
	@apply flex-1;
	@apply flex flex-col justify-between gap-2;
} .postbox-title {
	@apply text-base text-(--vp-c-text-1) font-semibold;
	@apply text-ellipsis-multiline-2;
} .postbox-title, .postbox-excerpt {
	@apply border-0 m-0 p-0;
} .postbox-excerpt, .postbox-info {
	@apply text-sm font-medium text-(--vp-c-text-2);
	@apply text-ellipsis-multiline-3;
} .postbox-info {
	@apply grow-1 flex items-end-safe;
} .postbox-icon {
	@apply absolute top-2 right-2;
	@apply p-0.75;

	&.unpublished {
		@apply text-(--vp-c-text-2);
	} &.pin {
		@apply text-(--vp-c-brand-1);
	}
}

</style>

<template>
	<article :class="`postbox-wrapper group ${direction}`">
		<a v-if="post" :href="post.url" class="postbox" :aria-labelledby="`postbox-title-${post.slug}`">
			<div class="postbox-thumbnail">
				<Pen v-if="!post.createdAt" class="postbox-icon unpublished"/>
				<Pin v-if="post.pin" class="postbox-icon pin"/>
				<img :src="post.thumbnail ?? NO_IMAGE" :alt="`Thumbnail for post: ${post.title}`"/>
			</div>
			<div class="postbox-content">
				<component :is="props.headingTagName" :id="`postbox-title-${post.slug}`" class="postbox-title">{{ post.title }}</component>
				<p v-if="post.excerpt" class="postbox-excerpt">
					{{ post.excerpt }}
				</p>
				<div class="postbox-info">
					<time :datetime="new Date(postDate?.timestamp || 0).toISOString()">{{ postDate?.string ?? "Unpublished" }}</time>
				</div>
			</div>
		</a>
		<div v-else class="postbox not-found" role="alert" aria-live="polite">
			<div class="postbox-content">
				<p class="postbox-excerpt">
					Post not found: {{ props.post?.title ?? props.title ?? "Missing post or title in props" }}
				</p>
			</div>
		</div>
	</article>
</template>
