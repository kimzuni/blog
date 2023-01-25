const codebox_copy = function(box) {
	text_copy(box.parentNode.parentNode.querySelector(".codebox-content pre").innerText);
}



const codebox_highlight = function(t, i) {
	if (i < 0) { i = ""; }
	set_style(t, "--line", i);
}

const codebox_onscroll = function(box) {
	let top = box.scrollTop;
	box = box.parentNode.parentNode.parentNode.parentNode;
	set_style(box, "--top", top*-1 + "px");
}

const codebox_onmousemove = function(e, box) {
	const codebox = box.parentNode.parentNode.parentNode.parentNode;
	const codebox_bg = codebox.querySelector(".codebox-bg");
	const x = codebox.querySelector(".codebox-content");
	const codebox_content = x.querySelector("pre");

	const paddingTop = parseFloat(get_style(x, "padding-top"));
	const codebox_lineHeight = parseFloat(get_style(codebox_content, "line-height"));
	const y = e.clientY - box.getBoundingClientRect().top - paddingTop;
	let line = y + x.scrollTop;
	if (x.clientHeight < y+paddingTop || line < 0 || codebox_content.clientHeight < line) { codebox_highlight(codebox, -1); return false; }

	line = parseInt(line / codebox_lineHeight) + 1;
	codebox_highlight(codebox, line);
}



window.addEventListener("DOMContentLoaded", function() {
	for (let codebox of html.querySelectorAll(".codebox")) {
		set_style(codebox, "--line-width", codebox.querySelector(".codebox-line").clientWidth + "px");

		codebox.querySelector(".codebox-content").addEventListener("scroll", function() {
			codebox_onscroll(this);
		});
		codebox.querySelector("tr").addEventListener("mousemove", function(e) {
			codebox_onmousemove(e, this);
		});
		codebox.querySelector("tr").addEventListener("mouseout", function() {
			codebox_highlight(this.parentNode.parentNode.parentNode.parentNode, -1);
		});
	}
});
