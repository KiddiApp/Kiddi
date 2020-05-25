import { FBXLoader } from '../vendor/FBXLoader.js';
import { loadingManager } from './contentLoader.js';
import { ShowPopup } from './popup.js';

const cardGameSceneObject = {
	camera: new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ),
	scene: new THREE.Scene(),

	cardPadding: 5,
	textureLoader: new THREE.TextureLoader(),
	basePath: 'Data/Models/Cards/',
	cards: [
		{
			texture: 'cloud_card',
			set: 0
		},
		{
			texture: 'feather_card',
			set: 1
		},
		{
			texture: 'pencil_card',
			set: 2
		},
		{
			texture: 'ruler_card',
			set: 3
		},
		{
			texture: 'sol_card',
			set: 4
		}
	],
	sceneCards: [],
	resourcesLoaded: false,
	raycaster: new THREE.Raycaster(),
	cardaspectratio: null,
	cardSizeOriginal: null,
	canvasRatio: window.innerWidth / window.innerHeight,

	cardsToCheck: [],
	matchedCards: [],
	callCardsMatched: false,
	flippedCard: null,

	init: function() {

		this.camera.position.set( 0, 200, 0 );
		this.camera.lookAt( 0, 0, 0 );

		this.scene.background = new THREE.Color( 0xffffff );

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		hemiLight.position.set( 0, 300, 0 );
		this.scene.add( hemiLight );

	},

	loadResources: function() {
		var ref = cardGameSceneObject;
		var loader = new FBXLoader();

		ref.textureLoader.load(ref.basePath + 'card-bg.png', function(tex) {
			ref.materials.back.tex = new THREE.MeshPhongMaterial({ map: tex });
			ref.materials.back.loaded = true;

			loader.load('./Data/Models/Cards/kiddi-card.FBX', function ( fbx ) {
	
				let obj = fbx.children[0];
				obj.geometry.rotateX(Math.PI / 2);
	
				obj.geometry.computeBoundingBox();
				var b = obj.geometry.boundingBox.max;
				ref.cardaspectratio = b.x / b.z;
				ref.cardSizeOriginal = new THREE.Vector2(b.x * 2, b.z * 2);
	
				for (let i = 0; i < ref.cards.length; i++) {
					ref.loadTexture(i, function(tex) {
						ref.addLoadedTexturedCards(obj, ref.cards[i].set, tex);
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
				ref.matchedCards = ref.matchedCards.concat(ref.cardsToCheck);
				if(ref.matchedCards.length >= ref.sceneCards.length) {
					ShowPopup(2, true, "!Genial,<br> lo lograste!", 1, function() {
						ref.matchedCards.forEach(card => {
							ref.flipCard(card, null);
						});	
						ref.sceneCards = ref.shuffleArray(ref.sceneCards);
						ref.positionCards();
					});
				}
			} else {
				ref.cardsToCheck.forEach(card => {
					ref.flipCard(card, null);
				});
			}

			ref.cardsToCheck = [];
			ref.flippedCard = null;
		}
	},

	animate: function() { },

	calculateGrid: function() {
		var canvas_dimensions = this.raycastPoint(1, -1).multiplyScalar(2);
		var offset_top = canvas_dimensions.y * 0.1843297101;
		var offset_bottom = canvas_dimensions.y * 0.1363224638;
		var grid_height = canvas_dimensions.y - offset_top - offset_bottom;
		var grid_padding = canvas_dimensions.x * 0.04025764895;
		var card_height = (grid_height - grid_padding * 4) / 5;
		var card_width = card_height * this.cardaspectratio;
		var grid_width = card_width * 2 + grid_padding;
		var offset_left = (canvas_dimensions.x - grid_width) / 2
		var tl = this.raycastPoint(-1, 1);
		var grid_origin = new THREE.Vector2(tl.x + offset_left, tl.y + offset_top);

		return { 
			cardScale: card_height / this.cardSizeOriginal.y,
			cardSize: new THREE.Vector2(card_width, card_height),
			gridPadding: grid_padding,
			gridOrigin: grid_origin
		}
	},

	positionCards: function() {

		var placement = this.calculateGrid();

		var moveIndexX = 0, moveIndexY = 0;
		for (let i = 0; i < this.sceneCards.length; i++) {
			const card = this.sceneCards[i];
			card.scale.set(placement.cardScale, placement.cardScale, placement.cardScale);

			moveIndexX = (i != 0 && (i - 1) % 2 == 0) ? 1 : 0;
			if(i != 0 && i % 2 == 0){
				moveIndexY++;
			} 

			card.position.x = placement.gridOrigin.x + placement.cardSize.x / 2 + placement.cardSize.x * moveIndexX;
			card.position.x += (moveIndexX == 1) ? placement.gridPadding : 0;
			card.position.y = 0;
			card.position.z = placement.gridOrigin.y + placement.cardSize.y / 2 + placement.cardSize.y * moveIndexY;
			// TODO: ERROR PLACEMENT IS NOT CORRECT (values are but actual placement not...)
			// console.log("pos: " + card.position.z);
			card.position.z += (moveIndexY > 0) ? placement.gridPadding : 0;
			// console.log("pos + pad: " + card.position.z);
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

	addLoadedTexturedCards: function(obj, id, tex) {
		for (let i = 0; i < 2; i++) {
			var matsClone = obj.material.slice();
			var card = new THREE.Mesh(obj.geometry, matsClone);
			card.material[0] = this.materials.back.tex;
			card.material[1] = tex;
			card.MatchGroupId = id;
			this.sceneCards.push(card);	
			this.scene.add(card);
		}

		if(this.sceneCards.length >= this.cards.length * 2) {
			this.sceneCards = this.shuffleArray(this.sceneCards);
			this.positionCards();
			loadingManager.objectHasBeenLoaded();
		}
	},

	addFrontTexture: function(tex, callback) {
		var mats = this.materials;
		if(mats.back.loaded) {
			callback(new THREE.MeshPhongMaterial({ map: tex }));
		}
	},

	loadTexture: function(index, callback) {
		var path = this.basePath + this.cards[index].texture;
		this.textureLoader.load(path + '.png', function(tex) {
			tex.DEBUG_URL = path;
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