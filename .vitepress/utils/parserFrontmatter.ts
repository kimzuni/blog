import fs from "fs";
import matter, { type GrayMatterFile } from "gray-matter";



export type Frontmatter = GrayMatterFile<string>["data"];

export const parserFrontmatter = (path: string) => {
	const str = fs.readFileSync(path, { encoding: "utf-8" });
	const { data, ...more } = matter(str);
	return {
		path,
		frontmatter: data,
		...more,
	};
};
