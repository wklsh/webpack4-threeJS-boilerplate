import * as THREE from "three";
import * as dat from "dat.gui";
import OrbitControls from "orbit-controls-es6";

import Cube from "./cube";
import Light from "./light";
import LightHelper from "./lightHelper";
import GUIController from "./GUIController";

const canvasWrapperEl = document.querySelector("#js-canvasWrapper");

export default class ThreeLoader {
	constructor() {
		this.renderer = null;
		this.camera = null;
		this.scene = null;
		this.sceneObjects = [];
		this.controls = null;
		this.timeout = null;
		this.gui = null;

		this.init = this.init;
		this.addIntoScene = this.addIntoScene;
	}

	initRenderer() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		canvasWrapperEl.appendChild(this.renderer.domElement);
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

	onWindowResize() {
		// Debounce event to prevent resize spams
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth, window.innerHeight);
		}, 250);
	}

	initControls() {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	}

	onWindowResize() {
		// Debounce event to prevent resize spams
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth, window.innerHeight);
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

		// Resize updates
		window.addEventListener("resize", this.onWindowResize.bind(this), false);

		// GUI
		this.gui = new GUIController(this).init();

		this.addIntoScene(new Cube());

		const lightObj = new Light().init();
		this.scene.add(lightObj);
		this.scene.add(new LightHelper(lightObj).init());

		this.onTick();
	}
}
