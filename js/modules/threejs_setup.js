import { GLTFLoader } from '../vendor/GLTFLoader.js';


var renderer, mainScene, updateThreejs = false;
var canvas = document.getElementById("canvas3d");

renderer = new THREE.WebGLRenderer( { canvas, antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

var loader = new GLTFLoader();
export function LoadGLTFModel(url, callback) {
	loader.load( url, function ( gltf ) {

		var model = gltf.scene;
	
		model.traverse( function ( object ) {
			if ( object.isMesh ) object.castShadow = true;
		} );

		var animations = gltf.animations;
		callback(model, animations);
	});	
}


export function ThreeUpdateLoop() {
	if(mainScene) mainScene.animate();
	renderer.render( mainScene.scene, mainScene.camera );
	if(updateThreejs) requestAnimationFrame(ThreeUpdateLoop);
}