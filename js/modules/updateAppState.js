import states from './appStates.js';
import homepage_content from './contentPages/homepage.js';
import scan_content from './contentPages/scanpage.js';
import instructions_content from './contentPages/instructionspage.js';
import video_content from './contentPages/videopage.js';
import cardgame_content from './contentPages/cardgamepage.js';
import information_content from './contentPages/informationpage.js';
import answers_content from './contentPages/answerspage.js';
import characterselection_content from './contentPages/characterselectionpage.js';
import painting_content from './contentPages/paintingpage.js';

let currentContent = homepage_content;
let currentState = states.HomePage;

function UpdateAppState(state) {
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
			return null;
	}
}

export { UpdateAppState, GetCurrentState };