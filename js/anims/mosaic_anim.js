
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

export default MosaicAnim;

