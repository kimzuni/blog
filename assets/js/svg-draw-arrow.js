/*
 * © 2022 kimzuni <hello@kimzuni.com>
 * Create Date : 2022
 * Latest Date : 2023.01.13
 */



const svg_draw_arrow = {
	"name": "arrow",
	"viewBox": "0 0 64 32",
	"height": 32,
	"width": 64,
	"count": 0,
	"color": "var(--svg-draw-color, #5cc9ff)",
	"code": ""
}
svg_draw_arrow.code = `
	<path d="M 5,27 32,5 59,27 32,5 z" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
`;



const f_svg_draw_arrow = function(box) {
	svg_draw_arrow.count++;
	const svg_draw_info = svg_draw_arrow;

	let svg_draw_code = `<svg viewBox="${svg_draw_info.viewBox}" draw="${svg_draw_info.name}" stroke="${svg_draw_info.color}">`;
	if (svg_draw_info.count == 1) {
		svg_draw_code += `<symbol id="svg-draw-${svg_draw_info.name}">${svg_draw_info.code}</symbol>`;
	}
	svg_draw_code += `<use href="#svg-draw-${svg_draw_info.name}"/></svg>`;

	box.outerHTML = svg_draw_code;
}



window.addEventListener("load", function() {
	for (let svg_draw_box of document.querySelectorAll(`svg[draw="arrow"]`)) {
		f_svg_draw_arrow(svg_draw_box);
	}
});
