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
let popup_container = document.getElementById("popup");
let popup_title = document.getElementById("popup_title");
let popup_subtitle = document.getElementById("popup_subtitle");
let popup_buttons_container = document.getElementById("popup_buttons_container");
let popup_confirm_ok = document.getElementById("confirm_ok");
let popup_confirm_yes_no = document.getElementById("yes_no_container");


function ShowPopup(title, subtitle, buttonCount) {
	popup_title.innerHTML = title;
	if(subtitle == null) {
		popup_subtitle.classList.add("hidden");
		popup_title.classList.remove("medium_popup_title");
		popup_title.classList.add("large_popup_title");
	} else {
		popup_subtitle.classList.remove("hidden");
		popup_subtitle.innerHTML = subtitle;
		popup_title.classList.remove("large_popup_title");
		popup_title.classList.add("medium_popup_title");
	}

	if(buttonCount > 0) {
		popup_buttons_container.classList.remove("hidden");
		if(buttonCount > 1) {
			popup_confirm_yes_no.classList.remove("hidden");
			popup_confirm_ok.classList.add("hidden");
		} else {
			popup_confirm_yes_no.classList.add("hidden");
			popup_confirm_ok.classList.remove("hidden");
		}
	} else {
		popup_buttons_container.classList.add("hidden");
	}

	popup_container.classList.remove("hidden");
}

function HidePopup() {
	popup_container.classList.add("hidden");
}

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