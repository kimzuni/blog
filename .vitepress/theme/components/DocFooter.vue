<script setup lang="ts">

import PrevNextLinks from "./PrevNextLinks.vue";
import PostFooter from "./PostFooter.vue";

</script>



<style scoped>

@reference "../styles/index.css";

.VPDocFooter {
	@apply mt-16;
}

</style>

<template>
	<footer class="VPDocFooter">
		<PostFooter/>
		<PrevNextLinks/>
	</footer>
</template>
