import states from './appStates.js';
import homepage_content from './contentPages/homepage.js';
import { scan_content } from './contentPages/scanpage.js';
import instructions_content from './contentPages/instructionspage.js';
import { video_content } from './contentPages/videopage.js';
import cardgame_content from './contentPages/cardgamepage.js';
import information_content from './contentPages/informationpage.js';
import answers_content from './contentPages/answerspage.js';
import characterselection_content from './contentPages/characterselectionpage.js';
import painting_content from './contentPages/paintingpage.js';
import paintedCharacterAnimation_content from './contentPages/paintedCharacterAnimationPage.js';
import { information_dislexia_content } from './contentPages/information_dislexia.js';
import { information_colorblindness_content } from './contentPages/information_colorblindness.js';
import { information_disgraphia_content } from './contentPages/information_disgraphia.js';
import { information_summary_content } from './contentPages/information_summary.js';
import { information_references_content } from './contentPages/information_references.js';

let backbtn = document.getElementById("back_button_container");

let currentContent = homepage_content;
let currentState = states.HomePage;

function UpdateAppState(state) {
	if(state != states.HomePage) backbtn.classList.remove("hidden");
	else backbtn.classList.add("hidden");

	if(currentState != state) {
		currentState = state;
		currentContent.Hide(function() {
			currentContent = StateToContent(state);
			currentContent.Show();
		});
	}
}

function GetCurrentState() {
	return currentState;
}

function StateToContent(state) {
	switch (state) {
		case states.HomePage:
			return homepage_content;
		case states.Scanning:
			return scan_content;
		case states.Instructions:
			return instructions_content;
		case states.Video:
			return video_content;
		case states.CardGame:
			return cardgame_content;
		case states.Information:
			return information_content;
		case states.Answers:
			return answers_content;
		case states.PaintingCharacterSelection: 
			return characterselection_content;
		case states.PaintingPainting:
			return painting_content;
		case states.Painting3dAnimation:
			return paintedCharacterAnimation_content;
		case states.Information_content_1:
			return information_dislexia_content;
		case states.Information_content_2:
			return information_colorblindness_content;
		case states.Information_content_3:
			return information_disgraphia_content;
		case states.Information_content_4:
			return information_summary_content;
		case states.Information_content_5:
			return information_references_content;
		case states.Information_content_6:
			return information_references_content;
	}
}

export { UpdateAppState, GetCurrentState };