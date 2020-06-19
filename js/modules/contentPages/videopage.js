import Display from '../helperFunctions.js';
// import { StartScene, StopScene } from '../threejs_setup.js';
import characterAnimationSceneObject from '../characterAnimationSceneObject.js';
import { UpdateAppState } from '../updateAppState.js';
import states from '../appStates.js';
import { ShowPopup, HidePopup } from '../popup.js';

let video_content = {
	container: document.getElementById("video_container"),
	character_animation: document.getElementById("threejs_canvas"),
	video_element: document.getElementById("video_element"),
	video_source: document.getElementById("video_source"),
	scene: characterAnimationSceneObject,

    init() {
        this.video_element.addEventListener('ended', function() {
            video_content.closeFullscreen(this);
            this.removeAttribute("controls");
            UpdateAppState(states.HomePage);
        }, false);
    },
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
	SetAndPlayVideoSource(source) { 
		this.video_source.setAttribute('src', 'Data/Videos/' + source + '.mp4');
        this.video_element.load();

        this.video_element.addEventListener('canplaythrough', function() {
            video_content.video_element.setAttribute("controls","controls");
            video_content.video_element.play();
            video_content.video_element.removeEventListener("canplaythrough");
        }, false);
	},
	StopVideo() {
		this.video_element.pause();
		this.video_element.currentTime = 0;
    },
    
    closeFullscreen(el) {
        console.log(el);
        if (el.exitFullscreen) {
            el.exitFullscreen();
        } else if (el.mozCancelFullScreen) { 
            el.mozCancelFullScreen();
        } else if (el.webkitExitFullscreen) { 
            el.webkitExitFullscreen();
        } else if (el.msExitFullscreen) {
            el.msExitFullscreen();
        }
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

video_content.init();

let videos = {
	color: 'kiddi_color',
	rio: 'kiddi_rio',
	vid5: 'kiddi_5',
	vid7: 'kiddi_7',
	edit: 'kiddi_edit'
}

export { video_content, videos };
