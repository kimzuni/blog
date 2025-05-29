import type { DefaultTheme, UserConfig } from "vitepress";



const item: UserConfig<DefaultTheme.Config>["transformPageData"] = ({ relativePath, frontmatter }) => {
	if (relativePath.startsWith("series/") && !relativePath.includes("page/") || typeof frontmatter?.title === "string") {
		const series = relativePath.split("/").slice(1, -1).join("/");
		return {
			title: `${frontmatter.title}: ${series}`,
		};
	}
};

export default item;
