import * as THREE from "three";

export default class LightHelper {
	constructor(parentObj) {
		this.lightHelper = null;

		this.parentObj = parentObj;
		this.init = this.init;
	}

	init() {
		if (this.parentObj) {
			this.lightHelper = new THREE.SpotLightHelper(this.parentObj);
			return this.lightHelper;
		}
	}
}
