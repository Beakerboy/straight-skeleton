import {Vector2} from 'three';

export default class Vector2d extends Vector2 {
	static Empty = new Vector2d(null, null);

	get X() {
		return this.x;
	}

	get Y() {
		return this.y;
	}

	set X(value) {
		this.x = value;
	}

	set Y(value) {
		this.y = value;
	}

	 ToString() {
		return `${this.X}, ${this.Y}`;
	}
}
