import CircularNode from './CircularNode';
import Vector2d from '../Primitives/Vector2d';
import LineLinear2d from '../Primitives/LineLinear2d';
import LineParametric2d from '../Primitives/LineParametric2d';

class Edge extends CircularNode {
  /**
   * @type {Vector2d}
   */
  begin;

  /**
   * @type {Vector2d}
   */
  end;

  /**
   * @type {Vector2d}
   */
  norm;

  /**
   * @type {LineLinear2d}
   */
  LineLinear2d;

  /**
   * @type {LineParametric2d}
   */
  BisectorNext = null;

  /**
   * @type {LineParametric2d}
   */
  BisectorPrevious = null;

  /**
   * @param {Vector2d}
   * @param {Vector2d}
   */
  constructor(begin, end) {
    super();

    this.Begin = begin;
    this.End = end;

    this.LineLinear2d = new LineLinear2d(begin, end);
    this.Norm = end.Sub(begin).Normalized();
	}

	ToString(): string {
		return `Edge [p1=${this.Begin}, p2=${this.End}]`;
  }
}
