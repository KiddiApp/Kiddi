import Display from '../helperFunctions.js';

let instructions_content = {
	container: document.getElementById("instructions_view"),
	stars: document.getElementsByClassName("star"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	},
	AddAnimations() {
		for (let i = 0; i < this.stars.length; i++) {
			const element = this.stars[i];
			setTimeout(function() {
				element.classList.add("scale");
				element.classList.add("rotate");
			}, Math.round(Math.random() * 4000) );
		}
	}
}

export default instructions_content;