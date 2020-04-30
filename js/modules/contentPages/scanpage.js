import { UpdateAppState } from '../updateAppState.js';
import Display from '../helperFunctions.js';
import { ShowPopup, HidePopup } from '../popup.js';

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
			scan_content.scanning.classList.remove('hidden');
			scan_content.scan_failure_timeout = setTimeout(function() {
				EnableTracking(true, false);
				scan_content.scanning.classList.add('hidden');
				ShowPopup("We were not able to scan a page.", "Do you need help?", 2, 0, null);
			}, 180000)
		});
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		if(this.scan_failure_timeout) clearTimeout(this.scan_failure_timeout); 
		HidePopup();
		this.scanning.classList.add('hidden');
		this.scan_succes.classList.add('hidden');
		Display(false, this.container);
		if(callBack) callBack();
	},
	ShowFoundPage(page_num) {
		if(this.scan_failure_timeout) clearTimeout(this.scan_failure_timeout); 
		EnableTracking(true, false);
		this.scanning.classList.add('hidden');
		this.found_page.innerHTML = page_num.toString();
		this.scan_succes.classList.remove('hidden');
		setTimeout(function() { //TODO: CHECK IF THIS IS DESIRED OR THAT USER CLICKS TO CONFIRM
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