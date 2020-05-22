const paintSceneObject = {

	canvas: document.getElementById("paint2d"),
	context: null,
	color_options: document.getElementsByClassName("color_option"),

	bgImage: new Image(),
	clickX: [],
	clickY: [],
	clickColor: [],
	clickDrag: [],
	paint: false,
	curColor: '#ffffff',
	paintRadius: 10,

	setbgimage: function(src) {
		this.bgImage.src = src;
		this.bgImage.onload = function() {
			paintSceneObject.clearCanvas();
			paintSceneObject.context.drawImage(paintSceneObject.bgImage, 0, 0, window.innerWidth, window.innerWidth);
		}
	},

	setColor: function(col) {
		this.curColor = col;
	},

	init: function() {

		this.context = this.canvas.getContext("2d");

		for (let i = 0; i < this.color_options.length; i++) {
			const option = this.color_options[i];
			option.addEventListener('click', function() {
				paintSceneObject.setColor(option.dataset.color);
			}, false);
		};

		this.canvas.addEventListener("mousedown", this.press, false);
		this.canvas.addEventListener("mousemove", this.drag, false);
		this.canvas.addEventListener("mouseup", this.release);
		this.canvas.addEventListener("mouseout", this.cancel, false);

		this.canvas.addEventListener("touchstart", this.press, false);
		this.canvas.addEventListener("touchmove", this.drag, false);
		this.canvas.addEventListener("touchend", this.release, false);
		this.canvas.addEventListener("touchcancel", this.cancel, false);
	},

	press: function (e) {
		var rect = paintSceneObject.canvas.getBoundingClientRect();

		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
		var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY);

		mouseX -= rect.left;
		mouseY -= rect.top;

		paintSceneObject.paint = true;
		paintSceneObject.addClick(mouseX, mouseY, false);
		paintSceneObject.redraw();
	},

	drag: function (e) {
		var rect = paintSceneObject.canvas.getBoundingClientRect();

		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
		var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY);

		mouseX -= rect.left;
		mouseY -= rect.top;

		if (paintSceneObject.paint) {
			paintSceneObject.addClick(mouseX, mouseY, true);
			paintSceneObject.redraw();
		}

		e.preventDefault();
	},

	release: function () {
		paintSceneObject.paint = false;
		paintSceneObject.redraw();
	},

	cancel: function () {
		paintSceneObject.paint = false;
	},
	
	addClick: function (x, y, dragging) {

		this.clickX.push(x);
		this.clickY.push(y);
		this.clickColor.push(this.curColor);
		this.clickDrag.push(dragging);
	},

	clearCanvas: function () {
		this.clickX = [],
		this.clickY = [],
		this.clickColor = [],
		this.clickDrag = [],
		this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
		this.context.drawImage(this.bgImage, 0, 0, window.innerWidth, window.innerWidth);
	},

	redraw: function () {
		// this.clearCanvas();

		// Keep the drawing in the drawing area
		this.context.save();
		this.context.beginPath();
		this.context.rect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
		this.context.clip();

		// For each point drawn
		for (var i = 0; i < this.clickX.length; i += 1) {

			// Set the drawing path
			this.context.beginPath();
			if (this.clickDrag[i] && i) {
				this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
			} else {
				this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
			}
			this.context.lineTo(this.clickX[i], this.clickY[i]);
			
			this.context.strokeStyle = this.clickColor[i];
			this.context.lineCap = "round";
			this.context.lineJoin = "round";
			this.context.lineWidth = this.paintRadius;
			this.context.stroke();
			this.context.closePath();
		}
		this.context.closePath();
		this.context.restore();

		// this.context.drawImage(this.bgImage, 0, 0, window.innerWidth, window.innerWidth);
	},
}

paintSceneObject.init();

export default paintSceneObject;