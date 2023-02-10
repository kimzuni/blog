const giscus_handleMessage = function(event) {
	if (event.origin !== "https://giscus.app") return;
	if (!(typeof event.data === "object" && event.data.giscus)) return;
	if (!"discussion" in event.data.giscus) return;
	const giscusData = event.data.giscus;

	if ("error" in giscusData) {
		console.error(giscusData.error);
	} else if ("discussion" in giscusData) {
		f_msgbox({
			title: "New Comment",
			message: `${giscusData.viewer}: ${giscusData.discussion}`
		});
	}
}
window.addEventListener("message", giscus_handleMessage);

const giscus_sendMessage = function(msg) {
	const giscusFrame = document.querySelector("iframe.giscus-frame");
	if (!giscusFrame) return;
	giscusFrame.contentWindow.postMessage({ giscus: msg }, "https://giscus.app");
}


mode_toggle.addEventListener("click", function() {
	let css = this.ariaChecked == "true" ? "dark" : "light";
	if (giscus_theme.includes("/")) {
		css = `${giscus_theme.slice(0, giscus_theme.lastIndexOf("/"))}/giscus${css == "light" ? "" : "-dark"}.css`;
	}

	giscus_sendMessage({
		setConfig: {
			theme: css
		}
	});
});
