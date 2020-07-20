
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

export default FadingBoxesAnim;

