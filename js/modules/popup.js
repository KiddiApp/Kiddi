import Display from './helperFunctions.js';
import states from './appStates.js';
import { UpdateAppState } from './updateAppState.js';

let popup_container_large = document.getElementById("popup_large");
let popup_container_small = document.getElementById("popup_small");
let popup_large_title = document.getElementById("information_title");
let popup_small_title = document.getElementById("small_information_text");
let popup_confirm_small = document.getElementById("confirm_button_small");
let popup_large_information = document.getElementById("large_information_text");
let popup_confirm_ok_large = document.getElementById("confirm_button_large");
let popup_confirm_ok_small = document.getElementById("confirm_button_small");
let popup_confirm_yes_no = document.getElementById("yes_no_container");

let popup_delay = null;
let popup_callback = null;

popup_confirm_ok_large.addEventListener('click', function() {
	if(popup_callback) popup_callback();
	HidePopup();
});

popup_confirm_ok_small.addEventListener('click', function() {
	if(popup_callback) popup_callback();
	HidePopup();
});

document.getElementById("confirm_yes").addEventListener('click', function() {
	HidePopup();
	UpdateAppState(states.Instructions);
});

document.getElementById("confirm_no").addEventListener('click', function() {
	HidePopup();
});

function ShowPopup(popup_type, title, information, buttonCount, buttonClickCallback) {
	if(popup_type == 1) {
		if(title == null) {
			Display(false, popup_large_title);
		} else {
			Display(true, popup_large_title);
			popup_large_title.innerHTML = title;
		}

		if(buttonCount > 1) {
			Display(false, popup_confirm_ok_large);
			Display(true, popup_confirm_yes_no);
		} else if(buttonCount == 1) {
			Display(false, popup_confirm_yes_no);
			Display(true, popup_confirm_ok_large);
		} else {
			Display(false, popup_confirm_yes_no);
			Display(false, popup_confirm_ok_large);
		}
		popup_large_information.innerHTML = information;
		Display(true, popup_container_large);
	} else {
		if(title == null) {
			popup_small_title.classList.remove("bold_title");
			popup_small_title.classList.add("regular_title");
		} else {
			popup_small_title.classList.remove("regular_title");
			popup_small_title.classList.add("bold_title");
		}
		popup_small_title.innerHTML = information;
		Display(true, popup_container_small);
	}

	if(buttonClickCallback) popup_callback = buttonClickCallback;
}

function HidePopup() {
	if(popup_delay) clearTimeout(popup_delay);
	Display(false, popup_container_large);
	Display(false, popup_container_small);
}

export { ShowPopup, HidePopup };