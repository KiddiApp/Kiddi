const paintSceneObject = {
	canvas: document.getElementById("paint2d"),
	context: this.canvas.getContext("2d"),

	clickX: [],
	clickY: [],
	clickColor: [],
	clickTool: [],
	clickSize: [],
	clickDrag: [],
	paint: false,
	curColor: colorPurple,

	init: function() {
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
		// Mouse down location
		var sizeHotspotStartX;
		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
		var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

		if (mouseX < drawingAreaX) { // Left of the drawing area
			if (mouseX > mediumStartX) {
				if (mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight) {
					this.curColor = colorPurple;
				} else if (mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2) {
					this.curColor = colorGreen;
				} else if (mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3) {
					this.curColor = colorYellow;
				} else if (mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4) {
					this.curColor = colorBrown;
				}
			}
		} else if (mouseX > drawingAreaX + drawingAreaWidth) { // Right of the drawing area

			if (mouseY > toolHotspotStartY) {
				if (mouseY > sizeHotspotStartY) {
					sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
					if (mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX) {
						if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge) {
							curSize = "huge";
						} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
							curSize = "large";
						} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
							curSize = "normal";
						} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
							curSize = "small";
						}
					}
				} else {
					if (mouseY < toolHotspotStartY + toolHotspotHeight) {
						curTool = "crayon";
					} else if (mouseY < toolHotspotStartY + toolHotspotHeight * 2) {
						curTool = "marker";
					} else if (mouseY < toolHotspotStartY + toolHotspotHeight * 3) {
						curTool = "eraser";
					}
				}
			}
		}
		this.paint = true;
		this.addClick(mouseX, mouseY, false);
		redraw();
	},

	drag: function (e) {
		
		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
		var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
		
		if (this.paint) {
			this.addClick(mouseX, mouseY, true);
			redraw();
		}
		// Prevent the whole page from dragging if on mobile
		e.preventDefault();
	},

	release: function () {
		this.paint = false;
		redraw();
	},

	cancel: function () {
		this.paint = false;
	},
	
	addClick: function (x, y, dragging) {

		this.clickX.push(x);
		this.clickY.push(y);
		this.clickTool.push(curTool);
		this.clickColor.push(this.curColor);
		this.clickSize.push(curSize);
		this.clickDrag.push(dragging);
	},

	clearCanvas: function () {
		this.context.clearRect(0, 0, canvasWidth, canvasHeight);
	},

	redraw: function () {
		var radius;
		var i;

		clearCanvas();

		// Keep the drawing in the drawing area
		this.context.save();
		this.context.beginPath();
		this.context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		this.context.clip();

		// For each point drawn
		for (i = 0; i < this.clickX.length; i += 1) {

			// Set the drawing radius TODO: check if we want a size parameter. 
			switch (this.clickSize[i]) {
			case "small":
				radius = 2;
				break;
			case "normal":
				radius = 5;
				break;
			case "large":
				radius = 10;
				break;
			case "huge":
				radius = 20;
				break;
			default:
				break;
			}

			// Set the drawing path
			this.context.beginPath();
			if (this.clickDrag[i] && i) {
				this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
			} else {
				this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
			}
			this.context.lineTo(this.clickX[i], this.clickY[i]);
			
			// Set the drawing color
			if(this.clickTool[i] === "eraser") {
				this.context.strokeStyle = 'white';
			} else {
				this.clickColor[i];
			}
			this.context.lineCap = "round";
			this.context.lineJoin = "round";
			this.context.lineWidth = radius;
			this.context.stroke();
		}
		this.context.closePath();
		this.context.restore();

		// Draw the outline image
		this.context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
	},
}