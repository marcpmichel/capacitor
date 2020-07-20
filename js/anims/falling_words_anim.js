
class FallingWordsAnim {

	constructor(canvasCtx, width, height, opts) {
		this.canvasCtx = canvasCtx;
		this.width = width;
		this.height = height;
		this.entities = [];

		this.letters = {
			"a": [ 0,0, 1,0, 2,0, 0,1, 2,1, 0,2, 1,2, 2,2, 0,3, 2,3, 0,4, 2,4 ],
			"b": [ ],
			"c": [ ],
			"d": [ ],
			"e": [ ],
			"f": [ ],
			"g": [ 0,0, 1,0, 2,0, 0,1, 0,2, 1,2, 2,2, 0,3, 2,3, 0,4, 1,4, 2,4 ],
			"h": [ 0,0, 2,0, 0,1, 2,1, 0,2, 1,2, 2,2, 0,3, 2,3, 0,4, 2,4 ],
			"i": [ 1,0, 1,1, 1,2, 1,3, 1,4 ],
			"j": [],
			"k": [],
			"l": [ 0,0, 0,1, 0,2, 0,3, 0,4, 1,4, 2,4 ],
			"m": [],
			"n": [ 0,0, 2,0, 0,1, 1,1, 2,1, 0,2, 1,2, 2,2, 0,3, 1,3, 2,3, 0,4, 2,4 ],
			"o": [ 0,0, 1,0, 2,0, 0,1, 2,1, 0,2, 2,2, 0,3, 2,3, 0,4, 1,4, 2,4 ],
			"p": [ 0,0, 1,0, 2,0, 0,1, 2,1, 0,2, 1,2, 2,2, 0,3, 0,4 ],
			"q": [],
			"r": [],
			"s": [],
			"t": [0,0, 1,0, 2,0, 1,1, 1,2, 1,3, 1,4 ],
			"u": [],
			"v": [],
			"w": [],
			"x": [],
			"y": [ 0,0, 2,0, 0,1, 2,1, 1,2, 1,3, 1,4 ],
			"z": []
		};

		this.bouncyness = 0.70
		this.gravity = 0.8;
		this.disabled_entities = 0;

		this.restart();
	}

	pre() {
		// this.canvasCtx.fillStyle = "white";
		// var xoffset = 0, yoffset = 0;

		var palettes = [
			["ef476f","ffd166","06d6a0","118ab2","073b4c"],
			["007f5f","2b9348","55a630","80b918","aacc00","bfd200","d4d700","dddf00","eeef20","ffff3f"],
			["ffac81","ff928b","fec3a6","efe9ae","cdeac0"],
			["f94144","f3722c","f8961e","f9c74f","90be6d","43aa8b","577590"]
		];

		var colors = palettes[Math.floor(Math.random()*palettes.length)];

		var self = this;
		function letter(o, x, y) {
			// var col = colors[Math.floor(Math.random()*colors.length)];
			for(var i=0;i<o.length; i+=2) {
				var col = "#"+colors[o[i+1]];
				self.canvasCtx.fillStyle = col;
				self.canvasCtx.fillRect(x + o[i]*10, y + o[i+1]*10, 10, 10);
				self.entities.push({
					x: x+o[i]*10, 
					y: y+o[i+1]*10, 
					w: 10, 
					h: 10, 
					color: col, 
					dx: Math.random()*10.0-5.0, 
					dy: Math.random()*10.0-5.0, 
					bounces: Math.floor(Math.random()*20+10),
					disabled: false
				});
			}
		}

		function wordAt(w, x, y) {
			for(var l=0;l<w.length;l++) {
				var c = w.charAt(l);
				var o = self.letters[c];
				letter(o, x, y);
				x += 40;
			}
		}

		wordAt("nothing", 0, 20);
		wordAt("to", 40, 100);
		wordAt("play", 80, 180);

	}

	restart() {
		this.disabled_entities=0;
		this.entities = [];
		this.pre();
	}

	update() {

		if(this.disabled_entities == this.entities.length)  {
			setTimeout(function() { this.restart(); }, 2000);
			return;
		}

		for(var i=0;i<this.entities.length;i++) {
			var e = this.entities[i];

			if(e.disabled) continue;

			if(e.y + e.h > this.height) {
				e.bounces -= 1;
				if(e.bounces < 0) {
					e.disabled = true;
					this.disabled_entities += 1;
				}
				else {
					e.y = this.height - e.h;
					e.dy = -e.dy;
					e.dy = e.dy * this.bouncyness;
				}
			}
			if(e.y < 0) {
				e.y = 0;
				e.dy = -e.dy;
				e.dy = e.dy * this.bouncyness;
			}

			if(e.y > (this.height-e.h*1.5)) {
				if(e.dy > -3 && e.dy < 3) {
					e.dy = (-Math.random()*15)-15;
					e.dx = Math.random()*10-10;
				}
			}

			e.dy = e.dy + this.gravity;
			e.y = e.y + e.dy;

			if(e.x + e.w > this.width) {
				e.x = this.width - e.w;
				e.dx = -e.dx;
			}

			if(e.x < 0) {
				e.dx = -e.dx;
				e.x = 0;
			}

			e.x = e.x + e.dx;

			this.canvasCtx.fillStyle = e.color;
			this.canvasCtx.fillRect(e.x,e.y,e.w,e.h);
		}

	}

}

export default FallingWordsAnim;
