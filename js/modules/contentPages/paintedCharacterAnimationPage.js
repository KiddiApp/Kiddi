import Display from '../helperFunctions.js';
import paintedCharacterAnimation from '../playPaintedCharacterAnimationSceneObject.js';
import { StartScene, StopScene } from '../threejs_setup.js';
import paintSceneObject from '../paintSceneObject.js';

let paintedCharacterAnimation_content = {
	container: document.getElementById("threejs_canvas"),
	Show(callBack) {
		paintedCharacterAnimation.setActiveCharacterTexture(
			document.getElementById("paint2d").getContext('2d').canvas
		);
		Display(true, this.container);
		StartScene(paintedCharacterAnimation);
		paintedCharacterAnimation.playActiveCharacterAnimation(); 
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		StopScene();
		paintedCharacterAnimation.stopAndResetCharacterAnimation();
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default paintedCharacterAnimation_content;