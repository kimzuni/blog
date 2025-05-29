<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import { BASE } from "../../constants";
import { data as posts } from "../../data/posts.data";

const { page } = useData();
const post = computed(() => posts.find(x => `${x.url}index.md` === `${BASE}/${page.value.relativePath}`));

</script>

<style scoped>

@reference "../styles/index.css";

.post-title {
	@apply mb-8;
	@apply text-center font-semibold;
	@apply leading-10 -tracking-[0.02em];
	@apply text-[28px] md:text-[32px];
} .post-date {
	@apply mb-8;
	@apply text-right text-subtle;
}

</style>



<template>
	<div class="post-info">
		<h1 class="post-title">{{ post?.title }}</h1>
		<div class="post-date">
			<p><span v-if="post?.updatedAt">작성: </span>
				<time :datetime="new Date(post?.createdAt?.timestamp || 0).toISOString()">{{ post?.createdAt?.string ?? "Unpublished" }}</time>
			</p>
			<p v-if="post?.updatedAt"><span>수정: </span>
				<time :datetime="new Date(post?.updatedAt?.timestamp || 0).toISOString()">{{ post?.updatedAt?.string }}</time>
			</p>
		</div>
	</div>
</template>
