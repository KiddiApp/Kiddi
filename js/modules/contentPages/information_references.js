import Display from "../helperFunctions.js";
let information_references_content = {
	
	container: document.getElementById("information_content_4"),
	Show(callback) {
		Display(true, this.container);
		if(callback) callback();
	},

	Hide(callback) {
		Display(false, this.container);
		if(callback) callback();
	}
}

export { information_references_content };