import Display from '../helperFunctions.js';
import { StartScene, StopScene } from '../threejs_setup.js';
import characterAnimationSceneObject from '../characterAnimationSceneObject.js';

let video_content = {
	container: document.getElementById("video_container"),
	character_animation: document.getElementById("threejs_canvas"),
	video_element: document.getElementById("video_element"),
	video_source: document.getElementById("video_source"),
	Show(callBack) {
		Display(true, this.character_animation);
		var scene = characterAnimationSceneObject;
		scene.play(function () {
			StopScene();
			Display(false, video_content.character_animation);
			video_content.SetAndPlayVideoSource();
			Display(true, video_content.container);
		});
		StartScene(scene);

		if(callBack) callBack();
	}, 
	SetAndPlayVideoSource(source) { //TODO: change to use source
		this.video_source.setAttribute('src', 'Data/Videos/example1.mp4');
		this.video_element.load();
		this.video_element.play();

	},
	StopVideo() {
		this.video_element.pause();
		this.video_element.currentTime = 0;
	},

	Hide(callBack) {
		this.StopVideo();
		StopScene();
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default video_content;
