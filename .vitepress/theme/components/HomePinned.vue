<script setup lang="ts">

import { computed } from "vue";
import { useData } from "vitepress";

import { usePosts } from "../composables/usePosts";
import { LIMIT } from "../../constants";
import Page from "./Page.vue";

import Postbox from "./Postbox.vue";

const { frontmatter } = useData();

const { paginated } = usePosts({
	pinned: computed(() => true),
	currPage: computed(() => 1),
	perPage: LIMIT.HOME_PINNED,
});

</script>

<style scoped>

@reference "../styles/index.css";

.page-content-wrapper {
	@apply [[data-mt]]:pt-16;
} .home-pinned-title {
	@apply text-subtle text-base;
}

</style>



<template>
	<Page class="page-content-wrapper" v-if="frontmatter.show_pinned_posts === true && paginated.length" :data-mt="frontmatter.features ? '' : undefined">
		<p class="home-pinned-title">Pinned Posts</p>
		<main>
			<Postbox
				class="postbox-wrapper"
				v-for="post in paginated"
				:post="post"
			/>
		</main>
	</Page>
</template>
