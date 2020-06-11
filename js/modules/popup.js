import Display from './helperFunctions.js';
import states from './appStates.js';
import { UpdateAppState } from './updateAppState.js';

let popup_container_large = document.getElementById("popup_large");
let popup_container_small = document.getElementById("popup_small");
let popup_large_title = document.getElementById("information_title");
let popup_small_title = document.getElementById("small_information_text");
let popup_large_information = document.getElementById("large_information_text");
let popup_confirm_ok_large = document.getElementById("confirm_button_large");
let popup_confirm_ok_small = document.getElementById("confirm_button_small");
let popup_confirm_yes_no = document.getElementById("yes_no_container");

let popup_delay = null;
let popup_callback = null;
let popup_is_visible = false;

popup_confirm_ok_large.addEventListener('click', function() {
	HidePopup(function() {
		if(popup_callback) popup_callback();
		popup_callback = null;
	});
});

popup_confirm_ok_small.addEventListener('click', function() {
	HidePopup(function() {
		if(popup_callback) popup_callback();
		popup_callback = null;
	});
});

document.getElementById("confirm_yes").addEventListener('click', function() {
	HidePopup();
	UpdateAppState(states.Instructions);
});

document.getElementById("confirm_no").addEventListener('click', function() {
	HidePopup();
	clearTimeout(scanfailtimeout);
	scanfailtimeout = setTimeout(function() {
		ShowPopup(1, null, "", 2, null);
	}, scanfailpopupdelay);
});

function ShowPopup(popup_type, title, information, buttonCount, buttonClickCallback) {
	popup_is_visible = true;
	PopupStyleManager(true, "popup_scale_in");
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

function HidePopup(callback) {
	if(popup_delay) clearTimeout(popup_delay);
	PlayRemoveAnimation(callback);
}

function PlayRemoveAnimation(callback) {
	if(!popup_is_visible) return;
	
	PopupStyleManager(false, "popup_scale_in");
	PopupStyleManager(true, "popup_scale_out");
	setTimeout(function() {
		PopupStyleManager(false, "popup_scale_out");
		Display(false, popup_container_large);
		Display(false, popup_container_small);
		popup_is_visible = false;
		setTimeout(function() {
			if(callback) callback();
		}, 100);
	}, 500);
}

function PopupStyleManager(add, style) {
	if(add) {
		popup_container_large.classList.add(style);
		popup_container_small.classList.add(style);
	} else {
		popup_container_large.classList.remove(style);
		popup_container_small.classList.remove(style);		
	}
	
}

export { ShowPopup, HidePopup };