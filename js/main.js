import states from './modules/appStates.js';
import { UpdateAppState, GetCurrentState } from './modules/updateAppState.js';
import { video_content, videos } from './modules/contentPages/videopage.js';

let back_button = document.getElementById("back_button");
back_button.addEventListener('click', () => {
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
		case states.Information_content_1:
		case states.Information_content_2:
		case states.Information_content_3:
		case states.Information_content_4:
		case states.Information_content_5:
		case states.Information_content_6:
			UpdateAppState(states.Information);
			break;
	}
});

let scan_button = document.getElementById("scan_image");
scan_button.addEventListener('click', function() {
	UpdateAppState(states.Scanning);
});

let instructions_button = document.getElementById("help_needed");
instructions_button.addEventListener('click', function() {
	UpdateAppState(states.Instructions);
});

// TODO: REMOVE LATER ONLY FOR DEV

// let dev_buttons = document.getElementsByClassName("dev_button");
// for (let i = 0; i < dev_buttons.length; i++) {
// 	const element = dev_buttons[i];
// 	element.addEventListener('click', function() {
// 		switch (element.id) {
// 			case "dev_to_paint":
// 				UpdateAppState(states.PaintingCharacterSelection);
// 				break;
// 			case "dev_to_video":
// 				UpdateAppState(states.Video);
// 				video_content.SetAndPlayVideoSource(videos.vid7);
// 				break;
// 			case "dev_to_card":
// 				UpdateAppState(states.CardGame);
// 				break;
// 			case "dev_to_information":
// 				UpdateAppState(states.Information);
// 				break;
// 			case "dev_to_answers":
// 				UpdateAppState(states.Answers);
// 				break;
// 		}
// 	});
// }
