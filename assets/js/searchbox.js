const searchbox = html.querySelector("#searchbox");

const searchbox_focusin = function() {
	searchbox.classList.add("focus");
}
const searchbox_focusout = function() {
	searchbox.classList.remove("focus");
}
