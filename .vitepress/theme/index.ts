// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "virtual:group-icons.css";
import "./styles/index.css";

import DocAfter from "./components/DocAfter.vue";
import HomePinned from "./components/HomePinned.vue";
import PostInfo from "./components/PostInfo.vue";

import Posts from "./components/Posts.vue";
import Series from "./components/Series.vue";
import SeriesPosts from "./components/SeriesPosts.vue";
import Tags from "./components/Tags.vue";
import TagPosts from "./components/TagPosts.vue";
import Archives from "./components/Archives.vue";

import Postbox from "./components/Postbox.vue";
import Imgbox from "./components/Imgbox.vue";

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
			"doc-before": () => h(PostInfo),
			"home-features-after": () => h(HomePinned),
			"doc-after": () => h(DocAfter),
		});
	},
	enhanceApp({ app, router, siteData }) {
		app.component("posts", Posts);
		app.component("series", Series);
		app.component("series_posts", SeriesPosts);
		app.component("tags", Tags);
		app.component("tag_posts", TagPosts);
		app.component("archives", Archives);

		app.component("Postbox", Postbox);
		app.component("Imgbox", Imgbox);
	},
} satisfies Theme;
