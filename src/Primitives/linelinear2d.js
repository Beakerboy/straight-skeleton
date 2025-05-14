import Vector2d from './vector2d';

/**
 * Geometry line in linear form. General form:
 * Ax + By + C = 0;
 * <see href="http://en.wikipedia.org/wiki/Linear_equation"/>
 */

export default class LineLinear2d {
  A;
  B;
  C;

  constructor(pP1 = Vector2d.Empty, pP2 = Vector2d.Empty) {
    this.A = pP1.Y - pP2.Y;
    this.B = pP2.X - pP1.X;
    this.C = pP1.X * pP2.Y - pP2.X * pP1.Y;
  }

  SetFromCoefficients(a, b, c) {
    this.A = a;
    this.B = b;
    this.C = c;

    return this;
  }

  Collide(pLine) {
    return LineLinear2d.Collide(this, pLine);
  }

  static Collide(pLine1, pLine2) {
    return LineLinear2d.CollideCoeff(pLine1.A, pLine1.B, pLine1.C, pLine2.A, pLine2.B, pLine2.C);
  }

  static CollideCoeff(A1, B1, C1, A2, B2, C2) {
    const WAB = A1 * B2 - A2 * B1;
    const WBC = B1 * C2 - B2 * C1;
    const WCA = C1 * A2 - C2 * A1;

    return WAB === 0 ? Vector2d.Empty : new Vector2d(WBC / WAB, WCA / WAB);
  }

  Contains(point) {
    return Math.abs((point.X * this.A + point.Y * this.B + this.C)) < Number.EPSILON;
  }
}
