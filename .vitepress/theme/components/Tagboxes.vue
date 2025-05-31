<script setup lang="ts">

import Tagbox, { type Props as TagboxProps } from "./Tagbox.vue";

export interface Props {
	items: TagboxProps[];
}

defineProps<Props>();

</script>



<style scoped>

@reference "../styles/index.css";

.tagbox-container {
	@apply flex justify-center-safe items-center-safe flex-wrap;
	@apply mt-8 gap-4;

	a {
		@apply hover:text-(--vp-c-brand-1);
	}
}

</style>

<template>
	<ul class="tagbox-container">
		<li v-for="item in items" :key="item.tagName">
			<Tagbox v-bind="item"/>
		</li>
	</ul>
</template>
