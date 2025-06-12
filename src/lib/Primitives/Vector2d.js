export default class Vector2d {
	public static Empty = new Vector2d(Number.MIN_VALUE, Number.MIN_VALUE);

	public X = 0;
	public Y = 0;

	constructor(x, y) {
		this.X = x;
		this.Y = y;
	}

	public Negate() {
		this.X = -this.X;
		this.Y = -this.Y;
	}

	public DistanceTo(var1) {
		const var2 = this.X - var1.X;
		const var4 = this.Y - var1.Y;
		return Math.sqrt(var2 * var2 + var4 * var4);
	}

	public Normalized() {
		const var1 = 1 / Math.sqrt(this.X * this.X + this.Y * this.Y);
		return new Vector2d(this.X * var1, this.Y * var1);
	}

	public Dot(var1) {
		return this.X * var1.X + this.Y * var1.Y;
	}

	public DistanceSquared(var1) {
		const var2 = this.X - var1.X;
		const var4 = this.Y - var1.Y;
		return var2 * var2 + var4 * var4;
	}

	public Add(v) {
		return new Vector2d(this.X + v.X, this.Y + v.Y);
	}

	public Sub(v) {
		return new Vector2d(this.X - v.X, this.Y - v.Y);
	}

	public MultiplyScalar(scale) {
		return new Vector2d(this.X * scale, this.Y * scale);
	}

	public Equals(v) {
		return this.X === v.X && this.Y === v.Y;
	}

	public NotEquals(v) {
		return !this.Equals(v);
	}

	public ToString() {
		return `${this.X}, ${this.Y}`;
	}
}
