<script setup lang="ts">

import { GITHUB_REPO } from "../../constants";
import { useCurrentPost } from "../composables/useCurrentPost";
import { toPathname } from "../../utils/toPathname";

import IconHistory from "./IconHistory.vue";

const post = useCurrentPost();

</script>



<style scoped>

@reference "../styles/index.css";

.post-footer {
	@apply my-4;
	@apply flex gap-2 flex-wrap;
	@apply text-subtle text-nowrap;
} .tags-container {
	@apply flex gap-2 flex-wrap;
	@apply [&>a]:hover:text-(--vp-c-brand-1);
} .post-history {
	@apply flex-1 text-right underline;

	a {
		@apply [&>.icon]:mr-0.5;
		@apply hover:text-(--vp-c-text-1);
	}
}

</style>

<template>
	<div class="post-footer">
		<div class="tags-container">
			<a
				v-for="tag in post.tags"
				:href="`/tags/${toPathname(tag)}`"
			>#{{ tag }}</a>
		</div>
		<div v-if="post.createdAt" class="post-history">
			<a :href="`https://github.com/${GITHUB_REPO}/commits/main/${post.filepath}`" target="_blank" rel="noopener noreferrer">
				<span class="icon"><IconHistory/></span>
				<span class="text">View edit history on GitHub</span>
			</a>
		</div>
	</div>
</template>
