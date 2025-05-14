import CircularNode from './circularnode';
import Vector2d from '../Primitives/vector2d';
import LineParametric2d from '../Primitives/lineparametric2d';
import Edge from './edge';
import {FaceNode} from '../Path/facenode';

class Vertex extends CircularNode {
  roundDigitCount = 5;

  /**
   * @type {Vector2d}
   */
  point = null;

  /**
   * @type {number}
   */
  distance;

  /**
   * @type {LineParametric2d}
   */
  bisector = null;

  /**
   * @type {Edge}
   */
  nextEdge = null;

  /**
   * @type {Edge}
   */
  previousEdge = null;

  /**
   * @type {FaceNode}
   */
  leftFace = null;

  /**
   * @type {FaceNode}
   */
  rightFace = null;

  /**
   * @type {boolean}
   */
  isProcessed;

  /**
   * @param {Vector2d}
   * @param {number}
   * @param {LineParametric2d}
   * @param {Edge}
   * @param {Edge}
   */
  constructor(point, distance, bisector, previousEdge, nextEdge) {
    super();

    this.point = point;
    this.distance = +distance.toFixed(this.roundDigitCount);
    this.bisector = bisector;
    this.previousEdge = previousEdge;
    this.nextEdge = nextEdge;

    this.isProcessed = false;
  }

  /**
   * @return {string}
   */
  toString() {
    return 'Vertex [v=' + this.point + ', IsProcessed=' + this.isProcessed +
      ', Bisector=' + this.bisector + ', PreviousEdge=' + this.previousEdge +
      ', NextEdge=' + this.nextEdge;
  }
}
