import fs from "fs";
import matter from "gray-matter";



export const parserFrontmatter = (path: string) => {
	const str = fs.readFileSync(path, { encoding: "utf-8" });
	const data = matter(str);
	return {
		path,
		frontmatter: data.data,
		content: data.content,
	};
};
