import fs from "fs";



export const parserFrontmatter = (path: string) => {
	if (!path.endsWith(".md")) return;
	const content = fs.readFileSync(path, { encoding: "utf-8" });
	const tmp = content.split("---");
	if (tmp.length < 3) return;
	const frontmatter = tmp[1]!.trim().split("\n").reduce<Record<string, string | undefined>>((acc, cur) => {
		const tmp = cur.split(":");
		const key = tmp[0]!.trim();
		const value = tmp.slice(1).join(":").trim();
		return {
			...acc,
			[key]: value,
		};
	}, {});
	return {
		path,
		frontmatter,
		content,
	};
};
