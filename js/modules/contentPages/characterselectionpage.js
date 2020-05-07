import Display from '../helperFunctions.js';
import paintSceneObject from '../paintSceneObject.js';
import { UpdateAppState } from '../updateAppState.js';
import states from '../appStates.js';

let characterselection_content = {
	container: document.getElementById("select_character"),
	characters: document.getElementsByClassName("character"),
	Init() {
		for (let i = 0; i < this.characters.length; i++) {
			const character = this.characters[i];
			character.addEventListener('click', function() {
				paintSceneObject.setbgimage(character.getElementsByTagName('img')[0].src);
				UpdateAppState(states.PaintingPainting);
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