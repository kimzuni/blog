<script setup lang="ts">

import PrevNextLinks from "./PrevNextLinks.vue";
import { useCurrentPost } from "../composables/useCurrentPost";

const post = useCurrentPost();

</script>



<style scoped>

@reference "../styles/index.css";

.VPDocFooter {
	@apply mt-16;
} .tags-container {
	@apply my-4;
	@apply flex gap-2;
	@apply text-subtle;
	@apply [&>a]:hover:text-(--vp-c-brand-1);
}

</style>

<template>
	<footer class="VPDocFooter">
		<div class="tags-container">
			<a
				v-for="tag in post.tags"
				:href="`/tags/${tag}`"
			>#{{ tag }}</a>
		</div>
		<PrevNextLinks/>
	</footer>
</template>
