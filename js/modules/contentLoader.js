import Display from './helperFunctions.js';

let loadingManager = {

	loadingOverlay: document.getElementById("loading_overlay"),
	toBeLoadedObjectsCount: 6,
	loadedObjectsCount: 0,

	objectHasBeenLoaded: function() { 
		this.loadedObjectsCount++;

		console.log("AN OTHER OBJECT HAS BEEN LOADED " + this.loadedObjectsCount);
		if(this.loadedObjectsCount >= this.toBeLoadedObjectsCount) {
			console.log("ALL OBJECTS HAVE BEEN LOADED");
			this.loadingComplete();
		}
	},

	loadingComplete: function() {
		Display(false, this.loadingOverlay);
	}
}

export { loadingManager };