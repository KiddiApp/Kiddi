import states from './modules/appStates.js';
import { UpdateAppState, GetCurrentState } from './modules/updateAppState.js';


let back_button = document.getElementById("back_button");
back_button.addEventListener('click', () => {
	switch (GetCurrentState()) {
		case states.HomePage:
			return;
		case states.Scanning:
			UpdateAppState(states.HomePage);
			break;
		case states.Instructions:
			UpdateAppState(states.HomePage);
			break;
		case states.Video:
			UpdateAppState(states.HomePage);
			break;
		case states.CardGame:
			UpdateAppState(states.HomePage);
			break;
		case states.Information:
			UpdateAppState(states.HomePage);
			break;
		case states.Answers:
			UpdateAppState(states.HomePage);
			break;
		case states.PaintingCharacterSelection:
			UpdateAppState(states.HomePage);
			break;
		case states.PaintingPainting:
			UpdateAppState(states.PaintingCharacterSelection);
			break;
		case states.Painting3dAnimation:
			UpdateAppState(states.PaintingPainting);
			break;
		default:
			break;
	}
});

let scan_button = document.getElementById("scan_image");
scan_button.addEventListener('click', function() {
	UpdateAppState(states.CardGame);
});

let instructions_button = document.getElementById("help_needed");
instructions_button.addEventListener('click', function() {
	UpdateAppState(states.Scanning);
});
