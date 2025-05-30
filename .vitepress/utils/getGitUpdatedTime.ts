import { execSync } from "child_process";

import { toTimestamp } from "./toTimestamp";



export const getGitUpdatedTime = (path: string, createdAt=true) => {
	try {
		if (process.env.GITHUB_ACTIONS !== "true") throw new Error;
		const time = execSync(`git log --diff-filter=${createdAt ? "A" : "M"} --follow --format=%cI -1 "${path}"`, { encoding: "utf-8" }).trim();
		return toTimestamp(time) || null;
	} catch {
		return null
	}
};
