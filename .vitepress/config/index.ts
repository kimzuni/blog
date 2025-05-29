import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";

import { parserPath } from "../utils/parserPath";
import { BASE, SITE } from "../constants";

import transformPageData from "./transformPageData";
import nav from "./nav";
import sidebar from "./sidebar";
import socialLinks from "./socialLinks";
import sitemap from "./sitemap";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: SITE.LANG,
	title: SITE.TITLE,
	description: SITE.DESCRIPTION,
	srcDir: "./",
	base: BASE,
	cleanUrls: true,
	lastUpdated: false,
	markdown: {
		image: {
			lazyLoading: true,
		},
		lineNumbers: true,
	},
	transformPageData: transformPageData,
	sitemap: sitemap,
	rewrites: (id) => parserPath(id).rewrite,
	srcExclude: [
	],
	themeConfig: {
		externalLinkIcon: true,
		outline: "deep",
		logo: undefined,
		nav: nav,
		sidebar: sidebar,
		socialLinks: socialLinks,
		sidebarMenuLabel: "More posts",
		search: {
			provider: "local",
			options: {
				detailedView: true,
			},
		},
		notFound: {
			code: "404",
			title: "PAGE NOT FOUND",
			quote: "길을 잃으셨나요? 집으로 안내해 드릴게요!",
			linkText: "저를 따라오세요!",
		},
		footer: {
			message: undefined,
			copyright: `&copy; ${new Date().getFullYear()} zuni.kim`,
		},
		docFooter: {
			prev: "Previous post",
			next: "Next post",
		},
	},
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
});
