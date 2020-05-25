var renderer = null;
var currentScene = null;
let updateThreejs = false;

Init3dContext();

function Init3dContext() {
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setClearColor( 0x000000, 0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	document.getElementById("threejs_canvas").appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
}


function onWindowResize() {

	if(!currentScene) return;

	currentScene.camera.aspect = window.innerWidth / window.innerHeight;
	currentScene.camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function StartScene(scene) {
	currentScene = scene;
	updateThreejs = true;
	ThreeUpdateLoop();
}

function StopScene() {
	updateThreejs = false;
	currentScene = null;
}

function ThreeUpdateLoop() {
	if(currentScene) {
		currentScene.animate();
		if(currentScene) renderer.render( currentScene.scene, currentScene.camera );
	}
	if(updateThreejs) requestAnimationFrame(ThreeUpdateLoop);
}

export { StartScene, StopScene };