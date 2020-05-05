import states from './modules/appStates.js';
import { UpdateAppState, GetCurrentState } from './modules/updateAppState.js';

let back_button = document.getElementById("back_button");
back_button.addEventListener('click', () => {
	console.log(GetCurrentState());
	switch (GetCurrentState()) {
		case states.HomePage:
			return;
		case states.Scanning:
		case states.Instructions:
		case states.Video:
		case states.CardGame:
		case states.Information:
		case states.Answers:
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
	UpdateAppState(states.Scanning);
});

let instructions_button = document.getElementById("help_needed");
instructions_button.addEventListener('click', function() {
	UpdateAppState(states.Information);
});
