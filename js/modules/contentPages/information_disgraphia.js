import Display from "../helperFunctions.js";

let information_disgraphia_content = {
	
	container: document.getElementById("information_content_2"),
	
	Show(callback) {
		Display(true, this.container);
		if(callback) callback();
	},

	Hide(callback) {
		Display(false, this.container);
		if(callback) callback();
	}
}

export { information_disgraphia_content };