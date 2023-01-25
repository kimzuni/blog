const searchbox = html.querySelector("#search");

const search_focusin = function() {
	searchbox.classList.add("focus");
}
const search_focusout = function() {
	searchbox.classList.remove("focus");
}
