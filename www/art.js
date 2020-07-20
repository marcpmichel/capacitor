
function fatal(e) {
	var errel = document.createElement('div');
	errel.style.color = 'red';
	errel.style.fontSize = '4vh';
	errel.style.zIndex = 65535;
	errel.innerHTML = (e && e.message) || JSON.stringify(e);
	document.body.appendChild(errel);
}

function log(e) {
	var errel = document.createElement('div');
	errel.style.color = 'blue';
	errel.style.fontSize = '2vh';
	errel.style.zIndex = 65535;
	errel.innerHTML = (e && e.message) || JSON.stringify(e);
	document.body.appendChild(errel);
}

window.onerror = fatal;

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

class NoiseAnim {
	constructor(canvasCtx, width, height, opts={}) {
		log("New NoiseAnim");
		this.canvasCtx = canvasCtx;
		this.width = width;
		this.height = height;
		this.count = 500;
	}
	update() {
		for(var i=0; i<this.count; i++) {
			const x = Math.floor(Math.random() * this.width);
			const y = Math.floor(Math.random() * this.height);

			this.canvasCtx.fillStyle = '#FFFFFF';
			this.canvasCtx.fillRect(x, y, 1, 1);
		}
	}
}


class FadingBoxesAnim {

	constructor(canvasCtx, width, height, opts={}) {
		this.canvasCtx = canvasCtx;
		this.width = width;
		this.height = height;
		this.setup(opts);
	}

	setup(opts) {
		this.rows = 16;
		this.cols = 9;
		this.squareCount = this.rows * this.cols;
		this.squareWidth = this.width / this.rows;
		this.squareHeight = this.height / this.cols;
		this.selected = new Array();
	}

	update() {
		var x, y;
		if(this.selected.length < this.squareCount/3 && Math.random() > 0.95) {
			this.selected.push({a: 0, x: 0, y: 0});
		}

		for(var k=0; k<this.selected.length; k++) {

			if(!(this.selected[k].a)) {
				let found;
				do {
					found = false;
					y = Math.floor(Math.random()*this.cols);
					x = Math.floor(Math.random()*this.rows);
					for(var l=0; l<this.selected.length; l++) {
						if(this.selected[l].x == x && this.selected[l].y == y) found=true;
					}
				} while(found);

				this.selected[k] = { a: 0, x: x, y: y };
			}

			this.selected[k].a = (this.selected[k].a + 1) % 180;
			var aa = this.selected[k].a * Math.PI / 180.0;
			var v = Math.floor(0 + Math.sin(aa) * 32);
			var h = `00${Number(v).toString(16)}`.slice(-2);
			var col = `#${h}${h}${h}`;
			var i = this.selected[k].x * this.squareWidth;
			var j = this.selected[k].y * this.squareHeight;

			this.canvasCtx.fillStyle = col;
			this.canvasCtx.fillRect(i, j, this.squareWidth, this.squareHeight);
		}
	}
}


class BouncingSymbolsAnim {
	constructor(canvasCtx, width, height, opts={}) {
		this.canvasCtx = canvasCtx;
		this.width = width;
		this.height = height;
		this.setup(opts);
	}
	setup() {
		this.angle = 0;
	}
	update() {
		this.angle += 0.1;
		if(this.angle > 2*Math.PI) this.angle = 2*Math.PI - this.angle;
		const half = this.height / 2;
		const d = this.height / 5;
		const gap = this.width / 4;
		let y = half + Math.sin(this.angle) * this.height / 6;

		this.canvasCtx.fillStyle = '#0019E6' // 'blue';
		this.canvasCtx.fillRect(1*gap-d/2, y-d/2, d, d);

		this.canvasCtx.fillStyle = '#FFAB12'; // 'yellow';
		y = half + Math.sin(this.angle + Math.PI / 4.0) * this.height / 6;
		this.canvasCtx.beginPath(); 
		this.canvasCtx.moveTo(2*gap-d/2, y + d/2); 
		this.canvasCtx.lineTo(2*gap,     y - d/2);
		this.canvasCtx.lineTo(2*gap+d/2, y + d/2);
		this.canvasCtx.stroke();
		this.canvasCtx.fill();

		this.canvasCtx.fillStyle = '#D90000'; // 'red';
		y = half + Math.sin(this.angle + Math.PI / 2.0) * this.height / 6;
		this.canvasCtx.beginPath();
		this.canvasCtx.arc(3*gap, y, d/2, 0, Math.PI * 2);
		this.canvasCtx.closePath();
		this.canvasCtx.fill();
	}
}

class MosaicAnim {
	constructor(canvasCtx, width, height, opts={}) {
		this.canvasCtx = canvasCtx;
		this.width = width;
		this.height = height;
		this.setup(opts);
		this.do_not_clear = true;
	}
	setup() {
		this.frameNum = 0;
		this.palettes = [
			["ef476f", "ffd166", "06d6a0", "118ab2", "073b4c"],
			["007f5f", "2b9348", "55a630", "80b918", "aacc00", "bfd200", "d4d700", "dddf00", "eeef20", "ffff3f"],
			["ffac81", "ff928b", "fec3a6", "efe9ae", "cdeac0"],
			["f94144", "f3722c", "f8961e", "f9c74f", "90be6d", "43aa8b", "577590"]
		];
		this.changePalette();
	}
	changePalette() {
		const paletteNum = Math.floor(Math.random() * this.palettes.length);
		this.colors = this.palettes[paletteNum];
	}
	update() {
		this.frameNum++;
		if(this.frameNum % 60 == 0) {
			const w = Math.floor(this.width / 10);
			const h = Math.floor(this.height / 10);

			for(var x=0; x<10; x++) {
				for(var y=0; y<10; y++) {
					const color = this.colors[Math.floor(Math.random()*this.colors.length)];
					this.canvasCtx.strokeStyle = 'black';
					this.canvasCtx.fillStyle = `#${color}`;
					this.canvasCtx.fillRect(x*w,y*h,w,h);
					this.canvasCtx.strokeRect(x*w,y*h,w,h);
				}
			}
		}

		if(this.frameNum % 600 == 0) {
			this.changePalette();
		}
	}
}

class Widget {

	constructor(parent, opts={}) {
		this.opts = opts;
		this.build(parent);
		this._visible = true;
		if(opts.startHidden) { this.hide(); }
	}

	build(parent) {
		this.el = document.createElement('div');
		this.el.style.color = 'black';
		this.el.style.backgroundColor = 'cyan';
		this.el.innerHTML = 'Base Widget';
		this.parent = parent;
		parent.appendChild(this.el);
	}

	isVisible() {
		return this._visible;
	}

	isHidden() {
		return !this._visible;
	}

	show() {
		if(this.el.classList.contains('hidden')) {
			this.el.classList.remove('hidden');
		}
		if(this.el.classList.contains('visible')) return;
		this.el.classList.add('visible');
		this._visible = true;
		this.onShowCallback && this.onShowCallback();
	}

	hide() {
		if(this.el.classList.contains('visible')) {
			this.el.classList.remove('visible');
		}
		if(this.el.classList.contains('hidden')) return;
		this.el.classList.add('hidden');
		this._visible = false;
		this.onHideCallback && this.onHideCallback();
	}

	toggle() {
		this.el.classList.contains('hidden') ? this.show() : this.hide();
	}

	onShow(cb) {
		this.onShowCallback = cb;
	}

	onHide(cb) {
		this.onHideCallback = cb;
	}

	_createElement(type, style={}) {
		const el = document.createElement(type);
		for(var attr in style) {
			el.style[attr] = style[attr];
		}
		return el;
	}
}


class AnimWidget extends Widget {

	build(parent) {
		this.parent = parent;
		this.el = document.createElement('canvas');
		this.el.style.position = 'absolute';
		this.el.style.top = '0px';
		this.el.style.left = '0px';
		this.el.style.width = '100vw';
		this.el.style.height = '100vh';
		this.el.width = Math.floor(window.innerWidth / 2);
		this.el.height = Math.floor(window.innerHeight / 2);
		this.el.style.zIndex = 0xFE;
		this.canvasCtx = this.el.getContext('2d');
		this.width = window.innerWidth; // this.el.width;
		this.height = window.innerHeight; // this.el.height;
		this.canvasCtx.scale(1, 1);
		this.canvasCtx.font = '3vmin sans';
		this.canvasCtx.textAlign = 'center';
		log("AnimWidget built !");
		parent.appendChild(this.el);
		return this.el;
	}

	start(animClass=FadingBoxesAnim) {
		log("AnimWidget start !");
		try {
			this.animFrameId && cancelAnimationFrame(this.animFrameId);
			this.setAnim(animClass);
			this.show();
			this.updateFn = this.update.bind(this);
			this.animFrameId = requestAnimationFrame(this.updateFn);
		}
		catch(e) {
			console.error(e);
			fatal(e);
		}
	}

	stop() {
		this.animFrameId && cancelAnimationFrame(this.animFrameId);
		this.hide();
	}

	update() {
		const do_clear = !this.anim.do_not_clear;
		if(do_clear) this.canvasCtx.clearRect(0, 0, this.width, this.height);
		this.anim.update();
		this.animFrameId = requestAnimationFrame(this.updateFn);
	}

	setAnim(animClass) {
		this.anim = new animClass(this.canvasCtx, this.width, this.height);
	}

}


var App = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.start('deviceready');
    },

    // Update DOM on a Received Event
    start: function(id) {
	    log("Start !");
	    try { 
		    const el = document.createElement('div');
		    el.style.background = 'black';
		    el.style.position = 'absolute';
		    el.style.width = '100vw';
		    el.style.height = '100vh';
		    el.style.top = '0vh';
		    el.style.left = '0vw';
		    document.body.appendChild(el);
		    const anim = new AnimWidget(el);
		    // const anim = new AnimWidget(document.body);
		    anim.start(MosaicAnim);

		    const animTypes = [ MosaicAnim, NoiseAnim, FadingBoxesAnim, ColorCycleAnim ];
		    let prevAnim = MosaicAnim;
		    setInterval(() => {
			    var animType = animTypes[Math.floor(Math.random()*animTypes.length)];
			    console.log(animType);
			    if(prevAnim != animType) {
				    anim.setAnim(animType);
			    }
		    }, 10000);
	    }
	    catch(e) {
		    fatal(e);
	    }
    }
};

// App.initialize();
window.onload = App.start;
