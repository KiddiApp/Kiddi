// import Display from "./helperFunctions.js";

let cloudsTransition = {
	container: document.getElementById("transition_container"),
	clouds: document.getElementsByClassName("transition_cloud"),
	background: document.getElementsByClassName("white_transition_bg"),
	
	CloudCover: function(callback) {
		// Display(true, this.container);
		this.background[0].id = "transition_bg_solid";
		for (let i = 0; i < this.clouds.length; i++) {
			const element = this.clouds[i];
			element.id = ("cloud_goal_" + element.dataset.cloudId);
		}
		setTimeout(() => {
			this.ClearSky();
			if(callback) callback();
		}, 1000);
	},

	ClearSky: function() {
		this.background[0].id = "";
		for (let i = 0; i < this.clouds.length; i++) {
			const element = this.clouds[i];
			element.id = "";
		}
		// setTimeout(() => {
		// 	Display(false, this.container);
		// }, 1000);
	}
}

export { cloudsTransition };