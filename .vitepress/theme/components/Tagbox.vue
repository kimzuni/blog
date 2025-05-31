<script setup lang="ts">

import { BASE } from "../../constants";
import { toPathname } from "../../utils/toPathname";

export interface Props {
	tagName: string;
	number?: number
}

const { tagName, number=0 } = defineProps<Props>();

</script>



<style scoped>

@reference "../styles/index.css";

.tagbox {
	@apply inline-flex justify-center-safe items-center-safe;
	@apply border-1 rounded-full px-3 py-1;
	@apply text-sm break-all;
}

</style>

<template>
	<a
		class="tagbox"
		:href="`${BASE}/tags/${toPathname(tagName)}/`"
	>
		<span aria-hidden="true">#{{ tagName }} {{ number }}</span>
		<span class="sr-only">View {{ number }} posts tagged with {{ tagName }}</span>
	</a>
</template>
