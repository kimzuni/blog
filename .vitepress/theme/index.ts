// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";

import "virtual:group-icons.css";
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css";

import "./styles/index.css";
import Layout from "./Layout.vue";

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
	Layout,
	enhanceApp({ app, router, siteData }) {
		app.use(NolebaseInlineLinkPreviewPlugin, {
			selectorsToBeHided: [
				".VPNav", ".VPFooter", ".VPLocalNav", ".VPSidebar", ".VPDocFooter", ".prev-next", // default values
				".seriesbox-container",
				".comment-container",
			],
		});
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
