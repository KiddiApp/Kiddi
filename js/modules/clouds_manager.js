import Display from './helperFunctions.js';

let clouds = {
	top_left: 0,
	top_right: 1,
	mid_left: 2,
	mid_right: 3,
	bottom_center: 4
}

let clouds_manager = {
	top_left: document.getElementById("top_left_cloud"),
	top_right: document.getElementById("top_right_cloud"),
	mid_left: document.getElementById("mid_left_cloud"),
	mid_right: document.getElementById("mid_right_cloud"),
	bottom_center: document.getElementById("mid_bottom_cloud"),

	hideClouds: function() {
		for (let i = 0; i < arguments.length; i++) {
			Display(false, this.getCloud(arguments[i]));
		}
	},

	showClouds: function() {
		for (let i = 0; i < arguments.length; i++) {
			Display(true, this.getCloud(arguments[i]));
		}
	},

	getCloud: function(cloud) {
		switch (cloud) {
			case clouds.top_left:
				return this.top_left;
			case clouds.top_right:
				return this.top_right;
			case clouds.mid_left:
				return this.mid_left;
			case clouds.mid_right:
				return this.mid_right;
			case clouds.bottom_center:
				return this.bottom_center;
		}
	}
}

export { clouds, clouds_manager };