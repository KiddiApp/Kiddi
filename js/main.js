const states = {
	HomePage: 0,
	Scanning: 1,
	Video: 2,
	Instructions: 3,
	CardGame: 4,
	Information: 5,
	Answers: 6,
	PaintingCharacterSelection: 7,
	PaintingPainting: 8,
	Painting3dAnimation: 9
}

function Display(show, element) {
	if(show) {
		element.classList.remove("hidden");
	} else {
		element.classList.add("hidden");
	}
}

let homepage_content = {
	container: document.getElementById("home_view"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	},
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}
let instructions_content = {
	container: document.getElementById("instructions_view"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}
let scan_content = {
	container: document.getElementById("scan_view"),
	scanning: document.getElementById("scanning"),
	found_page: document.getElementById("found_page"),
	scan_succes: document.getElementById("scan_succes"),
	scan_failure_timeout: null,
	Show(callBack) {
		Display(true, this.container);
		EnableTracking(true, false);
		ShowPopup("Some information about the scanning action", "this is some long subtitle with relevant and interesting information this is just a great read which this never ends", 0, 5, function() {
			EnableTracking(true, true);
			this.scanning.classList.remove('hidden');
			scan_failure_timeout = setTimeout(function() {
				EnableTracking(true, false);
				this.scanning.classList.add('hidden');
				ShowPopup("We were not able to scan a page.", "Do you need help?", 2, 0, null);
			}, 180000)
		});
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		this.scanning.classList.add('hidden');
		this.scan_succes.classList.add('hidden');
		Display(false, this.container);
		if(callBack) callBack();
	},
	ShowFoundPage(page_num) {
		if(scan_failure_timeout) clearTimeout(scan_failure_timeout); 
		EnableTracking(true, false);
		this.scanning.classList.add('hidden');
		this.found_page.innerHTML = page_num.toString();
		this.scan_succes.classList.remove('hidden');
		setTimeout(function() { //TODO: CHECK IF THIS IS DESIRED OR THAT USER CLICKS TO CONFIRM
			switch (page_num) {
				case 1:
					UpdateAppState(states.Video);
					break;
				case 2:
					UpdateAppState(states.CardGame);
					break;
				case 3:
					UpdateAppState(states.PaintingCharacterSelection);
					break;
				case 17:
					UpdateAppState(states.Information);
					break;
			}
		}, 1000);
	}
}
let video_content = {
	container: document.getElementById("video_container"),
	character_animation: document.getElementById("threejs_canvas"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}
let painting_content = {
	container: document.getElementById(""),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}
let cardgame_content = {
	container: document.getElementById("threejs_canvas"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}
let information_content = {
	container: document.getElementById("information"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}
let answers_content = {
	container: document.getElementById("answers"),
	Show(callBack) {
		Display(true, this.container);
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		Display(false, this.container);
		if(callBack) callBack();
	}
}

let currentState = states.HomePage;
let currentContent = homepage_content;

function UpdateAppState(state) {
	if(currentState != state) {
		currentState = state;
		currentContent.Hide(function() {
			currentContent = StateToContent(state);
			currentContent.Show();
		});
	}
}

let back_button = document.getElementById("back_button");
back_button.addEventListener('click', () => {
	switch (currentState) {
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
			return painting_content;
		case states.PaintingPainting:
			return null;
		case states.Painting3dAnimation:
			return null;
	}
}

let scan_button = document.getElementById("scan_image");
scan_button.addEventListener('click', function() {
	UpdateAppState(states.Scanning);
});

let instructions_button = document.getElementById("help_needed");
instructions_button.addEventListener('click', function() {
	UpdateAppState(states.Information);
});


// UpdateAppState(states.HomePage);