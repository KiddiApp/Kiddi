import Display from '../helperFunctions.js';
import characterAnimationSceneObject from '../characterAnimationSceneObject.js';
import { UpdateAppState } from '../updateAppState.js';
import states from '../appStates.js';

let video_content = {
	container: document.getElementById("video_container"),
	character_animation: document.getElementById("threejs_canvas"),
	video_element: document.getElementById("video_element"),
	video_source: document.getElementById("video_source"),
	scene: characterAnimationSceneObject,

    init() {
        this.video_element.addEventListener('ended', function() {
            var vidEl = this;
            console.log("video ended");
            console.log("wait for 1.5 seconds");
            console.log("remove canplaythrough event");
            video_content.video_element.removeEventListener("canplaythrough", video_content.CanPlay, false);
            setTimeout(() => {
                console.log("close fullscreen");
                video_content.closeFullscreen(vidEl);
                console.log("remove controls");
                vidEl.removeAttribute("controls");
                console.log("go back to homepage");
                UpdateAppState(states.HomePage);
            }, 1500);
        }, false);
    },
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	SetAndPlayVideoSource(source) { 
        console.log("Set video source");
		this.video_source.setAttribute('src', 'Data/Videos/' + source + '.mp4');
        this.video_element.load();

        console.log("add canplaythrough event");
        this.video_element.addEventListener('canplaythrough', this.CanPlay, false);
    },
    CanPlay() {
        console.log("PLAY VIDEO");
        console.log("add video controls");
        video_content.video_element.setAttribute("controls","controls");
        console.log("play video");
        video_content.video_element.play();
    },
	StopVideo() {
        console.log("pause, set video to time 0 and remove src url");
		this.video_element.pause();
        this.video_element.currentTime = 0;
        this.video_source.setAttribute('src', '');
    },
    
    closeFullscreen(el) {
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
