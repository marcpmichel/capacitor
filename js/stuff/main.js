
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
const { Toast } = Plugins;

function xlog(text) {
	var el = document.createElement('div');
	el.style.color = 'black';
	el.innerHTML = text;
	document.body.appendChild(el);
}

window.onload = function() {
	var el = document.createElement('div');
	el.style.color = 'red';
	el.style.fontSize = '8vmin';
	el.innerHTML = "Hello Capacitor !";

	document.body.appendChild(el);

	if(!Capacitor) {
		xlog("No capacitor");
	}
	else {
		xlog("Capacitor available");
		xlog(JSON.stringify(Capacitor.Plugins));
		if(Capacitor && Capacitor.isPluginAvailable('Device')) {
			xlog("Plugin device available");
			try {
				var getInfo = Device.getInfo();
				getInfo.then((res) => {
					xlog("Got device info");
					xlog(JSON.stringify(res));
				});
				getInfo.catch((e) => {
					xlog("Error getting device info : " + JSON.stringify(e));
				});
			}
			catch(e) {
				xlog("Crash : " + e.message);
			}
		}
		else {
			xlog("Plugin device unavailable");
		}

		Toast.show({text: "Loaded !"});
	}
}


/*

if(Capacitor && Capacitor.isPluginAvailable('Device')) {
	try {
		var DevicePlugin = Capacitor.Plugins.Device;
		var infoEl = document.createElement('div');
		var getInfo = DevicePlugin.getInfo();
		getInfo.then(() => {
			infoEl.style.color = 'blue';
			infoEl.innerHTML = JSON.stringify(info);
		})
		getInfo.catch((e) => {
			infoEl.style.color = 'red';
			infoEl.innerHTML = 'Error : ' + ((e&&e.message) || e);
		});
		document.body.appendChild(infoEl);
	}
	catch(e) {
		xlog("crash :" + e.message;
	}
}
else {
	xlog("No plugin ?");
}

*/

/*
import { Capacitor, Plugins } from '@capacitor/core';

const { Device } = Plugins;


function xlog(text) {
	const el = document.createElement('div');
	el.style.color = 'black';
	el.innerHTML = text;
	document.body.appendChild(el);
}


window.onload = function() {
	xlog("Hello");
	xlog(`res:  ${window.innerWidth} x ${window.innerHeight}`);
	if(Capacitor && Capacitor.isPluginAvailable('Device')) {
		const infoEl = document.createElement('div');
		const getInfo = Device.getInfo();
		getInfo.then(() => {
			infoEl.style.color = 'blue';
			infoEl.innerHTML = JSON.stringify(info);
		})
		getInfo.catch((e) => {
			infoEl.style.color = 'red';
			infoEl.innerHTML = 'Error : ' + ((e&&e.message) || e);
		});
		document.body.appendChild(infoEl);
	}
}
*/


/*
const info = await Device.getInfo();

const res = `<div style="color: black;">${JSON.stringify(info)}</div>`;

window.document.write(res);

*/
