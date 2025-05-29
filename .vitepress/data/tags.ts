import { posts } from "./posts";



export const tags = posts.map(x => x.frontmatter.tags).flat().filter(Boolean).map(x => `${x}`.trim());
