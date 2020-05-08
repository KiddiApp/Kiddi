import Display from '../helperFunctions.js';
import paintedCharacterAnimation from '../playPaintedCharacterAnimationSceneObject.js';
import { StartScene, StopScene } from '../threejs_setup.js';

let paintedCharacterAnimation_content = {
	container: document.getElementById("threejs_canvas"),
	paintedTexutre: document.getElementById("paint2d").getContext('2d').canvas,
	Show(callBack) {
		Display(true, this.container);
		StartScene(paintedCharacterAnimation);
		// BELOW TWO LINES POINT TO ERROR IN paintedcharacterAnimation
		paintedCharacterAnimation.setActiveCharacterTexture(this.paintedTexutre);
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