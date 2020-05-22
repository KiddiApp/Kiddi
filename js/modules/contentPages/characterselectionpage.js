import Display from '../helperFunctions.js';
import paintSceneObject from '../paintSceneObject.js';
import paintedCharacterAnimation from '../playPaintedCharacterAnimationSceneObject.js';
import { UpdateAppState } from '../updateAppState.js';
import states from '../appStates.js';
import { clouds, clouds_manager } from '../clouds_manager.js';
import painting_content from './paintingpage.js';

let characterselection_content = {
	container: document.getElementById("select_character"),
	characters: document.getElementsByClassName("character"),
	Init() {
		for (let i = 0; i < this.characters.length; i++) {
			const character = this.characters[i];
			character.addEventListener('click', function() {
				painting_content.SetcanvasSize((character.dataset.character == "GombaAnimacion01") ? true : false );
				paintSceneObject.setbgimage(character.getElementsByTagName('img')[0].dataset.texture);
				paintedCharacterAnimation.setActiveCharacter(character.dataset.character);
				UpdateAppState(states.PaintingPainting);
			});
		};
	},
	Show: function(callBack) {
		Display(true, this.container);
		clouds_manager.hideClouds(clouds.mid_right);
		clouds_manager.showClouds(clouds.bottom_center);
		if(callBack) callBack();
	}, 
	Hide: function(callBack) {
		Display(false, this.container);
		clouds_manager.hideClouds(clouds.bottom_center);
		if(callBack) callBack();
	}
}

characterselection_content.Init();

export default characterselection_content;