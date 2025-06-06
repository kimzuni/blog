<script setup>

import { onMounted } from "vue";
import { useRouter } from "vitepress";
import DefaultTheme from "vitepress/theme";
import mediumZoom from "medium-zoom";

import DocAfter from "./components/DocAfter.vue";
import HomePinned from "./components/HomePinned.vue";
import PostInfo from "./components/PostInfo.vue";

const { Layout } = DefaultTheme;

// vitepress-plugin-lightbox
const router = useRouter();
const setupMediumZoom = () => {
	mediumZoom("[data-zoomable]", {
		background: "transparent",
	});
};
onMounted(setupMediumZoom);
router.onAfterRouteChange = setupMediumZoom;

</script>



<style>

.medium-zoom-overlay {
	backdrop-filter: blur(5rem);
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
	z-index: 999;
}

</style>

<template>
	<Layout>
		<template #doc-before><PostInfo/></template>
		<template #home-features-after><HomePinned/></template>
		<template #doc-after><DocAfter/></template>
	</Layout>
</template>
