let NFTObject = function (w, h, nft_tracker_url, trigger_found_callback) {
	let ar_object = null;
	let tracker_name = nft_tracker_url.match('([^\/]*)$')[0];

	let param = new ARCameraParam('./Data/camera_para-iPhone 5 rear 640x480 1.0m.dat');
	param.onload = function () {
		ar_object = new ARController(w, h, param);
		ar_object.addEventListener('getNFTMarker', function() {
			trigger_found_callback(tracker_name);
		});
		ar_object.loadNFTMarker(nft_tracker_url, function (markerId) {
			ar_object.trackNFTMarkerId(markerId, 2);
		});
	}

	return {
		Update: function(image_data) {
			if(ar_object) {
				ar_object.process(image_data);
			}
		}
	}
}