const server_timezone = -540; // KST Timezone, +0900
const timezone = new Date().getTimezoneOffset();

const f_one_more = function(t, o) {
	return `${t} ${o}${t == 1 ? "" : "s"}`;
}

const f_time = function(timebox, time, origin) {
	if (!time) time = origin;
	let timestamp = parseInt(new Date(time).getTime()/1000);
	let nowTime = parseInt(new Date().getTime()/1000);
	let new_time = nowTime - timestamp;

	let timeout = 0;
	if (new_time/60 < 1) { new_time = f_one_more(parseInt(new_time%60), "second") + " ago"; timeout = 100; }
	else if (new_time/60 < 60) { new_time = f_one_more(parseInt(new_time/60), "minute") + " ago"; timeout = 1000; }
	else if (new_time/(60*60) < 24) { new_time = f_one_more(parseInt(new_time/(60*60)), "hour") + " ago"; timeout = 1000*60; }
	else {
		let t1 = timestamp - (timestamp-timezone*60)%(60*60*24);
		let t2 = nowTime - (nowTime-timezone*60)%(60*60*24);
		new_time = (t2 - t1)/(60*60*24);

		if (new_time < 7) { new_time = f_one_more(parseInt(new_time), "day") + " ago"; timeout = 1000*60*60; }
		else if (new_time/7 < 4) { new_time = f_one_more(parseInt(new_time/7), "week") + " ago"; timeout = 1000*60*60*24; }
		else { new_time = origin; }
	}
	if (timebox.innerHTML != new_time) { timebox.innerHTML = new_time; }

	if (0 < timeout) {
		setTimeout(function() { f_time(timebox, time, origin); }, timeout);
	}
}



window.addEventListener("DOMContentLoaded", function() {
	for (let time of html.querySelectorAll(".postbox-date, .infobox-date, time")) {
		f_time(time, time.title, time.innerHTML);
	}
});
