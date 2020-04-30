import { LoadGLTFModel } from './threejs_setup.js';

const characterAnimationSceneObject = {
	camera: new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ),
	scene: new THREE.Scene(),
	
	clock: new THREE.Clock(),
	animatedModel: null,
	animationMixer: null,
	walkAnimation: null,

	init: function() {
		this.camera.position.set( 0, 0, 5 );
		this.camera.lookAt( 0, 0, 0 );

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

		LoadGLTFModel('Data/Models/Soldier.glb', this.finalizeScene);
	},

	finalizeScene: function(model, animations) {
		console.log("model loaded");
		this.animatedModel = model;
		this.animationMixer = new THREE.AnimationMixer( this.animatedModel );
		this.walkAnimation = this.animationMixer.clipAction(animations[3]);
		this.walkAnimation.loop = THREE.LoopOnce;
		this.walkAnimation.addEventListener('finished', function() {
			console.log("ANIMTION FINISHED");
		});
		this.scene.add(this.animatedModel);
		this.walkAnimation.play();	
	},

	animate: function() {
		var mixerUpdateDelta = clock.getDelta();
		if(mixer) mixer.update( mixerUpdateDelta );
	}
}

export default characterAnimationSceneObject;