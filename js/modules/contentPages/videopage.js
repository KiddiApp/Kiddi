import Display from '../helperFunctions.js';
// import { StartScene, StopScene } from '../threejs_setup.js';
import characterAnimationSceneObject from '../characterAnimationSceneObject.js';

let video_content = {
	container: document.getElementById("video_container"),
	character_animation: document.getElementById("threejs_canvas"),
	video_element: document.getElementById("video_element"),
	video_source: document.getElementById("video_source"),
	scene: characterAnimationSceneObject,

	Show(callBack) {
		Display(true, this.container);
		// Display(true, this.character_animation);
		// StartScene(this.scene);
		// this.scene.play(function () {
			// StopScene();
			// Display(false, video_content.character_animation);
			
		// });

		if(callBack) callBack();
	}, 
	SetAndPlayVideoSource(source) { //TODO: change to use source
		this.video_source.setAttribute('src', 'Data/Videos/' + source + '.mp4'); //'example1.mp4'
		this.video_element.load();
		this.video_element.play();

	},
	StopVideo() {
		this.video_element.pause();
		this.video_element.currentTime = 0;
	},

	Hide(callBack) {
		this.StopVideo();
		// this.scene.stop();
		// StopScene();
		// Display(false, this.character_animation);
		Display(false, this.container);
		if(callBack) callBack();
	}
}

let videos = {
	color: 'vid_color',
	rio: 'vid_rio',
	vid5: 'vid_5',
	vid7: 'vid_7'
}

export { video_content, videos };
