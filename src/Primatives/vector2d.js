class Vector2d {
  static Empty = new Vector2d(Number.MIN_VALUE, Number.MIN_VALUE);

  X = 0;
  Y = 0;

  constructor(x, y) {
    this.X = x;
    this.Y = y;
  }

  Negate() {
    this.X = -this.X;
    this.Y = -this.Y;
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

  Dot(var1) {
    return this.X * var1.X + this.Y * var1.Y;
  }

  DistanceSquared(var1) {
    const var2 = this.X - var1.X;
    const var4 = this.Y - var1.Y;
    return var2 * var2 + var4 * var4;
  }

  Add(v) {
    return new Vector2d(this.X + v.X, this.Y + v.Y);
  }

  Sub(v) {
    return new Vector2d(this.X - v.X, this.Y - v.Y);
  }

  MultiplyScalar(scale) {
    return new Vector2d(this.X * scale, this.Y * scale);
  }

  Equals(v) {
    return this.X === v.X && this.Y === v.Y;
  }

  NotEquals(v) {
    return !this.Equals(v);
  }

  ToString() {
    return `${this.X}, ${this.Y}`;
  }
}
