import {Vector2} from 'three';

export default class Vector2d extends Vector2 {
	static Empty = new Vector2d(Number.MIN_VALUE, Number.MIN_VALUE);
        // static Empty = null;
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

	 Add(v) {
		return this.clone().add(v)
	}

	 Sub(v) {
		return this.clone().sub(v)
	}

	 MultiplyScalar(scale) {
		return this.clone().multiplyScalar(scale)
	}

	 Equals(v) {
		return this.equals(v);
	}

	 ToString() {
		return `${this.X}, ${this.Y}`;
	}
}
