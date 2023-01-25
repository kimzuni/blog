if ( page != 1 ) { location.replace("../"); }



let p = 1;
let next_page = true;
const f_page = function() {
	if (!next_page) { return; }
	next_page = false;
	p++;

	const next_page_path = `.${paginate_path.replace(":num", p)}` + `?timestamp=${Date.now()}`;
	let xhr = new window.XMLHttpRequest();
	xhr.open('GET', next_page_path, true)
	xhr.addEventListener("load", function() {
		let next_page_dom = new DOMParser();
		let next_page_html = next_page_dom.parseFromString(xhr.responseText, "text/html");
		for (let x of next_page_html.querySelectorAll(".postbox-container> li")) {
			html.querySelector("#page .postbox-container").append(x);
		}
		next_page = p != last_page ? true : false;
	});
	xhr.send()
}



window.addEventListener("scroll", function() {
	let document_height = html.querySelector("body").clientHeight;
	let window_height = window.innerHeight;
	let scroll = html.scrollTop;
	let offset = 0;
	if (document_height - window_height - to_px(get_style("--footer-height")) - offset < scroll) {
		f_page();
	}
});
