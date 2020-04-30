import Display from '../helperFunctions.js';

let instructions_content = {
	container: document.getElementById("instructions_view"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default instructions_content;