import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";
import footnote from "markdown-it-footnote";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import lightbox from "vitepress-plugin-lightbox";

import { parserPath } from "../utils/parserPath";
import { BASE, SITE, ASSETS_DIR } from "../constants";

import * as transform from "./transform";
import head from "./head";
import nav from "./nav";
import sidebar from "./sidebar";
import socialLinks from "./socialLinks";
import footer from "./footer";
import notFound from "./notFound";
import sitemap from "./sitemap";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: SITE.LANG,
	title: SITE.TITLE,
	description: SITE.DESCRIPTION,
	srcDir: "./",
	base: BASE,
	head: head,
	cleanUrls: true,
	lastUpdated: false,
	sitemap: sitemap,
	assetsDir: ASSETS_DIR,
	ignoreDeadLinks: true,
	transformPageData: transform.pageData,
	rewrites: (id) => parserPath(id).rewrite,
	srcExclude: [
		"README.md",
		"drafts/",
	],
	markdown: {
		externalLinks: {
			rel: "noopener noreferrer",
		},
		anchor: {
			slugify: (str) =>
				`${str}`
				.toLowerCase()
				.replace(/[^\p{L}\p{N} -]/gu, "")
				.replace(/ /g, "-")
			,
		},
		image: {
			lazyLoading: true,
		},
		lineNumbers: true,
		config: (md) => {
			md.use(footnote);
			md.use(groupIconMdPlugin);
			md.use(InlineLinkPreviewElementTransform);
			md.use(lightbox, {});
		},
	},
	themeConfig: {
		externalLinkIcon: true,
		outline: "deep",
		logo: undefined,
		nav: nav,
		sidebar: sidebar,
		socialLinks: socialLinks,
		notFound: notFound,
		footer: footer,
		sidebarMenuLabel: "More posts",
		search: {
			provider: "local",
			options: {
				detailedView: true,
				disableQueryPersistence: true,
			},
		},
		docFooter: {
			prev: false,
			next: false,
		},
	},
	vite: {
		plugins: [
			tailwindcss(),
			groupIconVitePlugin(),
		],
		optimizeDeps: {
			exclude: ["@nolebase/vitepress-plugin-inline-link-preview/client"],
		},
		ssr: {
			noExternal: [
				"@nolebase/vitepress-plugin-inline-link-preview",
				"@nolebase/ui",
			],
		},
	},
});
