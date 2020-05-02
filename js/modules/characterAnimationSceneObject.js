import { LoadGLTFModel } from './threejs_setup.js';

const characterAnimationSceneObject = {
	camera: new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ),
	scene: new THREE.Scene(),
	animationComplete: null,
	
	clock: new THREE.Clock(),
	animatedModel: null,
	animationMixer: null,
	walkAnimation: null,
	modelLoaded: false,
	playAnimation: true,

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

	loadResources: function() {
		LoadGLTFModel('Data/Models/Soldier.glb', function (model, animations) {
			var s = characterAnimationSceneObject;
			s.animatedModel = model;
			s.animationMixer = new THREE.AnimationMixer( s.animatedModel );
			s.animationMixer.addEventListener( 'finished', function( e ) {
				if(s.animationComplete) s.animationComplete();
			});
			s.walkAnimation = s.animationMixer.clipAction(animations[3]);
			s.walkAnimation.loop = THREE.LoopOnce;
			s.scene.add(s.animatedModel);

			console.log("MODEL LOADED");
			s.modelLoaded = true;
		});
	},

	play: function(callback) {
		this.animationComplete = callback;
		this.playAnimation = true;
	},

	animate: function() {
		if(this.modelLoaded && this.playAnimation) {
			this.walkAnimation.play();	
			this.playAnimation = false;
		}
		var mixerUpdateDelta = this.clock.getDelta();
		if(this.animationMixer) this.animationMixer.update( mixerUpdateDelta );
	}
}

characterAnimationSceneObject.loadResources();
characterAnimationSceneObject.init();

export default characterAnimationSceneObject;