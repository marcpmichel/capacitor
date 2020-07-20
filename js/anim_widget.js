
import Widget from './widget';

class AnimWidget extends Widget {

	build(parent) {
		this.parent = parent;
		this.el = document.createElement('canvas');
		this.el.style.position = 'absolute';
		this.el.style.top = '0px';
		this.el.style.left = '0px';
		this.el.style.width = '100vw';
		this.el.style.height = '100vh';
		this.el.width = Math.floor(window.innerWidth);
		this.el.height = Math.floor(window.innerHeight);
		this.el.style.zIndex = 0xFE;
		this.canvasCtx = this.el.getContext('2d');
		this.width = window.innerWidth; // this.el.width;
		this.height = window.innerHeight; // this.el.height;
		this.canvasCtx.scale(1, 1);
		this.canvasCtx.font = '3vmin sans';
		this.canvasCtx.textAlign = 'center';
		parent.appendChild(this.el);
		return this.el;
	}

	start(animClass=FadingBoxesAnim) {
		// log("AnimWidget start !");
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

export default AnimWidget;

