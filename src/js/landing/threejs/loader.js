import * as THREE from "three";
import Cube from "./cube";

const canvasWrapperEl = document.querySelector("#js-canvasWrapper");

export default class Canvas {
	constructor() {
		this.renderer = null;
		this.camera = null;
		this.scene = null;
		this.sceneObjects = [];

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

		this.addIntoScene(new Cube());

		this.onTick();
	}
}
