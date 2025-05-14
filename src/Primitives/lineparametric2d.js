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
   *
   * @param {Vector2d}
   * @param {Vector2d}
   * @param pA
   * @param pU
   */
  constructor (pA, pU) {
    this.a = pA
    this.u = pU
  }

  /**
   *
   * @returns {LineLinear2d}
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
   * @param {LineParametric2d}
   * @param {LineLinear2d}
   * @param {number}
   * @param ray
   * @param line
   * @param epsilon
   * @returns {Vector2d}
   */
  static collide (ray, line, epsilon) {
    const collide = LineLinear2d.collide(ray.createLinearForm(), line)
    if (collide.equals(Vector2d.empty)) {
      return Vector2d.empty
    }

    const collideVector = collide.sub(ray.a)
    return ray.u.dot(collideVector) < epsilon ? Vector2d.empty : collide
  }

  /**
   * @param {Vector2d}
   * @param {number}
   * @param point
   * @param epsilon
   * @returns {boolean}
   */
  isOnLeftSite (point, epsilon) {
    const direction = point.sub(this.a)
    return PrimitiveUtils.orthogonalRight(this.u).dot(direction) < epsilon
  }

  /**
   * @param {Vector2d}
   * @param {number}
   * @param point
   * @param epsilon
   * @returns {boolean}
   */
  isOnRightSite (point, epsilon) {
    const direction = point.sub(this.a)
    return PrimitiveUtils.orthogonalRight(this.u).dot(direction) > -epsilon
  }
}
