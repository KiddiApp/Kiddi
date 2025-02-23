import { FBXLoader } from '../vendor/FBXLoader.js';
import { loadingManager } from './contentLoader.js';

const paintedCharacterAnimation = {
	camera: new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ),
	scene: new THREE.Scene(),
	
	character_files: [
		"LapiAnimacion01",
		"Gomba_Animacion_v3"
	],
	characters: [],
	active_character: null,
	clock: new THREE.Clock(),

	init: function() {

		this.camera.position.set( 0, 2, -5 );
		this.camera.lookAt( 0, 1, 0 );

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff );
		hemiLight.position.set( 0, 40, 0 );
		this.scene.add( hemiLight );
	},

	loadResources: function() {
		var ref = paintedCharacterAnimation;
		var loader = new FBXLoader();

		this.character_files.forEach(character_file => {
			loader.load('./Data/Models/Animations/'+character_file+'.fbx', function ( fbx ) {

                var delay;
                fbx.rotation.y = Math.PI;
				if(character_file == ref.character_files[0]) {
					fbx.scale.set(0.15, 0.15, 0.15);
                    fbx.position.setY(-1);
                    delay = 1000;
				} else {
					fbx.scale.set(0.22, 0.22, 0.22);
                    fbx.position.setY(-1);
                    delay = 0;
				}

				const character_option = {
					name: character_file,
					character: fbx,
					animationMixer: null,
					animation: null,

					init: function() {
						this.animationMixer = new THREE.AnimationMixer( this.character );
						this.animation = this.animationMixer.clipAction(this.character.animations[0])
						this.animationMixer.addEventListener( 'loop', function( e ) {
							character_option.animation.paused = true;
							animationtimeout = setTimeout(function() {
								ref.playActiveCharacterAnimation();
							}, delay);
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
						clearTimeout(animationtimeout);
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

	setActiveCharacter: function(name) {
		for (let i = 0; i < this.characters.length; i++) {
			const element = this.characters[i];
			if(element.name === name) {
				this.active_character = element;
			}
		}
	},

	setActiveCharacterTexture: function(canvas) {
		this.active_character.character.children.forEach(child => {
			if ( child.isSkinnedMesh ) {
				child.material = new THREE.MeshPhongMaterial( { 
					skinning: true,
					map: new THREE.CanvasTexture(canvas) 
				} );
			}
		});
	},

	playActiveCharacterAnimation: function() {
		this.active_character.showAndPlay();
	},

	stopAndResetCharacterAnimation: function() {
		this.active_character.stopAndHide();
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