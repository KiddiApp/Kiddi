import { UpdateAppState } from '../updateAppState.js';
import Display from '../helperFunctions.js';
import { ShowPopup, HidePopup } from '../popup.js';
import EnableTracking from '../../webcam_ar_tracking.js';
import states from '../appStates.js';

let scan_content = {
	container: document.getElementById("scan_view"),
	scanning: document.getElementById("scanning"),
	found_page: document.getElementById("found_page"),
	scan_succes: document.getElementById("scan_succes"),
	scan_failure_timeout: null,
	Show(callBack) {
		Display(true, this.container);
		EnableTracking(true, false);
		ShowPopup("Some information about the scanning action", "this is some long subtitle with relevant and interesting information this is just a great read which this never ends", 0, 5, function() {
			EnableTracking(true, true);
			Display(true, scan_content.scanning);
			scan_content.scan_failure_timeout = setTimeout(function() {
				EnableTracking(true, false);
				Display(false, scan_content.scanning);
				// ShowPopup("We were not able to scan a page.", "Do you need help?", 2, 0, null);
			}, 180000)
		});
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		if(this.scan_failure_timeout) clearTimeout(this.scan_failure_timeout); 
		// HidePopup();
		Display(false, this.scanning);
		Display(false, this.scan_succes);
		Display(false, this.container);
		if(callBack) callBack();
	},
	ShowFoundPage(page_num) {
		if(this.scan_failure_timeout) clearTimeout(this.scan_failure_timeout); 
		EnableTracking(true, false);
		Display(false, this.scanning);
		this.found_page.innerHTML = page_num.toString();
		Display(true, this.scan_succes);
		setTimeout(function() { 			//TODO: CHECK IF THIS IS DESIRED OR THAT USER CLICKS TO CONFIRM
			switch (page_num) {
				case 1:
					UpdateAppState(states.Video);
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