import scan_content from './modules/contentPages/scanpage.js';
import { NFTObject } from './nftObject.js';

var video = document.getElementById('tracking_video');

var useTracking = false;
var videoMetaLoaded = false;
export default function EnableTracking(enableVideo, enableTracking) {
	if(video.srcObject && videoMetaLoaded) {
		useTracking = enableTracking;
		video.srcObject.getTracks().forEach(t => t.enabled = enableVideo);
		if(enableTracking) MainLoop();
	} else {
		setTimeout(function () {
			EnableTracking(enableVideo, enableTracking);
		}, 200);
	}
}

var canvas_process = document.createElement('canvas');
var context_process = canvas_process.getContext('2d');

let base_nft_url = "./Data/DataNFT/";
let nft_objects = [
	"page1",
	"page2",
	"page3",
	"page17"
];

let nft_tracker_objects = [];

function OnTriggerFound(e) {
	console.log(e);
	switch (e) {
		case "page1":
			scan_content.ShowFoundPage(1);
			break;
		case "page2":
			scan_content.ShowFoundPage(2);
			break;
		case "page3":
			scan_content.ShowFoundPage(3);
			break;
		case "page17":
			scan_content.ShowFoundPage(17);
			break;
		default:
			break;
	}
}

var vw, vh;
var pw, ph;
var ox, oy;
var w, h;

function MainLoop() {
	context_process.fillStyle = "black";
	context_process.fillRect(0, 0, pw, ph);
	context_process.drawImage(video, 0, 0, vw, vh, ox, oy, w, h);
	const img_data = context_process.getImageData(0, 0, pw, ph);

	nft_tracker_objects.forEach(tracker_object => {
		if(tracker_object) {
			tracker_object.Update(img_data);
		}
	});

	if(useTracking)	requestAnimationFrame(MainLoop);
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	var hint = {
		facingMode: {"ideal": "environment"},
		audio: false,
		video: {
			width: { ideal: 480 },
			height: { ideal: 640 },
		},
	};

	navigator.mediaDevices.getUserMedia({video: hint}).then(function (stream) {
		video.srcObject = stream;
		video.play();
	
		video.addEventListener("loadedmetadata", function() {
			
			videoMetaLoaded = true;
			
			var pscale;
			vw = video.videoWidth;
			vh = video.videoHeight;

			pscale = 320 / Math.max(vw, vh / 3 * 4);
			w = vw * pscale;
			h = vh * pscale;
			pw = Math.max(w, h / 3 * 4);
			ph = Math.max(h, w / 4 * 3);
			ox = (pw - w) / 2;
			oy = (ph - h) / 2;
			canvas_process.style.clientWidth = pw + "px";
			canvas_process.style.clientHeight = ph + "px";
			canvas_process.width = pw;
			canvas_process.height = ph;
			
			nft_objects.forEach(nft_object => {
				const url = base_nft_url + nft_object;
				let nft_tracker_object = new NFTObject(pw, ph, url, OnTriggerFound);
				nft_tracker_objects.push(nft_tracker_object);
			});

			EnableTracking(false, false);
		});
	});
}