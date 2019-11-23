import * as dat from "dat.gui";

export default class GUIController {
	constructor(parentObj) {
		this.GUIController = null;

		this.parentObj = parentObj;
		this.init = this.init;
	}

	init() {
		this.GUIController = new dat.GUI();

		return this.GUIController;
	}
}
