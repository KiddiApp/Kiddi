import { ShowPopup, HidePopup } from './modules/popup.js';

let md = new MobileDetect(window.navigator.userAgent);

let appinfo = {
	isMobile: (md.mobile() == null) ? false : true,
	isTablet: (md.tablet() == null) ? false : true,
	hasRequiredCanvasFeatures: (Modernizr.canvas && Modernizr.webgl) ? true : false,
	hasUserMediaAndWebRTC: (Modernizr.getusermedia && Modernizr.datachannel && Modernizr.peerconnection) ? true : false,
	DeviceFeaturesSupported() {
		return (this.hasRequiredCanvasFeatures, this.hasUserMediaAndWebRTC) ? true : false;
	},
	DeviceSupportedAndCorrectScreenSize() {
		if(this.DeviceFeaturesSupported()) {
			if(this.isMobile) {
				if(window.innerWidth <= 600 && window.innerWidth < window.innerHeight) return { supported: true, orientationCorrect: true };
				else return { supported: true, orientationCorrect: false };
			}
			if(this.isTablet) {
				if(window.innerWidth <= 1400) return { supported: true, orientationCorrect: true };
				else return { supported: true, orientationCorrect: false };
			}
			else return { supported: false, orientationCorrect: false };
		} else {
			return { supported: false, orientationCorrect: null }
		}
	}
}

if(appinfo.isMobile) {
	if(Modernizr.deviceorientation) {
		window.addEventListener("orientationchange", function() {
			setTimeout(() => {
				SetInitInformation(appinfo.DeviceSupportedAndCorrectScreenSize());
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
			HidePopup();
		} else {
			ShowFullscreenOverlay();
			ShowPopup("Please view this website in Portrait mode", "Rotate your device", 0);
		}
	} else {
		ShowPopup("Sorry this browser doesn't support the Kiddi webapp", "Try opening it on a mobile device", 0);
	}
}

SetInitInformation(appinfo.DeviceSupportedAndCorrectScreenSize());