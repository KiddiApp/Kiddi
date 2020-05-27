import Display from './helperFunctions.js';
import { HidePopup } from './popup.js';
import homepage_content from './contentPages/homepage.js';
import instructions_content from './contentPages/instructionspage.js';

let loadingManager = {

	loadingOverlay: document.getElementById("loading_overlay"),
	toBeLoadedObjectsCount: 7,
	loadedObjectsCount: 0,

	objectHasBeenLoaded: function() { 
		this.loadedObjectsCount++;

		if(this.loadedObjectsCount >= this.toBeLoadedObjectsCount) {
			this.loadingComplete();
		}
	},

	loadingComplete: function() {
		HidePopup();
		Display(false, this.loadingOverlay);
		homepage_content.IntroAnimation();
		instructions_content.AddAnimations();
	}
}

export { loadingManager };