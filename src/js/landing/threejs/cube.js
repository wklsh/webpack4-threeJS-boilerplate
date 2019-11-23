import * as THREE from "three";

export default class Cube {
	constructor() {
		this.mesh = null;

		this.cubeValues = {
			scale: 1,
			width: 1,
			height: 1,
			depth: 1,
		};
	}

	init() {
		// Append values to Dat.GUI
		this.addGui();

		const geometry = new THREE.BoxGeometry(cubeValues.width, cubeValues.height, cubeValues.depth);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		this.mesh = new THREE.Mesh(geometry, material);

		// Return mesh to expose out for other classes to render
		return this.mesh;
	}

	onTick() {
		this.mesh.rotation.x += 0.01;
		this.mesh.rotation.y += 0.01;

		this.mesh.scale.x = this.cubeValues.scale;
		this.mesh.scale.y = this.cubeValues.scale;
		this.mesh.scale.z = this.cubeValues.scale;
	}

	addGui() {
		const gui = this.parent.gui;
		gui.add(this.cubeValues, "scale", 0, 10);
	}
}
