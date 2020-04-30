import Display from '../helperFunctions.js';

let information_content = {
	container: document.getElementById("information"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default information_content;