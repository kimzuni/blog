// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "./styles/index.css";
import Posts from "./components/Posts.vue";
import Series from "./components/Series.vue";
import SeriesPosts from "./components/SeriesPosts.vue";
import PostInfo from "./components/PostInfo.vue";

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
			"doc-before": () => h(PostInfo),
		});
	},
	enhanceApp({ app, router, siteData }) {
		app.component("posts", Posts);
		app.component("series", Series);
		app.component("series_posts", SeriesPosts);
	},
} satisfies Theme;
