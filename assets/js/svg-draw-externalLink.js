/*
 * © 2022 kimzuni <hello@kimzuni.com>
 * Create Date : 2022
 * Latest Date : 2023.01.13
 */



const svg_draw_externalLink = {
	"name": "externalLink",
	"viewBox": "0 0 64 64",
	"height": 64,
	"width": 64,
	"count": 0,
	"color": "var(--svg-draw-color, #5cc9ff)",
	"code": ""
}
svg_draw_externalLink.code = `
	<g fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
		<path d="M 32,13 H 3 V 61 H 49 V 32"/>
		<path d="M 36,3 61,3 61,28 M 27,37 61,3"/>
	</g>
`;



const f_svg_draw_externalLink = function(box) {
	svg_draw_externalLink.count++;
	const svg_draw_info = svg_draw_externalLink;

	let svg_draw_code = `<svg viewBox="${svg_draw_info.viewBox}" draw="${svg_draw_info.name}" stroke="${svg_draw_info.color}">`;
	if (svg_draw_info.count == 1) {
		svg_draw_code += `<symbol id="svg-draw-${svg_draw_info.name}">${svg_draw_info.code}</symbol>`;
	}
	svg_draw_code += `<use href="#svg-draw-${svg_draw_info.name}"/></svg>`;

	box.outerHTML = svg_draw_code;
}



window.addEventListener("load", function() {
	for (let svg_draw_box of document.querySelectorAll(`svg[draw="externalLink"]`)) {
		f_svg_draw_externalLink(svg_draw_box);
	}
});
