const f_page = function(form) {
	let r = "./";
	let p = form.querySelector("input").value;
	if (!p || isNaN(p*1)) { return false; }
	else if (p == page) { return false; }
	else if (p < 1 || last_page < p) {
		f_msgbox("error", `Page ${p} does not exist.<br/>Please enter a number between 1 and ${last_page}.`);
		return false;
	} else if (p != 1) { r = `./page${p}/`; }
	location.href = r;
	return false;
}
