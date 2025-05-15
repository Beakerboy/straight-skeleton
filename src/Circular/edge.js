import CircularList from './circularlist.js'
import CircularNode from './circularnode.js'
import Vector2d from '../Primitives/vector2d'
import LineLinear2d from '../Primitives/linelinear2d'
import LineParametric2d from '../Primitives/lineparametric2d'

/**
 * A line segment
 * How is this different that LineParametric?
 * Why does it extend Node?
 */
export default class Edge extends CircularNode {
  /**
   * @type {CircularList}
   */
  list

  /**
   * @type {Vector2d}
   */
  begin

  /**
   * @type {Vector2d}
   */
  end

  /**
   * @type {Vector2d}
   */
  norm

  /**
   * @type {LineLinear2d}
   */
  lineLinear2d

  /**
   * @type {LineParametric2d}
   */
  bisectorNext = null

  /**
   * @type {LineParametric2d}
   */
  bisectorPrevious = null

  /**
   * @param {Vector2d} begin Start Point
   * @param {Vector2d} end End Point
   */
  constructor (begin, end) {
    super()

    this.begin = begin
    this.end = end

    this.lineLinear2d = new LineLinear2d(begin, end)
    this.norm = end.Sub(begin).Normalized()
  }

  /**
   * @returns {string} Edge Description
   */
  toString () {
    return `Edge [p1=${this.Begin}, p2=${this.End}]`
  }
}
