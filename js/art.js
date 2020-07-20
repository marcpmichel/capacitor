import NoiseAnim from './anims/noise_anim.js';
import FadingBoxesAnim from './anims/fading_boxes_anim.js';
import ColorCycleAnim from './anims/color_cycle_anim.js';
import MosaicAnim from './anims/mosaic_anim.js';
import FallingWordsAnim from './anims/falling_words_anim.js';
import BouncingSymbolsAnim from './anims/bouncing_symbols_anim.js';
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import AnimWidget from './anim_widget';
const { Device } = Plugins;
const { Toast } = Plugins;
const { SplashScreen } = Plugins;


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

const DeviceInfo = {
	init() {
		try {
		var getInfo = Device.getInfo();
		getInfo.then((res) => {
				DeviceInfo.data = res;
				// xlog("Got device info");
				// xlog(JSON.stringify(res));
				DeviceInfo.show();
				});
			getInfo.catch((e) => {
				// xlog("Error getting device info : " + JSON.stringify(e));
			});
		}
		catch (e) {
			console.error("No Device object ?!");
		}
	},

	show() {
		var el = document.createElement('div');
		el.style.position = 'absolute';
		el.style.zIndex = 65535;
		el.style.left = '25vw';
		el.style.width = '25vw';
		el.style.backgroundColor = 'rgba(0,0,0,0.8)';
		el.style.color = 'blue';
		el.style.border = '1px solid green';
	
		document.body.appendChild(el);
		DeviceInfo.el = el;

		var title = document.createElement('div');
		title.style.color = 'green';
		title.innerHTML = 'DeviceInfo :';
		document.body.appendChild(title);

		for(var e in DeviceInfo.data) {
			var item = document.createElement('div');
			item.style.color = 'green';
			item.innerHTML = `${e} : ${DeviceInfo.data[e]}`;
			el.appendChild(item);
		}
	},

	move() {
		const x = Math.floor(Math.random()*75);
		const y = Math.floor(Math.random()*75);
		DeviceInfo.el.style.left = `${x}vw`;
		DeviceInfo.el.style.top = `${y}vh`;
	}
};


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
		   SplashScreen.hide();
		   DeviceInfo.init();
			
		   App.startAnim();
	   }
	   catch(e) {
		   fatal(e);
		}
	},

	startAnim() {
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

		   const animTypes = [ MosaicAnim, NoiseAnim, FadingBoxesAnim, ColorCycleAnim, BouncingSymbolsAnim, FallingWordsAnim ];
		   // const animTypes = [ FallingWordsAnim ];

		   setInterval(() => {
		   	   var prevAnimNum = animNum;
			   var animNum = Math.floor(Math.random()*animTypes.length);
			   var animType = animTypes[animNum];
			   console.log(animType);
			   if(prevAnimNum != animNum) {
				   anim.setAnim(animType);
				   // Toast.show({text: animType.constructor.name});
			   }
		   }, 10000);

		  setInterval(() => {
			DeviceInfo.move();
		  }, 5000);
	}
};

// App.initialize();
window.onload = App.start;

// vim: ts=4:sw=4
