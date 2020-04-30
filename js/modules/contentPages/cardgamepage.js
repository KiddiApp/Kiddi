import Display from '../helperFunctions.js';

let cardgame_content = {
	container: document.getElementById("threejs_canvas"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default cardgame_content;