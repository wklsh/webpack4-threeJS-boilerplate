import * as THREE from "three";

export default class Cube {
	constructor() {
		this.mesh = null;

		this.init = this.init;
		this.onTick = this.onTick;
	}

	init(size) {
		// Set default params
		const localSize = size || {
			width: 1,
			height: 1,
			depth: 1,
		};

		const geometry = new THREE.BoxGeometry(localSize.width, localSize.height, localSize.depth);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		this.mesh = new THREE.Mesh(geometry, material);

		// Return mesh to expose out for other classes to render
		return this.mesh;
	}

	onTick() {
		this.mesh.rotation.x += 0.01;
		this.mesh.rotation.y += 0.01;
	}
}
