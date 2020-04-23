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

let currentState = states.HomePage;
let currentContent = homepage;

function Display(show, element) {
	if(show) {
		element.classList.remove("hidden");
	} else {
		element.classList.add("hidden");
	}
}

let homepage = {
	container: document.getElementById("home_view"),
	Show() {
		Display(true, this.container);
	},
	Hide() {
		Display(false, this.container);
	}
}
let instructions = {
	container: document.getElementById("instructions_view"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let scan = {
	container: document.getElementById("scan_view"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let video = {
	container: document.getElementById("video_container"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let painting = {
	container: document.getElementById(""),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let cardgame = {
	container: document.getElementById("threejs_canvas"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let information = {
	container: document.getElementById("information"),
	Show() {
		Display(true, this.container);
	}, 
	Hide() {
		Display(false, this.container);
	}
}
let answers = {
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
