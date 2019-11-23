import * as THREE from "three";

export default class Light {
	constructor() {
		this.spotlight = null;

		this.init = this.init;
	}

	init() {
		this.spotlight = new THREE.SpotLight("white", 1);
		this.spotlight.position.set(15, 40, 35);
		// this.spotlight.angle = Math.PI / 4;

		this.spotlight.castShadow = true;

		this.spotlight.shadow.mapSize.width = 1024;
		this.spotlight.shadow.mapSize.height = 1024;

		this.spotlight.shadow.camera.near = 500;
		this.spotlight.shadow.camera.far = 4000;
		this.spotlight.shadow.camera.fov = 30;

		return this.spotlight;
	}
}
