<script setup lang="ts">

import Postbox, { type Props as PostboxProps } from "./Postbox.vue";

export interface Props extends Omit<PostboxProps, "post" | "title" | "direction"> {
	posts?: PostboxProps["post"][];
	grid?: boolean;
}

withDefaults(defineProps<Props>(), {
	grid: undefined,
});

</script>



<style scoped>

@reference "../styles/index.css";

.postbox-container.md\:grid {
	@apply md:grid md:grid-cols-[repeat(auto-fill,minmax(256px,auto))] gap-4;
	@apply md:my-8;

	.postbox-wrapper {
		@apply md:m-0;
	}
}

</style>

<template>
	<section :class="`postbox-container ${grid !== true ? '' : 'md:grid'}`.trim()">
		<Postbox
			v-for="post in posts"
			:key="post?.url"
			:post="post"
			:direction="grid === undefined ? 'auto' : grid ? 'col' : 'row'"
			:headingTagName="headingTagName ?? 'h2'"
		/>
	</section>
</template>
