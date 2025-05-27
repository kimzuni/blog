import { stripHTML } from "./stripHTML";



export const parserHeading = (content?: string, type: "html" | "md" = "html") => {
	if (!content) return undefined;
	if (type === "html") {
		return stripHTML(content?.slice(content.indexOf("<h1 "), content.indexOf("</h1>")+5));
	} else {
		return content.split("\n").find(x => x.startsWith("#" ))?.split("# ").slice(1).join("# ").trim();
	}
};
