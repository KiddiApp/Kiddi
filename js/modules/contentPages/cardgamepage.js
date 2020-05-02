import Display from '../helperFunctions.js';
import { StartScene, StopScene } from '../threejs_setup.js';
import cardGameSceneObject from '../cardGameSceneObject.js';

let cardgame_content = {
	container: document.getElementById("threejs_canvas"),
	Show(callBack) {
		Display(true, this.container);
		var scene = cardGameSceneObject;
		StartScene(scene);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		StopScene();
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default cardgame_content;