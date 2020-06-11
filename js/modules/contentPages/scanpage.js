import { UpdateAppState } from '../updateAppState.js';
import Display from '../helperFunctions.js';
import { ShowPopup, HidePopup } from '../popup.js';
import EnableTracking from '../../webcam_ar_tracking.js';
import states from '../appStates.js';
import {clouds, clouds_manager } from '../clouds_manager.js';
import { video_content } from './videopage.js';

let scan_content = {
	container: document.getElementById("scan_view"),
	scanning: document.getElementsByClassName("scanning"),
	found_page: document.getElementById("found_page_text"),
	scan_succes: document.getElementById("scan_succes"),
	Show(callBack) {
		Display(true, this.container);
		EnableTracking(true, false);
		clouds_manager.hideClouds(clouds.top_left, clouds.top_right, clouds.mid_left, clouds.mid_right, clouds.bottom_center);
		ShowPopup(1, "¡Enfoca el libro con la cámara!", 'Apunta al ícono <img id="scan-phone-icon" src="Data/Frontend/Images/General/phone-icon.png"> y descubre la sorpresa escondida en esta página.', 1, function() {
			EnableTracking(true, true);
			scan_content.DisplayScanBanner(true);
			scanfailtimeout = setTimeout(function() {
				clearTimeout(scanfailtimeout);
				EnableTracking(true, false);
				scan_content.DisplayScanBanner(false);
				ShowPopup(1, null, "You were not able to scan a page do you need help?", 2, null);
			}, scanfailpopupdelay)
		});
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		if(scanfailtimeout) {
			clearTimeout(scanfailtimeout); 
		}
		HidePopup();
		this.DisplayScanBanner(false);
		Display(false, this.scan_succes);
		Display(false, this.container);
		EnableTracking(false, false);
		if(callBack) callBack();
	},
	
	DisplayScanBanner(show) {
		for (let i = 0; i < this.scanning.length; i++) {
			const element = this.scanning[i];
			Display(show, element);
		}
	}, 

	ShowFoundPage(page_num, optionalData) {
		if(scanfailtimeout) clearTimeout(scanfailtimeout); 
		EnableTracking(true, false);
		this.DisplayScanBanner(false);
		this.found_page.innerHTML = ("Página " + page_num.toString());
		Display(true, this.scan_succes);
		setTimeout(function() { 
			switch (page_num) {
				case 1:
				case 2:
				case 5:
				case 7:
				case 14:
					UpdateAppState(states.Video);
					if(optionalData != null) video_content.SetAndPlayVideoSource(optionalData);
					break;
				case 11:
					UpdateAppState(states.CardGame);
					break;
				case 17:
					UpdateAppState(states.PaintingCharacterSelection);
					break;
				case 18:
					UpdateAppState(states.Answers);
					break;
				case 21:
					UpdateAppState(states.Information);
					break;
			}
		}, 1000);
	}
}

export { scan_content };