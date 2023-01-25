/*
 * © 2022 kimzuni <hello@kimzuni.com>
 * Create Date : 2022
 * Latest Date : 2023.01.13
 */



const svg_draw_tag = {
	"name": "tag",
	"viewBox": "0 0 54 64",
	"height": 64,
	"width": 54,
	"count": 0,
	"color": "var(--svg-draw-color, #5cc9ff)",
	"code": ""
}
svg_draw_tag.code = `
	<g stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round">
		<path id="svg-draw-${svg_draw_tag.name}-p1" d="m 17,3 v 58" transform-origin="22 32" transform="rotate(11)"/>
		<use href="#svg-draw-${svg_draw_tag.name}-p1" transform="translate(20 0)"/>
		<path id="svg-draw-${svg_draw_tag.name}-p2" d="m 3,20 h 48"/>
		<use href="#svg-draw-${svg_draw_tag.name}-p2" transform="translate(0 24)"/>
	</g>
`;



const f_svg_draw_tag = function(box) {
	svg_draw_tag.count++;
	const svg_draw_info = svg_draw_tag;

	let svg_draw_code = `<svg viewBox="${svg_draw_info.viewBox}" draw="${svg_draw_info.name}" stroke="${svg_draw_info.color}">`;
	if (svg_draw_info.count == 1) {
		svg_draw_code += `<symbol id="svg-draw-${svg_draw_info.name}">${svg_draw_info.code}</symbol>`;
	}
	svg_draw_code += `<use href="#svg-draw-${svg_draw_info.name}"/></svg>`;

	box.outerHTML = svg_draw_code;
}



window.addEventListener("load", function() {
	for (let svg_draw_box of document.querySelectorAll('svg[draw="tag"]')) {
		f_svg_draw_tag(svg_draw_box);
	}
});
