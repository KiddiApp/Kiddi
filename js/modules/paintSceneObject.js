const paintSceneObject = {

	canvas: document.getElementById("paint2d"),
	context: null,
	rect: null,
	color_options: document.getElementsByClassName("color_option"),

	bgImage: new Image(),
	clickX: [],
	clickY: [],
	clickColor: [],
	clickDrag: [],
	paint: false,
	curColor: '#9770f9',
	paintRadius: 10,

	clearAnimationBg: function() {
		this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
	},

	setbgimage: function(src) {
		if(src != null) {
			this.bgImage.src = src;
			this.bgImage.onload = function() {
				paintSceneObject.context.drawImage(paintSceneObject.bgImage, 0, 0, paintSceneObject.canvas.offsetWidth, paintSceneObject.canvas.offsetWidth);
			}
		} else {
			this.context.drawImage(this.bgImage, 0, 0, this.canvas.offsetWidth, this.canvas.offsetWidth);
		}
	},

	setRect: function() {
		this.rect = paintSceneObject.canvas.getBoundingClientRect();
	},

	setColor: function(col) {
		this.curColor = col;
	},

	removeActiveColor: function() {
		for (let i = 0; i < this.color_options.length; i++) {
			const option = this.color_options[i];
			option.classList.remove("active_color");
		}
	},

	init: function() {

		this.context = this.canvas.getContext("2d");

		for (let i = 0; i < this.color_options.length; i++) {
			const option = this.color_options[i];
			option.addEventListener('click', function() {
				paintSceneObject.setColor(option.dataset.color);
				paintSceneObject.removeActiveColor();
				option.classList.add("active_color");
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

		paintSceneObject.rect = paintSceneObject.canvas.getBoundingClientRect();

		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
		var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY);

		mouseX -= paintSceneObject.rect.left;
		mouseY -= paintSceneObject.rect.top;

		paintSceneObject.paint = true;
		paintSceneObject.addClick(mouseX, mouseY, false);
		paintSceneObject.redraw();
	},

	drag: function (e) {

		paintSceneObject.rect = paintSceneObject.canvas.getBoundingClientRect();

		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
		var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY);

		mouseX -= paintSceneObject.rect.left;
		mouseY -= paintSceneObject.rect.top;

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
		this.context.drawImage(this.bgImage, 0, 0, this.canvas.offsetWidth, this.canvas.offsetWidth);
	},

	prepareTexture: function() {
		this.context.beginPath();
		this.context.fillStyle = '#fff';
		this.context.fillRect(0,0, this.canvas.offsetWidth, this.canvas.offsetHeight);
		this.context.closePath();
		this.context.drawImage(this.bgImage, 0, 0, this.canvas.offsetWidth, this.canvas.offsetWidth);
		this.setbgimage();
		this.redraw();
	},

	redraw: function () {

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
	},
}

paintSceneObject.init();

export default paintSceneObject;