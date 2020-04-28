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
	Show(callBack) {
		Display(true, this.container);
		EnableTracking(true, false);
		ShowPopup("Some information about the scanning action", "this is some long subtitle with relevant and interesting information this is just a great read which this never ends", 0, 5, function() {
			setTimeout(function() {
				scanning.classList.remove('hidden');
				ShowPopup("We were not able to scan a page.", "Do you need help?", 2, 0, null);
			}, 180000)
		});
		if(callBack) callBack();
	}, 
	Hide(callBack) {
		scanning.classList.add('hidden');
		Display(false, this.container);
		if(callBack) callBack();
	}
}
let video_content = {
	container: document.getElementById("video_container"),
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