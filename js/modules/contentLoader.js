import Display from './helperFunctions.js';
import { ShowPopup, HidePopup } from './popup.js';

let loadingManager = {

	loadingOverlay: document.getElementById("loading_overlay"),
	toBeLoadedObjectsCount: 8,
	loadedObjectsCount: 0,

	objectHasBeenLoaded: function() { 
		this.loadedObjectsCount++;

		// console.log("AN OTHER OBJECT HAS BEEN LOADED " + this.loadedObjectsCount);
		if(this.loadedObjectsCount >= this.toBeLoadedObjectsCount) {
			// console.log("ALL OBJECTS HAVE BEEN LOADED");
			this.loadingComplete();
		}
	},

	loadingComplete: function() {
		HidePopup();
		Display(false, this.loadingOverlay);
	}
}

export { loadingManager };