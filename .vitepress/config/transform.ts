import type { DefaultTheme, UserConfig } from "vitepress";



type Config = UserConfig<DefaultTheme.Config>;

export const pageData: Config["transformPageData"] = ({ relativePath, frontmatter, params }) => {
	if (!relativePath.includes("page/") && typeof frontmatter?.title === "string") {
		if (relativePath.startsWith("series/")) {
			const series = relativePath.split("/").slice(1, -1).join("/");
			if (!series) return;
			return {
				title: `${frontmatter.title}: ${series}`,
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
