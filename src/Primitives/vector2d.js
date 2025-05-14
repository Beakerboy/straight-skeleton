export default class Vector2d {
  static Empty = new Vector2d(Number.MIN_VALUE, Number.MIN_VALUE);

  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
  }

  distanceTo(var1) {
    const var2 = this.x - var1.x;
    const var4 = this.y - var1.y;
    return Math.sqrt(var2 * var2 + var4 * var4);
  }

  normalized() {
    const var1 = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
    return new Vector2d(this.x * var1, this.y * var1);
  }

  dot(var1) {
    return this.x * var1.x + this.y * var1.y;
  }

  distanceSquared(var1) {
    const var2 = this.x - var1.x;
    const var4 = this.y - var1.y;
    return var2 * var2 + var4 * var4;
  }

  add(v) {
    return new Vector2d(this.x + v.x, this.y + v.y);
  }

  sub(v) {
    return new Vector2d(this.x - v.x, this.y - v.y);
  }

  multiplyScalar(scale) {
    return new Vector2d(this.x * scale, this.y * scale);
  }

  equals(v) {
    return this.x === v.x && this.y === v.y;
  }

  notEquals(v) {
    return !this.equals(v);
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }
}
