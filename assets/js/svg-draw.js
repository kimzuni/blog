svg_draw_list = [
	"category",
	"tag",
	"star",
	"copy",
	"arrow",
	"externalLink"
]

for (let name of svg_draw_list) {
	document.write(`<script type="text/javascript" src="/assets/js/svg-draw-${name}.js"></script>`);
}
