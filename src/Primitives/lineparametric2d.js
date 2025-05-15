import Vector2d from './vector2d'
import LineLinear2d from './linelinear2d'
import PrimitiveUtils from './primitiveutils'

/**
 * Why do we need two forms of a linear model?
 * Does this define a line segment while LineLinear is a ray?
 * #JustifyYourExistance
 */
export default class LineParametric2d {
  static empty = new LineParametric2d(Vector2d.empty, Vector2d.empty)

  // @type {Vector2d}
  a = null
  // @type {Vector2d}
  u = null

  /**
   * Why A and U instead of A and B?
   * @param {Vector2d} pA Point 1
   * @param {Vector2d} pU Point 2
   */
  constructor (pA, pU) {
    this.a = pA
    this.u = pU
  }

  /**
   * Create a ray?
   * @returns {LineLinear2d} The ray
   */
  createLinearForm () {
    const x = this.a.x
    const y = this.a.y

    const b = -this.u.x
    const a = this.u.y

    const c = -(a * x + b * y)

    return new LineLinear2d().setFromCoefficients(a, b, c)
  }

  /**
   *
   *
   * @param {LineParametric2d} ray The ray
   * @param {LineLinear2d} line The line
   * @param {number} epsilon error
   * @returns {Vector2d} The interaection point
   */
  static collide (ray, line, epsilon) {
    // can this be changed to the non-static version?
    // ray.createLinearForm().collide(line)
    const collide = LineLinear2d.collide(ray.createLinearForm(), line)
    if (collide.equals(Vector2d.empty)) {
      return Vector2d.empty
    }

    const collideVector = collide.sub(ray.a)
    return ray.u.dot(collideVector) < epsilon ? Vector2d.empty : collide
  }

  /**
   * @param {Vector2d} point The point
   * @param {number} epsilon error
   * @returns {boolean} Is it?
   */
  isOnLeftSite (point, epsilon) {
    const direction = point.sub(this.a)
    return PrimitiveUtils.orthogonalRight(this.u).dot(direction) < epsilon
  }

  /**
   * @param {Vector2d} point The point
   * @param {number} epsilon error
   * @returns {boolean} Is it?
   */
  isOnRightSite (point, epsilon) {
    const direction = point.sub(this.a)
    return PrimitiveUtils.orthogonalRight(this.u).dot(direction) > -epsilon
  }
}
