const tocbox = html.querySelector("#tocbox");
if (localStorage.tocbox) { tocbox.classList.add(localStorage.tocbox); }
if (!tocbox.querySelector("#toc li")) { tocbox.remove(); }

const tocbox_resize = function() {
	set_style(tocbox, "--m-height", tocbox.querySelector("#toc").clientHeight + "px");
}

const ul_open = function(ul, total = 0) {
	let height = total;
	for (let li of ul.children) {
		for (let a of li.children) {
			if (a.tagName == "A") height += a.clientHeight;
		}
	}
	set_style(ul, "--ul-height", height + "px");
	if (ul.id == "toc") {
		tocbox_resize();
		set_style(tocbox, "--ul-height", height + "px");
		return;
	}
	ul.classList.add("open");
	ul_open(ul.parentNode.parentNode, height);
}

window.addEventListener("DOMContentLoaded", function() {
	const alist = tocbox.querySelectorAll("#toc a");
	const ulist = tocbox.querySelectorAll("#toc ul");
	const page_content = html.querySelector("#post-content");
	const hlist = page_content.querySelectorAll("h1, h2, h3, h4, h5, h6");
	ul_open(tocbox.querySelector("#toc"));

	if (!alist || !hlist) return;

	hlist.forEach(function(x, i) {
		if ( !x.getAttribute("id") ) {
			let id = alist[i].getAttribute("href").slice(1);
			id = url_decode(id);
			x.setAttribute("id", id);
		}
	});

	const alist_select = function(i) {
		for (let x of alist) {
			x.removeAttribute("select");
			x.parentNode.parentNode.classList.remove("open");
		}

		if ( -1 < i && i < alist.length ) {
			alist[i].setAttribute("select", "");
			ul_open(alist[i].nextElementSibling || alist[i].parentNode.parentNode);
		} else {
			ul_open(tocbox.querySelector("#toc"));
		}
	}

	const hlist_highlight = function() {
		let i = 0;
		for (let x of hlist) {
			if ( 1 < x.getBoundingClientRect().top ) {
				if ( (i == 0 && tocbox.querySelectorAll("#toc a[select]").length != 0) || (i != 0 && !alist[i-1].hasAttribute("select")) ) {
					alist_select(i-1);
				}
				break;
			}
			if ( page_content.getBoundingClientRect().top + page_content.clientHeight < 0 ) {
				alist_select(-1);
			} else if ( i+1 == hlist.length ) {
				alist_select(i);
			}
			i++;
		}
	}

	hlist_highlight();
	window.addEventListener("scroll", function() {
		hlist_highlight();
	});
});

window.addEventListener("resize", function() {
	ul_open(tocbox.querySelector("#toc"));
});

tocbox.querySelector(".module-title").addEventListener("click", function() {
	if ( tocbox.classList.contains("hide") ) {
		tocbox.classList.remove("hide");
		localStorage.tocbox = "show";
		tocbox_resize();
	} else {
		tocbox.classList.add("hide");
		localStorage.tocbox = "hide";
	}
});
