const paintSceneObject = {
	canvas: document.getElementById("paint2d"),
	context: this.canvas.getContext("2d"),

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
					curColor = colorPurple;
				} else if (mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2) {
					curColor = colorGreen;
				} else if (mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3) {
					curColor = colorYellow;
				} else if (mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4) {
					curColor = colorBrown;
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
		paint = true;
		this.addClick(mouseX, mouseY, false);
		redraw();
	},

	drag: function (e) {
		
		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
		var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
		
		if (paint) {
			this.addClick(mouseX, mouseY, true);
			redraw();
		}
		// Prevent the whole page from dragging if on mobile
		e.preventDefault();
	},

	release: function () {
		paint = false;
		redraw();
	},

	cancel: function () {
		paint = false;
	},
	
	addClick: function (x, y, dragging) {

		clickX.push(x);
		clickY.push(y);
		clickTool.push(curTool);
		clickColor.push(curColor);
		clickSize.push(curSize);
		clickDrag.push(dragging);
	},

	redraw: function () {

		var locX;
		var locY;
		var radius;
		var i;
		var selected;

		// drawCrayon = function (x, y, color, selected) {

		// 	context.beginPath();
		// 	context.moveTo(x + 41, y + 11);
		// 	context.lineTo(x + 41, y + 35);
		// 	context.lineTo(x + 29, y + 35);
		// 	context.lineTo(x + 29, y + 33);
		// 	context.lineTo(x + 11, y + 27);
		// 	context.lineTo(x + 11, y + 19);
		// 	context.lineTo(x + 29, y + 13);
		// 	context.lineTo(x + 29, y + 11);
		// 	context.lineTo(x + 41, y + 11);
		// 	context.closePath();
		// 	context.fillStyle = color;
		// 	context.fill();

		// 	if (selected) {
		// 		context.drawImage(crayonImage, x, y, mediumImageWidth, mediumImageHeight);
		// 	} else {
		// 		context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
		// 	}
		// },

		drawMarker = function (x, y, color, selected) {

			context.beginPath();
			context.moveTo(x + 10, y + 24);
			context.lineTo(x + 10, y + 24);
			context.lineTo(x + 22, y + 16);
			context.lineTo(x + 22, y + 31);
			context.closePath();
			context.fillStyle = color;
			context.fill();

			if (selected) {
				context.drawImage(markerImage, x, y, mediumImageWidth, mediumImageHeight);
			} else {
				context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
			}
		};

		clearCanvas();

		if (curTool === "crayon") {

			// Draw the crayon tool background
			context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);

			// Draw purple crayon
			selected = (curColor === colorPurple);
			locX = selected ? 18 : 52;
			locY = 19;
			drawCrayon(locX, locY, colorPurple, selected);

			// Draw green crayon
			selected = (curColor === colorGreen);
			locX = selected ? 18 : 52;
			locY += 46;
			drawCrayon(locX, locY, colorGreen, selected);

			// Draw yellow crayon
			selected = (curColor === colorYellow);
			locX = selected ? 18 : 52;
			locY += 46;
			drawCrayon(locX, locY, colorYellow, selected);

			// Draw brown crayon
			selected = (curColor === colorBrown);
			locX = selected ? 18 : 52;
			locY += 46;
			drawCrayon(locX, locY, colorBrown, selected);

		} else if (curTool === "marker") {

			// Draw the marker tool background
			context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);

			// Draw purple marker
			selected = (curColor === colorPurple);
			locX = selected ? 18 : 52;
			locY = 19;
			drawMarker(locX, locY, colorPurple, selected);

			// Draw green marker
			selected = (curColor === colorGreen);
			locX = selected ? 18 : 52;
			locY += 46;
			drawMarker(locX, locY, colorGreen, selected);

			// Draw yellow marker
			selected = (curColor === colorYellow);
			locX = selected ? 18 : 52;
			locY += 46;
			drawMarker(locX, locY, colorYellow, selected);

			// Draw brown marker
			selected = (curColor === colorBrown);
			locX = selected ? 18 : 52;
			locY += 46;
			drawMarker(locX, locY, colorBrown, selected);

		} else if (curTool === "eraser") {

			context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
			context.drawImage(eraserImage, 18, 19, mediumImageWidth, mediumImageHeight);
		}

		// Draw line on ruler to indicate size
		switch (curSize) {
		case "small":
			locX = 467;
			break;
		case "normal":
			locX = 450;
			break;
		case "large":
			locX = 428;
			break;
		case "huge":
			locX = 399;
			break;
		default:
			break;
		}
		locY = 189;
		context.beginPath();
		context.rect(locX, locY, 2, 12);
		context.closePath();
		context.fillStyle = '#333333';
		context.fill();

		// Keep the drawing in the drawing area
		context.save();
		context.beginPath();
		context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		context.clip();

		// For each point drawn
		for (i = 0; i < clickX.length; i += 1) {

			// Set the drawing radius
			switch (clickSize[i]) {
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
			context.beginPath();
			// If dragging then draw a line between the two points
			if (clickDrag[i] && i) {
				context.moveTo(clickX[i - 1], clickY[i - 1]);
			} else {
				// The x position is moved over one pixel so a circle even if not dragging
				context.moveTo(clickX[i] - 1, clickY[i]);
			}
			context.lineTo(clickX[i], clickY[i]);
			
			// Set the drawing color
			if (clickTool[i] === "eraser") {
				//context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
				context.strokeStyle = 'white';
			} else {
				//context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
				context.strokeStyle = clickColor[i];
			}
			context.lineCap = "round";
			context.lineJoin = "round";
			context.lineWidth = radius;
			context.stroke();
		}
		context.closePath();
		//context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
		context.restore();

		// Overlay a crayon texture (if the current tool is crayon)
		if (curTool === "crayon") {
			context.globalAlpha = 0.4; // No IE support
			context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
		}
		context.globalAlpha = 1; // No IE support

		// Draw the outline image
		context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
	},
}