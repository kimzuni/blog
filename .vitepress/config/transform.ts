import type { DefaultTheme, UserConfig } from "vitepress";

import { SERIES } from "../constants";



type Config = UserConfig<DefaultTheme.Config>;

export const pageData: Config["transformPageData"] = ({ relativePath, frontmatter, params }) => {
	if (!relativePath.includes("page/") && typeof frontmatter?.title === "string") {
		if (relativePath.startsWith("series/")) {
			const slug = relativePath.split("/").slice(1, -1).join("/");
			if (!slug) return;
			return {
				title: `${frontmatter.title}: ${SERIES.META[slug]?.LABEL ?? slug}`,
			};
		} else if (relativePath.startsWith("tags/")) {
			const tag = params?.tag;
			if (!tag) return;
			return {
				title: `${frontmatter.title}: ${tag}`,
			};
		}
	}
};
