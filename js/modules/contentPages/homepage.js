import Display from '../helperFunctions.js';

let homepage_content = {
	container: document.getElementById("home_view"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	},
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default homepage_content;