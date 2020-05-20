import Display from '../helperFunctions.js';
import {clouds, clouds_manager } from '../clouds_manager.js';

let information_content = {
	container: document.getElementById("information"),
	Show(callBack) {
		Display(true, this.container);
		clouds_manager.hideClouds(clouds.top_left, clouds.top_right, clouds.mid_left, clouds.mid_right, clouds.bottom_center);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		clouds_manager.showClouds(clouds.top_left, clouds.top_right, clouds.mid_left, clouds.mid_right);
		if(callBack) callBack();
	}
}

export default information_content;