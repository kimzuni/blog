const fn_previewbox = document.createElement("p");
html.querySelector("#fn-preview").append(fn_previewbox);



const fn_mouseover = function(fnid) {
	let target = html.querySelector(`#post-footnotes [id="fn-${fnid}"]> *:not([fnid])`);
	if (!target) { console.error(`Footnote '${fnid}' is Not Created.`); return false; }
	fn_previewbox.setAttribute("fnid", fnid);
	fn_previewbox.innerHTML = target.outerHTML;
}

const fn_mouseout = function() {
	fn_previewbox.innerHTML = "";
}



const fnid_list = {}
window.addEventListener("DOMContentLoaded", function() {
	for (let fn of html.querySelectorAll("li.footnote a[fnid]")) {
		let fnid = fn.getAttribute("fnid");
		let fns = html.querySelectorAll(`li.footnote a[fnid="${fnid}"]`)
		if (fns[0] != fn) {
			fns[0].parentNode.childNodes[1].innerHTML += " " + fn.parentNode.childNodes[1].innerHTML;
			fn.parentNode.remove();
		}
	}

	for (let fn of html.querySelectorAll("sup.footnote a[fnid]")) {
		let fnid = fn.getAttribute("fnid");
		if (!fnid_list.hasOwnProperty(fnid)) {
			fnid_list[fnid] = 0;
		}
		fnid_list[fnid]++;
	}

	for (let fnid in fnid_list) {
		if (fnid_list[fnid] == 1) { delete fnid_list[fnid]; }
	}


	for (let fnid in fnid_list) {
		let cnt = 1;
		let insert = [];
		for (let fn of html.querySelectorAll(`sup.footnote a[fnid="${fnid}"]`)) {
			fn.parentNode.id += "-" + cnt;
			let x = document.createElement("a");
			x.className = "no";
			x.href = `#rfn-${fnid}-${cnt}`;
			x.setAttribute("no", cnt)
			insert.unshift(x)
			cnt++;
		}

		for (let a of insert) {
			html.querySelector(`li.footnote a[fnid="${fnid}"] + *`).prepend(a);
		}
		html.querySelector(`li.footnote a[fnid="${fnid}"]`).outerHTML = `<span fnid="${fnid}"></span>`;
	}
});
