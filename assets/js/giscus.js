/*
function handleMessage(event) {
	if (event.origin !== 'https://giscus.app') return;
	if (!(typeof event.data === 'object' && event.data.giscus)) return;

	const giscusData = event.data.giscus;

	console.log(giscusData);
	if (!'discussion' in giscusData) return;
}




function sendMessage(message) {
	const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
	if (!iframe) return;
	iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}

sendMessage({
	setConfig: {
		theme: 'https://giscus.app/themes/custom_example.css',
		reactionsEnabled: false,
	}
});
*/
