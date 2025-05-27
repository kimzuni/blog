import type { DefaultTheme, UserConfig } from "vitepress";

import { URL, BASE } from "../constants";



const item: UserConfig<DefaultTheme.Config>["sitemap"] = {
	hostname: `${URL}${BASE}/`,
	transformItems: (items) => items.map(x => ({
		...x,
		priority: (
			x.url === "" ? 1.0 :
			x.url.startsWith("series/") ? 0.8 :
			x.url === "posts/" || x.url.includes("page/") ? 0.6 :
			x.url.startsWith("posts/") ? 0.5 :
			undefined
		),
	})),
};

export default item;
