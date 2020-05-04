import Display from '../helperFunctions.js';
import paintSceneObject from '../paintSceneObject.js';

let painting_content = {
	container: document.getElementById("paint_canvas"),
	confirm: document.getElementById("confirm_painting"),
	clear: document.getElementById("clear_painting"),
	Init() {
		this.confirm.addEventListener('click', function() {
			return; //TODO: do the animation stuff here. 
		});
		this.clear.addEventListener('click', function() {
			paintSceneObject.clearCanvas();
		});
	},
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

painting_content.Init();

export default painting_content;