import Display from "../helperFunctions.js";

let information_summary_content = {
	
	container: document.getElementById("information_content_3"),
	Show(callback) {
		Display(true, this.container);
		if(callback) callback();
	},

	Hide(callback) {
		Display(false, this.container);
		if(callback) callback();
	}
}

export { information_summary_content };