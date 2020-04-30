import Display from '../helperFunctions.js';

let answers_content = {
	container: document.getElementById("answers"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default answers_content;