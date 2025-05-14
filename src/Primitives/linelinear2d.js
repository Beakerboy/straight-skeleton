import Vector2d from './vector2d';

/**
 * Geometry line in linear form. General form:
 * Ax + By + C = 0;
 * <see href="http://en.wikipedia.org/wiki/Linear_equation"/>
 */

export default class LineLinear2d {
  a;
  b;
  c;

  /**
   * Construct a line that passes through the provided points.
   *
   * @param {Vector2d}
   * @param {Vector2d}
   */
  constructor(pP1 = Vector2d.empty, pP2 = Vector2d.empty) {
    this.a = pP1.y - pP2.y;
    this.b = pP2.x - pP1.x;
    this.c = pP1.x * pP2.y - pP2.x * pP1.y;
  }

  /**
   * Should this be a static factory method?
   */
  setFromCoefficients(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    return this;
  }

  /**
   *
   * @param {LineLinear2d}
   * @return {Vector2d}
   */
  collide(pLine) {
    return LineLinear2d.collide(this, pLine);
  }

  /**
   *
   * @param {LineLinear2d}
   * @param {LineLinear2d}
   * @return {Vector2d}
   */
  static collide(pLine1, pLine2) {
    return LineLinear2d.CollideCoeff(pLine1.a, pLine1.b, pLine1.c, pLine2.a, pLine2.b, pLine2.c);
  }

  /**
   *
   * @param {number}
   * @param {number}
   * @param {number}
   * @param {number}
   * @param {number}
   * @param {number}
   * @return {Vector2d}
   */
  static collideCoeff(A1, B1, C1, A2, B2, C2) {
    const WAB = A1 * B2 - A2 * B1;
    const WBC = B1 * C2 - B2 * C1;
    const WCA = C1 * A2 - C2 * A1;

    return WAB === 0 ? Vector2d.Empty : new Vector2d(WBC / WAB, WCA / WAB);
  }

  contains(point) {
    return Math.abs((point.x * this.a + point.y * this.b + this.c)) < Number.EPSILON;
  }
}
