import { FBXLoader } from '../vendor/FBXLoader.js';
import { loadingManager } from './contentLoader.js';

const paintedCharacterAnimation = {
	camera: new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ),
	scene: new THREE.Scene(),
	
	character_files: [
		"Baseball_Umpire",
		"Goalkeeper_Catch"
	],
	characters: [],
	active_character: null,
	clock: new THREE.Clock(),
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

	loadResources: function() {
		var ref = characterAnimationSceneObject;
		var loader = new FBXLoader();

		this.character_files.forEach(character_file => {
			loader.load('./Data/Models/Animations/'+character_file+'.fbx', function ( fbx ) {

				fbx.rotation.y = Math.PI;
				fbx.scale.set(0.01, 0.01, 0.01);

				const character_option = {
					name: character_file,
					character: fbx,
					animationMixer: null,
					animation: null,

					init: function() {
						this.animationMixer = new THREE.AnimationMixer( this.character );
						this.animation = this.animationMixer.clipAction(this.character.animations[0])
						this.animationMixer.addEventListener( 'loop', function( e ) {
							this.animation.paused = true;
							if(ref.animationLoopCompleteCallback) ref.animationLoopCompleteCallback();
							this.animationLoopCompleteCallback = null;
						});
						this.animation.paused = true;
						this.animation.play();
						this.character.visible = false;
					},

					showAndPlay: function() {
						this.character.visible = true;
						this.animation.paused = false;
					},

					stopAndHide: function() {
						this.animation.stop();
						this.animation.play();
						this.animation.paused = true;
						this.character.visible = false;			
					}
				}

				character_option.init();

				ref.characters.push(character_option);
				ref.scene.add(character_option.character);
				loadingManager.objectHasBeenLoaded();
			});	
		});
	},

	setActiveCharacterAndPlay: function(name) {
		for (let i = 0; i < this.character_files.length; i++) {
			const element = this.character_files[i];
			if(element.name === element) {
				this.active_character = element;
				this.active_character.showAndPlay();
			}
		}
	},

	animate: function() {
		var mixerUpdateDelta = this.clock.getDelta();
		if(this.active_character.animationMixer) {
			this.active_character.animationMixer.update( mixerUpdateDelta );
		}
	}
}

paintedCharacterAnimation.loadResources();
paintedCharacterAnimation.init();

export default paintedCharacterAnimation;