import * as THREE from "three";

export default class Sphere {
	constructor(parent) {
		this.mesh = null;
		this.parent = parent;

		this.sphereValues = {
			scale: 1,
			radius: 1,
			widthSeg: 8,
			heightSeg: 8,
		};
	}

	init() {
		this.addGui();

		const geometry = new THREE.SphereGeometry(
			this.sphereValues.radius,
			this.sphereValues.widthSeg,
			this.sphereValues.heightSeg,
		);
		const material = new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true });
		this.mesh = new THREE.Mesh(geometry, material);

		// Return mesh to be exposed out for other classes to ref to
		return this.mesh;
	}

	onTick() {
		this.mesh.scale.x = this.sphereValues.scale;
		this.mesh.scale.y = this.sphereValues.scale;
		this.mesh.scale.z = this.sphereValues.scale;
	}

	addGui() {
		const gui = this.parent.gui;
		gui.add(this.sphereValues, "scale", 0, 10);
	}
}
