import Vector2d from '../Primitives/vector2d';

// Abstract Class
export default class SkeletonEvent {
  //Vector2d
  V = null;
  //number
  Distance;

  IsObsolete() {
  }

  constructor(point, distance) {
    this.V = point;
    this.Distance = distance;
  }

  ToString() {
    return 'IntersectEntry [V=' + this.V + ', Distance=' + this.Distance + ']';
  }

  GetType() {
    return this.constructor.name;
  }
}
