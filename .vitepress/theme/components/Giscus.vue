<script setup lang="ts">

import { onMounted, onBeforeUnmount } from "vue";
import { useData } from "vitepress";
import Giscus from "@giscus/vue";

import { SITE, URL, BASE, GISCUS } from "../../constants";

const { page, frontmatter, isDark } = useData();

function handleMessage(event: MessageEvent) {
	if (event.origin !== "https://giscus.app") return;
	if (frontmatter.value.comment === false || !(typeof event.data === "object" && event.data.giscus)) return;

	const giscusData = event.data.giscus?.resizeHeight;
	if (typeof giscusData !== "number") return;

	document.querySelector(".giscus-desc")?.toggleAttribute("hidden", giscusData < 100);
}

onMounted(() => {
	window.addEventListener("message", handleMessage)
});

onBeforeUnmount(() => {
	window.removeEventListener("message", handleMessage)
});

</script>



<style scoped>

@reference "../styles/index.css";

.comment-container {
	@apply mt-16 pt-8;
	@apply border-t-1 border-(--vp-c-divider);
} .not-allowed {
	@apply text-center text-subtle text-base;
} .giscus-desc {
	@apply pb-4;
	@apply text-center text-subtle;

	a {
		@apply underline;
	} a:hover {
		@apply text-(--vp-c-brand-1);
	}
}

</style>

<template>
	<div class="comment-container">
		<div v-if="frontmatter.comment === false" class="not-allowed">
			Comments not allowed
		</div>
		<div v-else class="giscus-wrapper">
			<p class="giscus-desc" hidden>
				Not supported comment edit and upvote
				<br/>
				You can do it on
				<a href="https://github.com/jh1950/giscus-test/discussions" target="_blank">this page</a>
				if you want.
			</p>
			<Giscus
				:key="page.relativePath"
				:id="GISCUS.id ?? 'giscus'"
				:repo="GISCUS.repo"
				:repoId="GISCUS.repoId"
				:category="GISCUS.category"
				:categoryId="GISCUS.categoryId"
				:mapping="GISCUS.mapping"
				:term="GISCUS.term ?? 'Welcome to @giscus/vue component!'"
				:theme="`${URL}${BASE}/assets/giscus-${isDark ? 'dark' : 'light'}.css`"
				:strict="GISCUS.strict ?? '1'"
				:reactionsEnabled="GISCUS.reactionsEnabled ?? '1'"
				:emitMetadata="GISCUS.emitMetadata ?? '0'"
				:inputPosition="GISCUS.inputPosition ?? 'top'"
				:lang="GISCUS.lang ?? SITE.LANG"
				:loading="GISCUS.loading ?? 'lazy'"
			/>
		</div>
	</div>
</template>
