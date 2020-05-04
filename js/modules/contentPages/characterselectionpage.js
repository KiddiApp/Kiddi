import Display from '../helperFunctions.js';
import paintingpage from './paintingpage.js';
import paintSceneObject from '../paintSceneObject.js';

let characterselection_content = {
	container: document.getElementById("select_character"),
	characters: document.getElementsByClassName("character"),
	Init() {
		for (let i = 0; i < this.characters.length; i++) {
			const character = this.characters[i];
			character.addEventListener('click', function() {
				paintSceneObject.setbgimage(character.getElementsByTagName('img')[0].src);
				characterselection_content.Hide(paintingpage.Show());
			});
		};
	},
	Show: function(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide: function(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

characterselection_content.Init();

export default characterselection_content;