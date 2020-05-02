import GLTFLoader from '../vendor/GLTFLoader.js';

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
		'Card3B'
	],
	sceneCards: [],
	resourcesLoaded: false,

	init: function() {

		this.camera.position.set( 0, 5, 0 );
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

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		var cube = new THREE.Mesh( geometry, material );
		this.scene.add( cube );

		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
		mesh.rotation.x = - Math.PI / 2;
		mesh.receiveShadow = true;
		this.scene.add( mesh );
	},

	loadResources: function() {
		var loader = new THREE.GLTFLoader();
		var setIdCounter = 0;
		var loadCounter = 0;
			
		loader.load( this.basePath + cards[loadCounter], function ( gltf ) {

			let sceneCard = {
				name: cards[loadCounter],
				model: gltf.scene,
				setId: setIdCounter,
			}
			this.sceneCards.push(sceneCard);

			if(loadCounter % 2 == 0 && loadCounter != 0) setIdCounter++;
			
			if(loadCounter == cards.length - 1) {
				console.log("CARDS ARE LOADED");
				resourcesLoaded = true;
			}

		}, undefined, function ( error ) {
			console.error( error );	
		});
	},

	animate: function() {
		
	}
}

cardGameSceneObject.loadResources();
cardGameSceneObject.init();

export default cardGameSceneObject;