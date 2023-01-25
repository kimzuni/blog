/*
 * © 2022 kimzuni <hello@kimzuni.com>
 * Create Date : 2022
 * Latest Date : 2023.01.13
 */



const svg_draw_star = {
	"name": "star",
	"viewBox": "0 0 56 53",
	"height": 53,
	"width": 56,
	"count": 0,
	"color": "var(--svg-draw-color, #5cc9ff)",
	"code": ""
}
svg_draw_star.code = `
	<path id="svg-draw-${svg_draw_star.name}-p" d="m 28,0 -11,25 11,9 11,-9 z" stroke="none"/>
	<use href="#svg-draw-${svg_draw_star.name}-p" transform="rotate(72)" transform-origin="28 29"/>
	<use href="#svg-draw-${svg_draw_star.name}-p" transform="rotate(144)" transform-origin="28 29"/>
	<use href="#svg-draw-${svg_draw_star.name}-p" transform="rotate(216)" transform-origin="28 29"/>
	<use href="#svg-draw-${svg_draw_star.name}-p" transform="rotate(288)" transform-origin="28 29"/>
`;



const f_svg_draw_star = function(box) {
	svg_draw_star.count++;
	const svg_draw_info = svg_draw_star;

	let svg_draw_code = `<svg viewBox="${svg_draw_info.viewBox}" draw="${svg_draw_info.name}" fill="${svg_draw_info.color}">`;
	if (svg_draw_info.count == 1) {
		svg_draw_code += `<symbol id="svg-draw-${svg_draw_info.name}">${svg_draw_info.code}</symbol>`;
	}
	svg_draw_code += `<use href="#svg-draw-${svg_draw_info.name}"/></svg>`;

	box.outerHTML = svg_draw_code;
}



window.addEventListener("load", function() {
	for (let svg_draw_box of document.querySelectorAll('svg[draw="star"]')) {
		f_svg_draw_star(svg_draw_box);
	}
});
