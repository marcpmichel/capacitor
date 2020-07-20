
class NoiseAnim {
	constructor(canvasCtx, width, height, opts={}) {
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
			this.canvasCtx.fillRect(x, y, 2, 2);
		}
	}
}

export default NoiseAnim;


