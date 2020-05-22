import Display from '../helperFunctions.js';
import paintSceneObject from '../paintSceneObject.js';
import { UpdateAppState } from '../updateAppState.js';
import states from '../appStates.js';

let painting_content = {
	container: document.getElementById("paint_canvas"),
	canvas: document.getElementById("paint2d"),
	confirm: document.getElementById("confirm_painting"),
	clear: document.getElementById("clear_painting"),
	Init() {
		this.confirm.addEventListener('click', function() {
			UpdateAppState(states.Painting3dAnimation);
		});
		this.clear.addEventListener('click', function() {
			paintSceneObject.clearCanvas();
		});
	},

	SetcanvasSize: function(gomba) {
		if(gomba) {
			this.canvas.setAttribute('width', window.innerWidth);
			this.canvas.setAttribute('height', window.innerWidth);
			this.canvas.style.top = ((window.innerHeight - window.innerWidth) / 2) + "px";
		} else {

		}
		
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