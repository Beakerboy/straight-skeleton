import Vector2d from './vector2d'

/**
 * Geometry line in linear form. General form:
 * Ax + By + C = 0;
 * <see href="http://en.wikipedia.org/wiki/Linear_equation"/>
 */

export default class LineLinear2d {
  // @type {number}
  a

  // @type {number}
  b

  // @type {number}
  c

  /**
   * Construct a line that passes through the provided points.
   * @param {Vector2d} pP1 Point 1
   * @param {Vector2d} pP2 Point 2
   */
  constructor (pP1 = Vector2d.empty, pP2 = Vector2d.empty) {
    this.a = pP1.y - pP2.y
    this.b = pP2.x - pP1.x
    this.c = pP1.x * pP2.y - pP2.x * pP1.y
  }

  /**
   * Should this be a static factory method?
   * @param {number} a Coefficient
   * @param {number} b Coefficient
   * @param {number} c Coefficient
   */
  setFromCoefficients (a, b, c) {
    this.a = a
    this.b = b
    this.c = c

    return this
  }

  /**
   *
   * @param {LineLinear2d} pLine The line
   * @returns {Vector2d} A point
   */
  collide (pLine) {
    return LineLinear2d.collide(this, pLine)
  }

  /**
   *
   * @param {LineLinear2d} pLine1 Line 1
   * @param {LineLinear2d} pLine2 Line 2
   * @returns {Vector2d} Collision point
   */
  static collide (pLine1, pLine2) {
    return LineLinear2d.collideCoeff(pLine1.a, pLine1.b, pLine1.c, pLine2.a, pLine2.b, pLine2.c)
  }

  /**
   * is this ever called from outside the class?
   * might be better as a private function or
   * just roll it into collide.
   * @param {number} A1 Coefficient
   * @param {number} B1 Coefficient
   * @param {number} C1 Coefficient
   * @param {number} A2 Coefficient
   * @param {number} B2 Coefficient
   * @param {number} C2 Coefficient
   * @returns {Vector2d} collision point
   */
  static collideCoeff (A1, B1, C1, A2, B2, C2) {
    const WAB = A1 * B2 - A2 * B1
    const WBC = B1 * C2 - B2 * C1
    const WCA = C1 * A2 - C2 * A1

    return WAB === 0 ? Vector2d.Empty : new Vector2d(WBC / WAB, WCA / WAB)
  }

  contains (point) {
    return Math.abs((point.x * this.a + point.y * this.b + this.c)) < Number.EPSILON
  }
}
