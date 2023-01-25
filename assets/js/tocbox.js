const tocbox = html.querySelector("#tocbox");
if (localStorage.tocbox) { tocbox.classList.add(localStorage.tocbox); }
if (!tocbox.querySelector("#toc li")) { tocbox.remove(); }

const tocbox_resize = function() {
	set_style(tocbox, "--toc-height", tocbox.querySelector("ul").clientHeight + "px");
}

window.addEventListener("DOMContentLoaded", function() {
	const alist = tocbox.querySelectorAll("#toc a");
	const page_content = html.querySelector("#post-content");
	const hlist = page_content.querySelectorAll("h1, h2, h3, h4, h5, h6");

	let height = 0;
	for (let a of alist) { height += a.clientHeight; }
	tocbox_resize();

	if ( alist && hlist ) {
		hlist.forEach(function(x, i) {
			if ( !x.getAttribute("id") ) {
				let id = alist[i].getAttribute("href").slice(1);
				id = url_decode(id);
				x.setAttribute("id", id);
			}
		});

		function alist_select(i) {
			for (let x of alist) {
				x.removeAttribute("select");
			}

			if ( -1 < i && i < alist.length ) {
				alist[i].setAttribute("select", "");
			}
		}

		function hlist_highlight() {
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
	}
});

window.addEventListener("resize", function() {
	tocbox_resize();
});

tocbox.querySelector(".module-title").addEventListener("click", function() {
	if ( tocbox.classList.contains("hide") ) {
		tocbox.classList.remove("hide");
		delete localStorage.tocbox;
	} else {
		tocbox.classList.add("hide");
		localStorage.tocbox = "hide";
	}
});
