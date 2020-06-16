import Display from '../helperFunctions.js';
import { StartScene, StopScene } from '../threejs_setup.js';
import cardGameSceneObject from '../cardGameSceneObject.js';
import { ShowPopup, HidePopup } from '../popup.js';

let cardgame_content = {
	container: document.getElementById("threejs_canvas"),
	decos: document.getElementsByClassName("card_game_deco"),
	scene: null,
	Show(callBack) {
		this.DisplayDecos(true);
		Display(true, this.container);
		console.log("Going to show popup");
		ShowPopup(2, true, "¡Busca<br>las parejas!");
		this.scene = cardGameSceneObject;
		this.container.getElementsByTagName('canvas')[0].addEventListener('click', this.scene.interaction);
		StartScene(this.scene);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		this.DisplayDecos(false);
		this.container.getElementsByTagName('canvas')[0].removeEventListener('click', this.scene.interaction);
		this.scene = null;
		StopScene();
		HidePopup();
		Display(false, this.container);
		if(callBack) callBack();
	},
	DisplayDecos(display) {
		for (let i = 0; i < this.decos.length; i++) {
			const element = this.decos[i];
			Display(display, element);
		}
	}
}

export default cardgame_content;