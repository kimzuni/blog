import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";
import footnote from "markdown-it-footnote";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";

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
	},
});
