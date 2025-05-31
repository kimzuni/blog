<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import { usePosts } from "../composables/usePosts";
import { LIMIT } from "../../constants";
import Postboxes from "./Postboxes.vue";
import Page from "./Page.vue";

const { frontmatter } = useData();

const { paginated } = usePosts({
	pinned: computed(() => true),
	currPage: computed(() => 1),
	perPage: LIMIT.HOME_PINNED,
});

</script>



<style scoped>

@reference "../styles/index.css";

.page-content-wrapper.has-features {
	@apply pt-16;
} .home-pinned-title {
	@apply text-subtle text-base;
}

</style>

<template>
	<Page :class="`page-content-wrapper ${frontmatter.features ? 'has-features' : ''}`.trim()" v-if="frontmatter.show_pinned_posts === true && paginated.length">
		<h2 class="home-pinned-title">Pinned Posts</h2>
		<Postboxes
			:posts="paginated"
			:grid="true"
		/>
	</Page>
</template>
