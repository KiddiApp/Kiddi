import { ShowPopup, HidePopup } from './modules/popup.js';
import { loadingManager } from './modules/contentLoader.js';
import { GetCurrentState } from './modules/updateAppState.js';
import states from './modules/appStates.js';

let md = new MobileDetect(window.navigator.userAgent);

let appinfo = {
	isMobile: (md.mobile() == null) ? false : true,
	isTablet: (md.tablet() == null) ? false : true,
	hasRequiredCssCapabilities: (Modernizr.cssgrid) ? true : false,
	hasRequiredCanvasFeatures: (Modernizr.canvas && Modernizr.webgl) ? true : false,
	hasUserMediaAndWebRTC: (Modernizr.getusermedia && Modernizr.peerconnection) ? true : false, //&& Modernizr.datachannel
	DeviceFeaturesSupported() {
		return (this.hasRequiredCssCapabilities && this.hasRequiredCanvasFeatures && this.hasUserMediaAndWebRTC) ? true : false;
	},
	DeviceSupportedAndCorrectScreenSize() {
		if(this.DeviceFeaturesSupported()) {
			console.log("Device supported");
			if(this.isTablet || (window.innerWidth > 600 && window.innerWidth < 1400)) {
				console.log("Is tablet");
				if(window.innerWidth <= 1400 && window.innerWidth < window.innerHeight) return { supported: true, orientationCorrect: true };
				else return { supported: true, orientationCorrect: false };
			}
			else if(this.isMobile) {
				console.log("Is mobile");
				if(window.innerWidth <= 600 && window.innerWidth < window.innerHeight) return { supported: true, orientationCorrect: true };
				else return { supported: true, orientationCorrect: false };
			}
			else return { supported: false, orientationCorrect: false };
		} else {
			return { supported: false, orientationCorrect: null }
		}
	}
}

if(appinfo.isMobile || appinfo.isTablet) {
	if(Modernizr.deviceorientation) {
		window.addEventListener("orientationchange", function() {
			setTimeout(() => {
                if(GetCurrentState() != states.Video) {
                    SetInitInformation(appinfo.DeviceSupportedAndCorrectScreenSize());
                    loadingManager.loadingComplete();
                }
			}, 200);
		}, false);
	}
}

let problem_overlay = document.getElementById("problem_overlay");

function ShowFullscreenOverlay() {
	problem_overlay.classList.remove("hidden");
}

function HideFullscreenOverlay() {
	problem_overlay.classList.add("hidden");
}

function SetInitInformation(deviceInformation) {

	if(deviceInformation.supported) {
		if(deviceInformation.orientationCorrect) {
			HideFullscreenOverlay();
			ShowPopup(1, "Espera unos segundos", "Se están cargando las aventuras que Kiddi World tiene preparadas para ti.", 0, null);
		} else {
			ShowFullscreenOverlay();
			ShowPopup(1, "Kiddi App no funciona horizontalmente", "Si intentas navegar de forma horizontal, por favor regresa tu dispositivo a posición vertical.", 1, () => {
				HidePopup();
			});
		}
	} else {
		ShowFullscreenOverlay();
		ShowPopup(1, "El navegador es incompatible", "Lo sentimos, parece que este dispositivo no soporta algunas tecnologías de Kiddi App. ¿Puedes intentar con otro?", 1, () => {
			HidePopup();
		});
	}
}

SetInitInformation(appinfo.DeviceSupportedAndCorrectScreenSize());
export { ShowFullscreenOverlay, SetInitInformation, appinfo };