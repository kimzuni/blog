import { execSync } from "child_process";

import { toTimestamp } from "./toTimestamp";



export const getGitUpdatedTime = (path: string, createdAt=true) => {
	const split = path.split("/");
	const base = split.length === 1 ? "./" : split.slice(0, -1).join("/");
	path = split[split.length-1]!;

	try {
		if (process.env.GITHUB_ACTIONS !== "true") throw new Error;
		const time = execSync(`git -C "${base}" log --diff-filter=${createdAt ? "A" : "M"} --follow --format=%aI -1 "${path}"`, { encoding: "utf-8" }).trim();
		return toTimestamp(time) || null;
	} catch {
		return null;
	}
};
