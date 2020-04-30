import Display from '../helperFunctions.js';

let video_content = {
	container: document.getElementById("video_container"),
	character_animation: document.getElementById("threejs_canvas"),
	Show(callBack) {
		Display(true, this.container);
		this.character_animation.classList.remove('hidden');
		updateThreejs = true;
		ThreeUpdateLoop();
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default video_content;