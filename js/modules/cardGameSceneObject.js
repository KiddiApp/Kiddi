import { FBXLoader } from '../vendor/FBXLoader.js';

const cardGameSceneObject = {
	camera: new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ),
	scene: new THREE.Scene(),

	basePath: 'Data/Models/Cards/',
	cards: [
		'Card1A',
		'Card1B',
		'Card2A',
		'Card2B',
		'Card3A',
		'Card3B',
		'Card4A',
		'Card4B'
	],
	sceneCards: [],
	resourcesLoaded: false,
	raycaster: new THREE.Raycaster(),
	cardRatioPortrait: null,
	cardRatioLandscape: null,
	cardSizeOriginal: null,
	canvasRatio: window.innerWidth / window.innerHeight,

	init: function() {

		this.camera.position.set( 0, 200, 0 );
		this.camera.lookAt( 0, 0, 0 );

		this.scene.background = new THREE.Color( 0xa0a0a0 );
		// this.scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		hemiLight.position.set( 0, 300, 0 );
		this.scene.add( hemiLight );

		var dirLight = new THREE.DirectionalLight( 0xffffff );
		dirLight.position.set( - 300, 100, - 10 );
		dirLight.castShadow = true;
		dirLight.shadow.camera.top = 2;
		dirLight.shadow.camera.bottom = - 2;
		dirLight.shadow.camera.left = - 2;
		dirLight.shadow.camera.right = 2;
		dirLight.shadow.camera.near = 0.1;
		dirLight.shadow.camera.far = 40;
		// this.scene.add( dirLight );

		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000, 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xff9999, depthWrite: false } ) );
		mesh.rotation.x = - Math.PI / 2;
		mesh.position.y = -0.5;
		mesh.receiveShadow = true;
		this.scene.add( mesh );
	},

	loadResources: function() {
		var loader = new FBXLoader();
	
		loader.load('./Data/Models/ModelAndTextures/kiddi-card.fbx', function ( fbx ) {

			let obj = fbx.children[0];
			obj.geometry.rotateZ(Math.PI / 2);
			obj.geometry.rotateX(Math.PI / 2);

			obj.geometry.computeBoundingBox();
			var b = obj.geometry.boundingBox.max;
			cardGameSceneObject.cardRatioPortrait = (b.max.x * 2) / (b.max.y * 4);
			cardGameSceneObject.cardSizeOriginal = new THREE.Vector2(b.max.x * 2, b.max.y * 2);

			for (let i = 0; i < cardGameSceneObject.cards.length; i++) {
				var card = new THREE.Mesh(obj.geometry, obj.material);
				cardGameSceneObject.sceneCards.push(card);
				cardGameSceneObject.scene.add(card);
			}

			cardGameSceneObject.positionCards();
		});
	},

	animate: function() {
		
	},

	positionCards: function() {
		console.log(this.raycastPoint(0, 0));
		console.log(this.raycastPoint(window.innerWidth, window.innerHeight));
	},

	raycastPoint: function(x, y) {
		var normal = new THREE.Vector2();
		normal.x = ( x / window.innerWidth ) * 2 - 1;
		normal.y = - ( y / window.innerHeight ) * 2 + 1;
		this.raycaster.setFromCamera( normal, this.camera );
		var intersects = this.raycaster.intersectObjects( this.scene.children ); 
		return intersects;
	}
}

cardGameSceneObject.init();
cardGameSceneObject.loadResources();

export default cardGameSceneObject;