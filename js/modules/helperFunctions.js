export default function Display(show, element) {
	if(show) {
		element.classList.remove("hidden");
	} else {
		element.classList.add("hidden");
	}
}