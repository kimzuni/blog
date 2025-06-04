import type { Frontmatter } from "./parserFrontmatter";
import { getGitUpdatedTime } from "./getGitUpdatedTime";
import { toTimestamp } from "./toTimestamp";



export const parserDatetimes = (filepath: string, frontmatter: Frontmatter) => {
	const createdAt = frontmatter.createdAt ?? frontmatter.date;
	const updatedAt = frontmatter.updatedAt ?? frontmatter.last_modified_at;

	return {
		createdAt: toTimestamp(createdAt) || getGitUpdatedTime(filepath, true),
		updatedAt: updatedAt === false ? null : toTimestamp(updatedAt) || getGitUpdatedTime(filepath, false),
	};
};
