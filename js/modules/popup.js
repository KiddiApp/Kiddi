let popup_container = document.getElementById("popup");
let popup_title = document.getElementById("popup_title");
let popup_subtitle = document.getElementById("popup_subtitle");
let popup_buttons_container = document.getElementById("popup_buttons_container");
let popup_confirm_ok = document.getElementById("confirm_ok");
let popup_confirm_yes_no = document.getElementById("yes_no_container");

let popup_delay = null;

function ShowPopup(title, subtitle, buttonCount, removeDelay, callback) {
	popup_title.innerHTML = title;
	if(subtitle == null) {
		popup_subtitle.classList.add("hidden");
		popup_title.classList.remove("medium_popup_title");
		popup_title.classList.add("large_popup_title");
	} else {
		popup_subtitle.classList.remove("hidden");
		popup_subtitle.innerHTML = subtitle;
		popup_title.classList.remove("large_popup_title");
		popup_title.classList.add("medium_popup_title");
	}

	if(buttonCount > 0) {
		popup_buttons_container.classList.remove("hidden");
		if(buttonCount > 1) {
			popup_confirm_yes_no.classList.remove("hidden");
			popup_confirm_ok.classList.add("hidden");
		} else {
			popup_confirm_yes_no.classList.add("hidden");
			popup_confirm_ok.classList.remove("hidden");
		}
	} else {
		popup_buttons_container.classList.add("hidden");
		if(removeDelay > 0) {
			popup_delay = setTimeout(function() {
				HidePopup();
				if(callback) callback();
			}, removeDelay * 1000);
		}
	}

	popup_container.classList.remove("hidden");
}

function HidePopup() {
	if(popup_delay) clearTimeout(popup_delay);
	popup_container.classList.add("hidden");
}

export { ShowPopup, HidePopup };