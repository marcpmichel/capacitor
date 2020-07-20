
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

export default BouncingSymbolsAnim;

