import { UpdateAppState } from '../updateAppState.js';
import Display from '../helperFunctions.js';
import { ShowPopup, HidePopup } from '../popup.js';
import EnableTracking from '../../webcam_ar_tracking.js';
import states from '../appStates.js';
import {clouds, clouds_manager } from '../clouds_manager.js';
import { video_content } from './videopage.js';

let scan_content = {
	container: document.getElementById("scan_view"),
	scanning: document.getElementById("scanning"),
	found_page: document.getElementById("found_page_text"),
	scan_succes: document.getElementById("scan_succes"),
	scan_failure_timeout: null,
	Show(callBack) {
		Display(true, this.container);
		EnableTracking(true, false);
		clouds_manager.hideClouds(clouds.top_left, clouds.top_right, clouds.mid_left, clouds.mid_right, clouds.bottom_center);
		ShowPopup(1, "!Enfoca el libro con la cámara!", "Some smart sub explaining you what to do and how to react on the results you get.", 1, function() {
			EnableTracking(true, true);
			Display(true, scan_content.scanning);
			scan_content.scan_failure_timeout = setTimeout(function() {
				clearTimeout(scan_content.scan_failure_timeout);
				EnableTracking(true, false);
				Display(false, scan_content.scanning);
				ShowPopup(1, null, "We were not able to scan a page. Do you need help?", 2, null);
			}, 180000)
		});
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		if(this.scan_failure_timeout) clearTimeout(this.scan_failure_timeout); 
		HidePopup();
		Display(false, this.scanning);
		Display(false, this.scan_succes);
		Display(false, this.container);
		EnableTracking(false, false);
		if(callBack) callBack();
	},
	ShowFoundPage(page_num, optionalData) {
		if(this.scan_failure_timeout) clearTimeout(this.scan_failure_timeout); 
		EnableTracking(true, false);
		Display(false, this.scanning);
		this.found_page.innerHTML = ("Página " + page_num.toString());
		Display(true, this.scan_succes);
		setTimeout(function() { 			//TODO: CHECK IF THIS IS DESIRED OR THAT USER CLICKS TO CONFIRM
			switch (page_num) {
				case 1:
					UpdateAppState(states.Video);
					if(optionalData != null) video_content.SetAndPlayVideoSource(optionalData);
					break;
				case 2:
					UpdateAppState(states.CardGame);
					break;
				case 3:
					UpdateAppState(states.PaintingCharacterSelection);
					break;
				case 17:
					UpdateAppState(states.Information);
					break;
			}
		}, 1000);
	}
}

export default scan_content;