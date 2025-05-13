import Vector2d from '../Primitives/vector2d';

// Abstract Class
export default class SkeletonEvent {
  // @type {Vector2d}
  v = null;
  
  // @type {number}
  distance;

  IsObsolete() {
  }

  constructor(point, distance) {
    this.v = point;
    this.distance = distance;
  }

  ToString() {
    return 'IntersectEntry [V=' + this.v + ', Distance=' + this.distance + ']';
  }

  GetType() {
    return this.constructor.name;
  }
}
