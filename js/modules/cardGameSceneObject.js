import { FBXLoader } from '../vendor/FBXLoader.js';
import { loadingManager } from './contentLoader.js';

const cardGameSceneObject = {
	camera: new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ),
	scene: new THREE.Scene(),

	cardPadding: 5,
	textureLoader: new THREE.TextureLoader(),
	basePath: 'Data/Models/Cards/',
	cards: [
		{
			texture: 'card',
			set: 0
		},
		{
			texture: 'card',
			set: 1
		},
		{
			texture: 'card',
			set: 2
		},
		{
			texture: 'card',
			set: 3
		},
	],
	sceneCards: [],
	resourcesLoaded: false,
	raycaster: new THREE.Raycaster(),
	cardRatioPortrait: null,
	cardRatioLandscape: null,
	cardSizeOriginal: null,
	canvasRatio: window.innerWidth / window.innerHeight,

	cardsToCheck: [],
	matchedCards: [],
	callCardsMatched: false,
	flippedCard: null,

	init: function() {

		this.camera.position.set( 0, 200, 0 );
		this.camera.lookAt( 0, 0, 0 );

		this.scene.background = new THREE.Color( 0xa0a0a0 );

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		hemiLight.position.set( 0, 300, 0 );
		this.scene.add( hemiLight );

		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000, 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xff9999, depthWrite: false } ) );
		mesh.rotation.x = - Math.PI / 2;
		mesh.position.y = -0.5;
		mesh.receiveShadow = true;
		this.scene.add( mesh );
	},

	loadResources: function() {
		var ref = cardGameSceneObject;
		var loader = new FBXLoader();

		ref.textureLoader.load(ref.basePath + 'card-bg.png', function(tex) {
			ref.materials.back.tex = new THREE.MeshPhongMaterial({ map: tex });
			ref.materials.back.loaded = true;

			loader.load('./Data/Models/Cards/kiddi-card.fbx', function ( fbx ) {
	
				let obj = fbx.children[0];
				obj.geometry.rotateZ(Math.PI / 2);
				obj.geometry.rotateX(Math.PI / 2);
	
				obj.geometry.computeBoundingBox();
				var b = obj.geometry.boundingBox.max;
				ref.cardRatioPortrait = (b.x * 2) / (b.z * 4);
				ref.cardSizeOriginal = new THREE.Vector2(b.x * 2, b.z * 2);
	
				for (let i = 0; i < ref.cards.length; i++) {
					ref.loadTexture(i, function() {
						ref.addLoadedTexturedCards(obj, ref.cards[i].set);
					});	
				}
	
				ref.positionCards();
			});
		});
	},

	interaction: function() {
		var ref = cardGameSceneObject;
		var mouse = new THREE.Vector2();
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		ref.raycaster.setFromCamera( mouse, ref.camera );
		var intersects = ref.raycaster.intersectObjects( ref.sceneCards );
		ref.flipCard(intersects[0].object, ref.checkIfMatch);
	},

	flipCard: function(card, callback) {
		card.rotation.x += Math.PI;
		this.flippedCard = card;
		if(callback) callback();
	},

	checkIfMatch: function() {
		var ref = cardGameSceneObject;
		ref.cardsToCheck.push(ref.flippedCard);
		ref.flippedCard = null;
		if(ref.cardsToCheck.length >= 2) {
			if(ref.cardsToCheck[0].MatchGroupId == ref.cardsToCheck[1].MatchGroupId) {
				console.log("WE HAVE A MATCH");
				ref.matchedCards = ref.matchedCards.concat(ref.cardsToCheck);
				// TODO: change this to other behaviour if requested
				if(ref.matchedCards.length >= ref.sceneCards.length) {
					ref.matchedCards.forEach(card => {
						ref.flipCard(card, null);
					});	
					ref.sceneCards = ref.shuffleArray(ref.sceneCards);
					ref.positionCards();
				}
			} else {
				console.log("NO MATCH");
				ref.cardsToCheck.forEach(card => {
					ref.flipCard(card, null);
				});
			}

			ref.cardsToCheck = [];
			ref.flippedCard = null;
		}
	},

	animate: function() {
	},

	positionCards: function() {
		var tableDimensions = this.raycastPoint(1, -1).multiplyScalar(2);
		var topleft = this.raycastPoint(-1, 1);
		var gridcellSize = new THREE.Vector2(tableDimensions.x / 2,  tableDimensions.y / 4);
		var cardScale = (gridcellSize.y - this.cardPadding) / this.cardSizeOriginal.y;

		var moveIndexX = 0, moveIndexY = 0;
		for (let i = 0; i < this.sceneCards.length; i++) {
			const card = this.sceneCards[i];
			card.scale.set(cardScale, cardScale, cardScale);

			moveIndexX = (i != 0 && (i - 1) % 2 == 0) ? 1 : 0;
			if(i != 0 && i % 2 == 0){
				moveIndexY++;
			} 

			card.position.x = topleft.x + gridcellSize.x / 2 + gridcellSize.x * moveIndexX;
			card.position.y = 0;
			card.position.z = topleft.y + gridcellSize.y / 2 + gridcellSize.y * moveIndexY;
		}
	},

	raycastPoint: function(x, y) {
		this.camera.updateMatrixWorld();
		var p = new THREE.Vector3( x, y, 0 ).unproject( this.camera );
		return new THREE.Vector2(p.x, p.z).multiplyScalar(100);
	},

	materials: {
		front: {
			tex: null,
			loaded: false
		},
		back: {
			tex: null,
			loaded: false
		}
	},

	addLoadedTexturedCards: function(obj, id) {
		for (let i = 0; i < 2; i++) {
			var card = new THREE.Mesh(obj.geometry, obj.material);
			card.material[0] = this.materials.back.tex;
			card.material[1] = this.materials.front.tex;
			card.MatchGroupId = id;
			this.sceneCards.push(card);	
			this.scene.add(card);	
		}

		if(this.sceneCards.length >= this.cards.length * 2) {
			console.log("ALL CARDS HAVE BEEN LOADED AND ADDED");
			this.sceneCards = this.shuffleArray(this.sceneCards);
			this.positionCards();
			loadingManager.objectHasBeenLoaded();
		}
	},

	addFrontTexture: function(tex, callback) {
		var mats = this.materials;
		mats.front.tex = new THREE.MeshPhongMaterial({ map: tex });
		if(mats.back.loaded) {
			callback();
		}
	},

	loadTexture: function(index, callback) {
		var path = this.basePath + this.cards[index].texture;
		this.textureLoader.load(path + '-pattern.png', function(tex) {
			cardGameSceneObject.addFrontTexture(tex, callback);
		});
	},

	shuffleArray: function(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
}

cardGameSceneObject.init();
cardGameSceneObject.loadResources();

export default cardGameSceneObject;