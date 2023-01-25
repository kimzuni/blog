for (let img of html.querySelectorAll("#post img[src]")) {
	img.addEventListener("click", function() {
		location.href = img.getAttribute("src");
	});
}

const post = html.querySelector("#post");
const tagbox = html.querySelector("#post-tags");
const footnotebox = html.querySelector("#post-footnotes");
if (footnotebox) { post.append(footnotebox); }
