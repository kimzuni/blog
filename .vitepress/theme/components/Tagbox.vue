<script setup lang="ts">

import { BASE } from "../../constants";
import { toPathname } from "../../utils/toPathname";

const { tagName, number=0 } = defineProps<{
	tagName: string;
	number?: number
}>();

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
	>#{{ tagName }} {{ number }}</a>
</template>
