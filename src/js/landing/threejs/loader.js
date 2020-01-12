import * as THREE from "three";
import * as dat from "dat.gui";
import OrbitControls from "orbit-controls-es6";
import Stats from "stats.js";

import Cube from "./cube";
import Light from "./light";
import LightHelper from "./lightHelper";

const canvasEl = document.querySelector("#js-canvasEl");
let canvasWidth = canvasEl.offsetWidth;
let canvasHeight = canvasEl.offsetHeight;

export default class ThreeLoader {
	constructor() {
		this.renderer = null;
		this.camera = null;
		this.scene = null;
		this.sceneObjects = [];
		this.controls = null;
		this.timeout = null;
		this.gui = null;
    this.stats = null;

		this.init = this.init;
		this.addIntoScene = this.addIntoScene;
	}

	initRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			antialias: true,
		});
		this.renderer.setSize(canvasWidth, canvasHeight);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	initCamera() {
		this.camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);

		this.camera.position.z = 5;
	}

	initScene() {
		this.scene = new THREE.Scene();
	}

	initControls() {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	}
  
  initStats() {
		this.stats = new Stats();
		this.stats.showPanel(0);
		document.body.appendChild(this.stats.dom);
	}

	initDatGui() {
		this.gui = new dat.GUI();
	}

	onWindowResize() {
		// Debounce event to prevent resize spams
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			// Clear inline styles to trigger canvas re-size
			canvasEl.style.width = "";
			canvasEl.style.height = "";
			// Update values
			canvasWidth = canvasEl.offsetWidth;
			canvasHeight = canvasEl.offsetHeight;

			this.camera.aspect = canvasWidth / canvasHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(canvasWidth, canvasHeight);
		}, 250);
	}

	addIntoScene(obj) {
		this.sceneObjects.push(obj);
		this.sceneObjects.forEach((sceneObj) => {
			// Undef checks
			if (sceneObj.init === undefined) {
				console.error(
					`${sceneObj.constructor.name} object has no init function! Unable to render into scene.`,
				);
			} else {
				this.scene.add(sceneObj.init());
			}
		});
	}

	onTick() {
		window.requestAnimationFrame(() => this.onTick());
    
    // FPS counter
		this.stats.begin();
		this.stats.end();

		for (let i = 0; i < this.sceneObjects.length; i += 1) {
			// Undef checks
			if (this.sceneObjects[i].onTick !== undefined) {
				this.sceneObjects[i].onTick();
			}
		}

		this.renderer.render(this.scene, this.camera);
	}

	init() {
		this.initCamera();
		this.initRenderer();
		this.initScene();
		this.initControls();
		this.initDatGui();
    this.initStats();


		// Resize updates
		window.addEventListener("resize", this.onWindowResize.bind(this), false);

		this.addIntoScene(new Cube());

		const lightObj = new Light().init();
		this.scene.add(lightObj);
		this.scene.add(new LightHelper(lightObj).init());

		this.onTick();
	}
}
