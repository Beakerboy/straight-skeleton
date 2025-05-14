import Vector2d from './Vector2d';
import LineLinear2d from './linelinear2d';
import PrimitiveUtils from './PrimitiveUtils';

export default class LineParametric2d {
  static empty = new LineParametric2d(Vector2d.Empty, Vector2d.Empty);

  a = null;
  u = null;

  constructor(pA, pU) {
    this.a = pA;
    this.u = pU;
  }

  createLinearForm() {
    const x = this.a.x;
    const y = this.a.y;

    const b = -this.u.x;
    const a = this.u.y;

    const c = -(a * x + b * y);

    return new LineLinear2d().setFromCoefficients(a, b, c);
  }

  static collide(ray, line, epsilon) {
    const collide = LineLinear2d.collide(ray.createLinearForm(), line);
    if (collide.equals(Vector2d.empty)) {
      return Vector2d.empty;
    }

    const collideVector = collide.sub(ray.a);
    return ray.u.dot(collideVector) < epsilon ? Vector2d.empty : collide;
  }

  isOnLeftSite(point, epsilon) {
    const direction = point.sub(this.a);
    return PrimitiveUtils.orthogonalRight(this.u).dot(direction) < epsilon;
  }

  isOnRightSite(point, epsilon) {
    const direction = point.sub(this.a);
    return PrimitiveUtils.orthogonalRight(this.u).dot(direction) > -epsilon;
  }
}
