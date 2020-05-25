import Display from '../helperFunctions.js';
import paintSceneObject from '../paintSceneObject.js';
import { UpdateAppState } from '../updateAppState.js';
import states from '../appStates.js';
import { ShowPopup, HidePopup } from '../popup.js';

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
		} else {
			var scaled = window.innerWidth * 1.2549019608;
			this.canvas.setAttribute('width', scaled);
			this.canvas.setAttribute('height', scaled);
		}

		paintSceneObject.setRect();
	},

	Show(callBack) {
		Display(true, this.container);
		ShowPopup(2, null, "!Pinta con el dedo por encima!");
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		HidePopup();
		if(callBack) callBack();
	}
}

painting_content.Init();

export default painting_content;