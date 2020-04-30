import Display from '../helperFunctions.js';

let painting_content = {
	container: document.getElementById(""),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default painting_content;