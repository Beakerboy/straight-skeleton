import SkeletonEvent from './skeletonevent'
import Vertex from '../Circular/vertex'
import Vector2d from '../Primitives/vector2d'

export default class EdgeEvent extends SkeletonEvent {
  /**
   * @type {Vertex}
   */
  nextVertex

  /**
   * @type {Vertex}
   */
  previousVertex

  /**
   * @returns {boolean} Is it?
   */
  get isObsolete () {
    return this.previousVertex.isProcessed || this.nextVertex.isProcessed
  }

  /**
   * @param {Vector2d} point The point
   * @param {number} distance distance
   * @param {Vertex} previousVertex Vertex
   * @param {Vertex} nextVertex Vertex
   */
  constructor (point, distance, previousVertex, nextVertex) {
    super(point, distance)

    this.previousVertex = previousVertex
    this.nextVertex = nextVertex
  }

  /**
   * @returns {string} Object Values
   */
  toString () {
    return 'EdgeEvent [V=' + this.V + ', PreviousVertex=' +
      (this.previousVertex !== null ? this.previousVertex.point.toString() : 'null') +
      ', NextVertex=' +
      (this.nextVertex !== null ? this.nextVertex.point.toString() : 'null') + ', Distance=' +
      this.distance + ']'
  }
}
