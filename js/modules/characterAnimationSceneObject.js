import { FBXLoader } from '../vendor/FBXLoader.js';
import { loadingManager } from './contentLoader.js';

const characterAnimationSceneObject = {
	camera: new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ),
	scene: new THREE.Scene(),
	
	clock: new THREE.Clock(),
	animationMixer: null,
	animation: null,
	animationLoopCompleteCallback: null,

	init: function() {

		this.camera.position.set( 0, 2, -5 );
		this.camera.lookAt( 0, 1, 0 );

		this.scene.background = new THREE.Color( 0xa0a0a0 );
		this.scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		hemiLight.position.set( 0, 20, 0 );
		this.scene.add( hemiLight );

		var dirLight = new THREE.DirectionalLight( 0xffffff );
		dirLight.position.set( - 3, 10, - 10 );
		dirLight.castShadow = true;
		dirLight.shadow.camera.top = 2;
		dirLight.shadow.camera.bottom = - 2;
		dirLight.shadow.camera.left = - 2;
		dirLight.shadow.camera.right = 2;
		dirLight.shadow.camera.near = 0.1;
		dirLight.shadow.camera.far = 40;
		this.scene.add( dirLight );

		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
		mesh.rotation.x = - Math.PI / 2;
		mesh.receiveShadow = true;
		this.scene.add( mesh );
	},

	loadResource: function() {
		var ref = characterAnimationSceneObject;
		var loader = new FBXLoader();

		loader.load('./Data/Models/Animations/Jumping.fbx', function ( fbx ) {
			fbx.rotation.y = Math.PI;
			fbx.scale.set(0.01, 0.01, 0.01);
			ref.animationMixer = new THREE.AnimationMixer( fbx );
			ref.animationMixer.addEventListener( 'loop', function( e ) {
				ref.animation.paused = true;
				if(ref.animationLoopCompleteCallback) ref.animationLoopCompleteCallback();
				ref.animationLoopCompleteCallback = null;
			});
			ref.animation = ref.animationMixer.clipAction(fbx.animations[0]);
			
			ref.scene.add(fbx);
			ref.animation.paused = true;
			ref.animation.play();

			loadingManager.objectHasBeenLoaded();
		});
	},

	play: function(callback) {
		this.animation.paused = false;
		this.animationLoopCompleteCallback = callback;
	},

	stop: function() {
		this.animation.stop();
		this.animation.play();
		this.animation.paused = true;
	},

	animate: function() {
		var mixerUpdateDelta = this.clock.getDelta();
		if(this.animationMixer) this.animationMixer.update( mixerUpdateDelta );
	}
}

// characterAnimationSceneObject.loadResource();
// characterAnimationSceneObject.init();

export default characterAnimationSceneObject;