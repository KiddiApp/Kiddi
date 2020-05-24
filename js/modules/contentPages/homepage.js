import Display from '../helperFunctions.js';
import {clouds, clouds_manager } from '../clouds_manager.js';

let homepage_content = {
	container: document.getElementById("home_view"),
	Show(callBack) {
		Display(true, this.container);
		clouds_manager.showClouds(clouds.top_left, clouds.top_right, clouds.mid_left, clouds.mid_right);
		if(callBack) callBack();
	},
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

export default homepage_content;