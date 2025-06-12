import fs from "fs";
import { URL } from "../.vitepress/constants";



const MOVE_FILES: Array<string[]> = [
];

const BASE_URL_FILES: string[] = [
	"robots.txt",
];

const REMOVE_FILES: string[] = [
];



const BASE_URL = URL;
const dist = ".vitepress/dist";

for (const file of BASE_URL_FILES) {
	const origin = fs.readFileSync(`${dist}/${file}`, "utf-8");
	const changed = origin.replace(/\{\{\s*BASE_URL\s*\}\}/g, BASE_URL);
	fs.writeFileSync(`${dist}/${file}`, changed);
}



for (const files of MOVE_FILES) {
	fs.renameSync(`${dist}/${files[0]}`, `${dist}/${files[1]}`);
}



for (const file of REMOVE_FILES) {
	fs.rmSync(`${dist}/${file}`, { recursive: true, force: true });
}
