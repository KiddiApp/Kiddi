import Display from '../helperFunctions.js';
import {clouds, clouds_manager } from '../clouds_manager.js';
import { UpdateAppState } from '../updateAppState.js';
import states from '../appStates.js';

let information_content = {
	container: document.getElementById("information_menu"),
	urls: document.getElementsByClassName("information_button"),
	Show(callBack) {
		Display(true, this.container);
		clouds_manager.hideClouds(clouds.bottom_center);
		clouds_manager.showClouds(clouds.top_left, clouds.top_right, clouds.mid_left, clouds.mid_right);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		clouds_manager.hideClouds(clouds.top_left, clouds.top_right, clouds.mid_left, clouds.mid_right);
		if(callBack) callBack();
	},
	Init() {
		for (let i = 0; i < this.urls.length; i++) {
			const element = this.urls[i];
			element.addEventListener('click', function() {
				switch (parseInt(element.dataset.url)) {
					case 10:
						UpdateAppState(states.Information_content_1);
						break;
					case 11:
						UpdateAppState(states.Information_content_2);
						break;
					case 12:
						UpdateAppState(states.Information_content_3);
						break;
					case 13:
						UpdateAppState(states.Information_content_4);
						break;
					case 14:
						UpdateAppState(states.Information_content_5);
						break;
					case 15:
						UpdateAppState(states.Information_content_6);
						break;
				}
			});
			setTimeout(() => {
				element.classList.add( (Math.random() < .5) ? "moveminimalbt" : "moveminimallr");
			}, Math.random() * 30000);
		}
	}
}

information_content.Init();
export default information_content;