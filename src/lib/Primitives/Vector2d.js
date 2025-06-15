import {Vector2} from 'three';

export default class Vector2d extends Vector2 {
	static Empty = new Vector2d(Number.MIN_VALUE, Number.MIN_VALUE);

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

	Negate() {
		this.negate();
	}

	 DistanceTo(var1) {
		const var2 = this.X - var1.X;
		const var4 = this.Y - var1.Y;
		return Math.sqrt(var2 * var2 + var4 * var4);
	}

	 Normalized() {
		const var1 = 1 / Math.sqrt(this.X * this.X + this.Y * this.Y);
		return new Vector2d(this.X * var1, this.Y * var1);
	}

	 DistanceSquared(var1) {
		const var2 = this.X - var1.X;
		const var4 = this.Y - var1.Y;
		return var2 * var2 + var4 * var4;
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
