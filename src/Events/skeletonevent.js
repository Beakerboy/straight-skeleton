// Abstract Class
export default class SkeletonEvent {
  // @type {Vector2d}
  v = null

  // @type {number}
  distance

  isObsolete () {
  }

  constructor (point, distance) {
    this.v = point
    this.distance = distance
  }

  toString () {
    return 'IntersectEntry [V=' + this.v + ', Distance=' + this.distance + ']'
  }

  getType () {
    return this.constructor.name
  }
}
