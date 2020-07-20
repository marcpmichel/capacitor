function hslToRGB(hsl) {

	function normalize_rgb_value(color, m) {
		color = Math.floor((color + m) * 255);
		if (color < 0) { color = 0; }
		return color;
	}

	var h = hsl.h,
		s = hsl.s,
		l = hsl.l,
		c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs((h / 60) % 2 - 1)),
		m = l - c / 2,
		r, g, b;

	if (h < 60) { r = c; g = x; b = 0; }
	else if (h < 120) { r = x; g = c; b = 0; }
	else if (h < 180) { r = 0; g = c; b = x; }
	else if (h < 240) { r = 0; g = x; b = c; }
	else if (h < 300) { r = x; g = 0; b = c; }
	else { r = c; g = 0; b = x; }

	r = normalize_rgb_value(r, m);
	g = normalize_rgb_value(g, m);
	b = normalize_rgb_value(b, m);


	return { r: r, g: g, b: b };
}



class ColorCycleAnim {
	constructor(canvasCtx, width, height, opts={}) {
		this.canvasCtx = canvasCtx;
		this.width = width;
		this.height = height;
		this.setup(opts);
	}
	setup(opts) {
		this.a = 0;
	}
	update() {
		this.a = (this.a + 1) % 360;
		const col = hslToRGB({h: this.a, l: 0.5, s: 0.5});
		var rh = `00${Number(col.r).toString(16)}`.slice(-2);
		var rg = `00${Number(col.g).toString(16)}`.slice(-2);
		var rb = `00${Number(col.b).toString(16)}`.slice(-2);
		var hex = `#${rh}${rg}${rb}`;
		this.canvasCtx.fillStyle = hex;
		this.canvasCtx.fillRect(0, 0, this.width, this.height);
	}
}

export default ColorCycleAnim;

