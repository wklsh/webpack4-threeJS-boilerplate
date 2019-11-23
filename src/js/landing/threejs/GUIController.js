import * as dat from "dat.gui";

export default class GUIController {
	constructor(parent) {
		this.GUIController = null;

		this.parent = parent;
		this.init = this.init;
	}

	init() {
		this.GUIController = new dat.GUI();

		return this.GUIController;
	}
}
