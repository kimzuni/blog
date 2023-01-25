/*
 * © 2022 kimzuni <hello@kimzuni.com>
 * Create Date : 2022
 * Latest Date : 2023.01.13
 */



const svg_draw_category = {
	"name": "category",
	"viewBox": "0 0 64 46",
	"height": 46,
	"width": 64,
	"count": 0,
	"color": "var(--svg-draw-color, #5cc9ff)",
	"code": ""
}
svg_draw_category.code = `
	<g id="svg-draw-${svg_draw_category.name}-g"><circle r="4" cx="4" cy="4" stroke="none"/><path d="m 16,4 h 44" fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
	<use href="#svg-draw-${svg_draw_category.name}-g" transform="translate(0 19)"/>
	<use href="#svg-draw-${svg_draw_category.name}-g" transform="translate(0 38)"/>
`;



const f_svg_draw_category = function(box) {
	svg_draw_category.count++;
	const svg_draw_info = svg_draw_category;

	let svg_draw_code = `<svg viewBox="${svg_draw_info.viewBox}" draw="${svg_draw_info.name}" fill="${svg_draw_info.color}" stroke="${svg_draw_info.color}">`;
	if (svg_draw_info.count == 1) {
		svg_draw_code += `<symbol id="svg-draw-${svg_draw_info.name}">${svg_draw_info.code}</symbol>`;
	}
	svg_draw_code += `<use href="#svg-draw-${svg_draw_info.name}"/></svg>`;

	box.outerHTML = svg_draw_code;
}



window.addEventListener("load", function() {
	for (let svg_draw_box of document.querySelectorAll(`svg[draw="category"]`)) {
		f_svg_draw_category(svg_draw_box);
	}
});
