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
	Show() {
		Display(true, this.container);
	},
	Hide() {
		Display(false, this.container);
	}
}
let instructions_content = {
	container: document.getElementById("instructions_view"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let scan_content = {
	container: document.getElementById("scan_view"),
	Show() {
		Display(true, this.container);
		EnableTracking(true);
		ShowPopup("Some information about the scanning action", "this is some long subtitle with relevant and interesting information this is just a great read which this never ends", 0, 5);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let video_content = {
	container: document.getElementById("video_container"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let painting_content = {
	container: document.getElementById(""),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let cardgame_content = {
	container: document.getElementById("threejs_canvas"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let information_content = {
	container: document.getElementById("information"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let answers_content = {
	container: document.getElementById("answers"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}

let back_button = document.getElementById("back_button");
back_button.addEventListener('click', () => {
	if(currentState == states.HomePage) return;
	else if(current)

	switch (currentState) {
		case states.HomePage:
			break;
		case states.Scanning:
			currentState = states.HomePage
			break;
		case states.Instructions:
			currentState = states.HomePage
			break;
		case states.Video:
			currentState = states.HomePage
			break;
		case states.CardGame:
			currentState = states.HomePage
			break;
		case states.Information:
			currentState = states.HomePage
			break;
		case states.Answers:
			currentState = states.HomePage
			break;
		case states.PaintingCharacterSelection: //maybe move these to a sub-state 
			currentState = states.HomePage
			break;
		case states.PaintingPainting:
			currentState = states.PaintingCharacterSelection;
			break;
		case states.Painting3dAnimation:
			currentState = states.PaintingPainting;
			break;
		default:
			break;
	}
});

let scan_button = document.getElementById("scan_image");
let instructions_button = document.getElementById("help_needed");

let currentState = states.HomePage;
let currentContent = scan_content;
let newContent = null;

currentContent.Show();
