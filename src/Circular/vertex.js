import CircularNode from './CircularNode';
import Vector2d from '../Primitives/Vector2d';
import LineParametric2d from '../Primitives/LineParametric2d';
import Edge from './Edge';
import {FaceNode} from '../Path/FaceNode';

class Vertex extends CircularNode {
  RoundDigitCount = 5;

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
    this.distance = +distance.toFixed(this.RoundDigitCount);
    this.bisector = bisector;
    this.previousEdge = previousEdge;
    this.nextEdge = nextEdge;

    this.isProcessed = false;
  }

  /**
   * @return {string}
   */
  public ToString() {
    return 'Vertex [v=' + this.Point + ', IsProcessed=' + this.IsProcessed +
      ', Bisector=' + this.Bisector + ', PreviousEdge=' + this.PreviousEdge +
      ', NextEdge=' + this.NextEdge;
  }
}
