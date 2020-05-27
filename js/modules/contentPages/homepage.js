import Display from '../helperFunctions.js';
import {clouds, clouds_manager } from '../clouds_manager.js';

let homepage_content = {
	container: document.getElementById("home_view"),
	icon: document.getElementById("grid_item_1"),
	Show(callBack) {
		Display(true, this.container);
		clouds_manager.showClouds(clouds.top_left, clouds.top_right, clouds.mid_left, clouds.mid_right);
		if(callBack) callBack();
	},
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}, 
	IntroAnimation() {
		// console.log("Add animation!");
		this.icon.classList.add("scale_in");
	}
}

export default homepage_content;