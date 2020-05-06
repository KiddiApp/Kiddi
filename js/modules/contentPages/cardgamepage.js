import Display from '../helperFunctions.js';
import { StartScene, StopScene } from '../threejs_setup.js';
import cardGameSceneObject from '../cardGameSceneObject.js';

let cardgame_content = {
	container: document.getElementById("threejs_canvas"),
	scene: null,
	Show(callBack) {
		Display(true, this.container);
		this.scene = cardGameSceneObject;
		this.container.getElementsByTagName('canvas')[0].addEventListener('click', this.scene.interaction);
		StartScene(this.scene);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		this.container.getElementsByTagName('canvas')[0].removeEventListener('click', this.scene.interaction);
		this.scene = null;
		StopScene();
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default cardgame_content;