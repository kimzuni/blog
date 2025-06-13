import { createContentLoader } from "vitepress";

import { rawToPostContent, type Post } from "../utils/rawToPostContent";

export declare const data: Post[];

export type { Post };

export default createContentLoader([
	"posts/!(index).md",
	"posts/!(page)/**/*.md",
], {
	render: true,
	excerpt: true,
	includeSrc: true,
	transform: rawToPostContent,
});
