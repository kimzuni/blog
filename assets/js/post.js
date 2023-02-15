const post_group = html.querySelector("#post-group");

const post_group_onclick = function() {
	localStorage.post_group = post_group.hasAttribute("open") ? "close" : "open";
}
if (post_group) {
	post_group.querySelector("summary").onclick = post_group_onclick;
	if (localStorage.post_group != "open") {
		post_group.removeAttribute("open");
	}
}



for (let img of html.querySelectorAll("#post img[src]")) {
	img.addEventListener("click", function() {
		location.href = img.getAttribute("src");
	});
}

const post = html.querySelector("#post");
const tagbox = html.querySelector("#post-tags");
const footnotebox = html.querySelector("#post-footnotes");
if (footnotebox) { post.append(footnotebox); }
