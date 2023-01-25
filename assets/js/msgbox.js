const msgbox = html.querySelector("#msgbox-container");
const f_msgbox = function(type, msg) {
	if ( !msg ) { msg = type; type = "mormal"; }
	let x = document.createElement("div");
	x.className = "msgbox";
	x.innerHTML = `<div class="${type}">${msg}</div>`;
	msgbox.prepend(x);

	setTimeout(function() {
		x.classList.add("show");
	}, 10);

	function msg_hide() {
		x.classList.add("hide");
		setTimeout(function() {
			x.remove();
		}, 500);
	}

	let timeout = 2000;
	if (type == "warning") { timeout = 3000; }
	else if (type == "error") { timeout =  4000; }
	setTimeout(msg_hide, timeout);
}
