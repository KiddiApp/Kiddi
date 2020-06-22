import Display from '../helperFunctions.js';
import characterAnimationSceneObject from '../characterAnimationSceneObject.js';
import { UpdateAppState } from '../updateAppState.js';
import states from '../appStates.js';
import { ShowFullscreenOverlay, appinfo } from '../../initialize.js';
import { ShowPopup, HidePopup } from '../popup.js';

let video_content = {
	container: document.getElementById("video_container"),
	character_animation: document.getElementById("threejs_canvas"),
	video_element: document.getElementById("video_element"),
	video_source: document.getElementById("video_source"),
	scene: characterAnimationSceneObject,

    init() {
        this.video_element.addEventListener('ended', function() {
            setTimeout(() => {
                UpdateAppState(states.HomePage);
                
                // setTimeout(() => {
                //     if(!appinfo.DeviceSupportedAndCorrectScreenSize().orientationCorrect) {
                //         ShowFullscreenOverlay();
                //         ShowPopup(1, "Kiddi App no funciona horizontalmente", "Si intentas navegar de forma horizontal, por favor regresa tu dispositivo a posición vertical.", 1, () => {
                //             HidePopup();
                //         });
                //     }
                // }, 1000);
            }, 1500);
        }, false);
    },
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	SetAndPlayVideoSource(source) { 
		this.video_source.setAttribute('src', 'Data/Videos/' + source + '.mp4');
        this.video_element.load();
        this.video_element.addEventListener('canplaythrough', this.CanPlay, false);
    },
    CanPlay() {
        video_content.video_element.setAttribute("controls","controls");
        video_content.video_element.play();
    },
	StopVideo() {
        this.video_element.removeEventListener("canplaythrough", video_content.CanPlay, false);
        this.closeFullscreen(this.video_element);
        this.video_element.removeAttribute("controls");
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
        
        if(!appinfo.DeviceSupportedAndCorrectScreenSize().orientationCorrect) {
            ShowFullscreenOverlay();
            ShowPopup(1, "Kiddi App no funciona horizontalmente", "Si intentas navegar de forma horizontal, por favor regresa tu dispositivo a posición vertical.", 1, () => {
                HidePopup();
            });
        }

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
