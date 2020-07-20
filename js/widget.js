
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

export default Widget;
